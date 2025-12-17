<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Enums\OtpType;

class RegisteredUserController extends Controller
{    protected OtpService $otpService;

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:customer,seller'],
        ]);

        $user = User::create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_verified' => false,
        ]);

        $otpResult = $this->otpService->send($user, OtpType::EMAIL_VERIFICATION);

        return response()->json([
            'status' => 'success',
            'message' => 'User created',
            'otp_status' => $otpResult['status'],
            'otp_message' => $otpResult['message'],
            'email' => $user->email,
        ], 201);
    }
}
