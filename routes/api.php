<?php

use App\Http\Controllers\Auth\OTPController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\CustomerTemplateController;
use App\Http\Controllers\PaystackController;




// Public Routes
Route::post('/auth/request-otp', [AuthController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/templates', [TemplateController::class, 'fetch']);
Route::get('/templates/{id}', [TemplateController::class, 'fetchById']);


Route::post('/paystack/initialize', [PaystackController::class, 'initialize']);
Route::get('/paystack/verify/{reference}', [PaystackController::class, 'verify']);


// routes/api.php
Route::post('/auth/send-otp', [OTPController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [OTPController::class, 'verifyOtp']);






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

