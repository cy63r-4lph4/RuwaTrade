<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
   use Illuminate\Support\Str;


class AdminAuthController extends Controller
{

public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required|string',
    ]);

    $admin = Admin::where('email', $request->email)->first();

    if (! $admin || ! Hash::check($request->password, $admin->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Generate new token
    $admin->api_token = Str::random(60);
    $admin->save();

    return response()->json([
        'admin' => $admin,
        'token' => $admin->api_token,
    ]);
}


    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
