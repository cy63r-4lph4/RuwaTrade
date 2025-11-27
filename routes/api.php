<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerTemplateController;
use App\Http\Controllers\PaystackController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\Auth\OTPController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/templates', [TemplateController::class, 'fetch']);
Route::get('/templates/{id}', [TemplateController::class, 'fetchById']);

Route::post('/paystack/initialize', [PaystackController::class, 'initialize']);
Route::get('/paystack/verify/{reference}', [PaystackController::class, 'verify']);

// routes/api.php
Route::post('/auth/resend-otp', [OTPController::class, 'resendOtp']);
Route::post('/auth/verify-otp', [OTPController::class, 'verifyOtp']);
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');

// Authenticated Admin Routes
Route::middleware('admin_token')->group(function () {
    // Admin Info
    Route::get('/admin/me', [AdminAuthController::class, 'me']);

    // Template Management (Admin)
    Route::get('/admin/templates', [TemplateController::class, 'index']);
    Route::post('/admin/templates', [TemplateController::class, 'store']);     // Add new template
    Route::put('/admin/templates/{id}', [TemplateController::class, 'update']); // Update template
    Route::delete('/admin/templates/{id}', [TemplateController::class, 'destroy']); // Delete template
});

// Customer Protected Routes

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/item/{id}', [CartController::class, 'destroy']);
    Route::get('/library', [CustomerTemplateController::class, 'index']);
    Route::get('/download/{template}', [CustomerTemplateController::class, 'download']);

});
