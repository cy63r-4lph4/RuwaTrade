<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;
use App\Enums\OtpType;

class OTPController extends Controller
{
    protected OtpService $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json(
            $this->otpService->send($user, OtpType::EMAIL_VERIFICATION)
        );
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json(
            $this->otpService->send($user, OtpType::EMAIL_VERIFICATION)
        );
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6'
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json(
            $this->otpService->verify(
                $user,
                OtpType::EMAIL_VERIFICATION,
                $request->otp
            )
        );
    }
}
