<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TransactionController extends Controller
{
    public function verify($reference)
    {
        $response = Http::withToken(env('PAYSTACK_SECRET_KEY'))
            ->get("https://api.paystack.co/transaction/verify/{$reference}");

        if ($response->failed() || !$response->json('data')) {
            return response()->json([
                'status' => false,
                'message' => 'Verification failed or invalid response from Paystack.'
            ], 400);
        }

        $data = $response->json('data');

        // Get or create the customer
        $customer = Customer::firstOrCreate(
            ['email' => $data['customer']['email']],
            ['otp' => null, 'otp_expires_at' => null] // Defaults
        );

        // Check if transaction already exists to avoid duplicates
        $existing = Transaction::where('reference', $data['reference'])->first();
        if ($existing) {
            return response()->json([
                'status' => true,
                'message' => 'Transaction already logged.',
                'transaction' => $existing
            ]);
        }

        $transaction = Transaction::create([
            'customer_id' => $customer->id,
            'reference' => $data['reference'],
            'amount' => $data['amount'] / 100,
            'status' => $data['status'],
            'currency' => $data['currency'],
            'details' => json_encode($data),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Transaction verified and stored successfully.',
            'transaction' => $transaction,
        ]);
    }
}
