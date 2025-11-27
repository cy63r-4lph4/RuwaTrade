<?php
namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;

class OTPController extends Controller
{
    protected OtpService $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json($this->otpService->sendEmailOtp($user));
    }
public function resendOtp(Request $request)
{
    $request->validate([
        'email' => ['required', 'email']
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }

    $otpResult = $this->otpService->sendEmailOtp($user);

    return response()->json([
        'status' => $otpResult['status'],
        'message' => $otpResult['message']
    ]);
}

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6'
        ]);
        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json($this->otpService->verifyEmailOtp($user, $request->otp));
    }
}
