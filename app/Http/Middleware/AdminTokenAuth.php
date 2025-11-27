<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTokenAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Token missing'], 401);
        }

        $admin = Admin::where('api_token', $token)->first();

        if (! $admin) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // Attach admin to request for downstream use
        $request->setUserResolver(fn () => $admin);

        return $next($request);
    }
}
