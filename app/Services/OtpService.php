<?php

namespace App\Services;

use App\Models\Otp;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;


class OtpService
{
    /**
     * Send OTP to a user's email
     */
    public function sendEmailOtp(User $user, string $type = 'email_verification', int $expiresMinutes = 10)
    {
        // Rate limiting: prevent spamming OTP requests
        $recentOtp = Otp::where('user_uuid', $user->uuid)
            ->where('type', $type)
            ->where('created_at', '>=', now()->subMinutes(2))
            ->first();

        if ($recentOtp) {
            return [
                'status' => 'error',
                'message' => 'OTP already sent. Please wait before requesting again.'
            ];
        }

        // Generate OTP securely
        $otpCode = random_int(100000, 999999);

        $otp = Otp::create([
            'user_uuid' => $user->uuid,
            'otp_code' => $otpCode,
            'type' => $type,
            'used' => false,
            'expires_at' => now()->addMinutes($expiresMinutes),
        ]);

        try {
Mail::to($user->email)->send(new OtpMail($otpCode, $expiresMinutes));


            return [
                'status' => 'success',
                'message' => 'OTP sent to your email'
            ];
        } catch (\Exception $e) {
            Log::error('Failed to send OTP email: ' . $e->getMessage());

            return [
                'status' => 'error',
                'message' => 'Failed to send OTP email'
            ];
        }
    }

    /**
     * Verify OTP for a user
     */
    public function verifyEmailOtp(User $user, int $otpCode)
    {
        $otp = Otp::where('user_uuid', $user->uuid)
            ->where('otp_code', $otpCode)
            ->where('type', 'email_verification')
            ->where('used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otp) {
            return [
                'status' => 'error',
                'message' => 'Invalid or expired OTP'
            ];
        }

        // Mark OTP as used
        $otp->used = true;
        $otp->save();

        // Mark user as verified
        $user->is_verified = true;
        $user->save();

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'status' => 'success',
            'message' => 'OTP verified successfully',
            'token' => $token,
            'user_uuid' => $user->uuid
        ];
    }
}
