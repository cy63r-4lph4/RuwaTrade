<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class PaystackService
{
    protected $baseUrl = 'https://api.paystack.co';

    public function initializeTransaction($data)
    {
        return Http::withToken(Config::get('services.paystack.secret'))
            ->post("{$this->baseUrl}/transaction/initialize", $data)
            ->json();
    }

    public function verifyTransaction($reference)
    {
        return Http::withToken(Config::get('services.paystack.secret'))
            ->get("{$this->baseUrl}/transaction/verify/{$reference}")
            ->json();
    }
}
