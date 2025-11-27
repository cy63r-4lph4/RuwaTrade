<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $otp = rand(100000, 999999);
        $customer = Customer::firstOrCreate(['email' => $request->email]);
        $customer->update([
            'otp_token' => $otp,
            'token_expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // Send OTP by email (replace this with your actual mail logic)
        Mail::raw("Your OTP is: $otp", function ($message) use ($request) {
            $message->to($request->email)->subject('Your OTP');
        });

        return response()->json(['message' => 'OTP sent to email']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp_token' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)
            ->where('otp_token', $request->otp_token)
            ->where('token_expires_at', '>', now())
            ->first();

        if (! $customer) {
            return response()->json(['message' => 'Invalid or expired OTP'], 401);
        }

        // Create Sanctum token
        $token = $customer->createToken('otp-login')->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
