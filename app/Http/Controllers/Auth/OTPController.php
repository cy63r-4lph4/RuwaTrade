<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\Customer;
use Illuminate\Support\Facades\Log;


class OTPController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $otp = rand(100000, 999999);

        $customer = Customer::updateOrCreate(
            ['email' => $request->email],
            ['otp_token' => $otp, 'otp_expires_at' => now()->addMinutes(10)]
        );

        try {
            Mail::raw("Your OTP is $otp", function ($message) use ($request) {
                $message->to($request->email)->subject('Your OTP Code');
            });

            return response()->json(['message' => 'OTP sent to your email']);
        } catch (\Exception $e) {
            Log::error('Failed to send OTP email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send OTP email'], 500);
        }
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $customer = Customer::where('email', $request->email)
            ->where('otp_token', $request->otp)
            ->where('otp_expires_at', '>', now())
            ->first();

        if (!$customer) {
            return response()->json(['message' => 'Invalid or expired OTP'], 401);
        }

        $token = $customer->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'customer' => $customer]);
    }
}
