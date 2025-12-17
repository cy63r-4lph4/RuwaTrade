<?php

namespace App\Services;

use App\Models\Otp;
use App\Models\User;
use App\Enums\OtpType;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class OtpService
{
    public function send(User $user, OtpType $type)
    {
        $config = config("otp.{$type->value}");

        if ($type === OtpType::EMAIL_VERIFICATION && $user->is_verified) {
            return $this->error('User already verified');
        }

        $recentOtp = Otp::where('user_uuid', $user->uuid)
            ->where('type', $type->value)
            ->where('created_at', '>=', now()->subMinutes($config['cooldown']))
            ->first();

        if ($recentOtp) {
            return $this->error('OTP already sent. Please wait.');
        }

        $otpCode = str_pad(
            (string) random_int(0, 999999),
            6,
            '0',
            STR_PAD_LEFT
        );

        Otp::create([
            'user_uuid' => $user->uuid,
            'otp_code' => $otpCode,
            'type' => $type->value,
            'used' => false,
            'expires_at' => now()->addMinutes($config['expires']),
        ]);

        try {
            Mail::to($user->email)->send(
                new OtpMail($otpCode, $config['expires'])
            );

            return $this->success('OTP sent');
        } catch (\Throwable $e) {
            Log::error('OTP email failed: ' . $e->getMessage());
            return $this->error('Failed to send OTP');
        }
    }

    public function verify(User $user, OtpType $type, string $code)
    {
        $config = config("otp.{$type->value}");

        $otp = Otp::where([
                'user_uuid' => $user->uuid,
                'otp_code' => $code,
                'type' => $type->value,
                'used' => false,
            ])
            ->where('expires_at', '>', now())
            ->first();

        if (!$otp) {
            return $this->error('Invalid or expired OTP');
        }

        $otp->update(['used' => true]);

        if ($config['mark_verified']) {
            $user->update(['is_verified' => true]);
        }

        $response = [
            'status' => 'success',
            'message' => 'OTP verified successfully',
        ];

        if ($config['issue_token']) {
            $response['token'] = $user->createToken('auth_token')->plainTextToken;
        }

        return $response;
    }

    private function success(string $message)
    {
        return ['status' => 'success', 'message' => $message];
    }

    private function error(string $message)
    {
        return ['status' => 'error', 'message' => $message];
    }
}

