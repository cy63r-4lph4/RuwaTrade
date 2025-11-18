<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['email', 'otp_token', 'otp_expires_at'];

    public function templates()
    {
        return $this->belongsToMany(Template::class)
            ->withTimestamps()
            ->withPivot('expires_at');
    }
}
