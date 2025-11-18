<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaystackService;
use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Support\Carbon;
use App\Models\Cart;

class PaystackController extends Controller
{
    protected $paystack;

    public function __construct(PaystackService $paystack)
    {
        $this->paystack = $paystack;
    }

    public function initialize(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric',
        ]);

        $data = [
            'email' => $request->email,
            'amount' => $request->amount * 100,
        ];

        return $this->paystack->initializeTransaction($data);
    }





    public function verify($reference)
    {
        $response = $this->paystack->verifyTransaction($reference);

        if (!isset($response['data']) || $response['data']['status'] !== 'success') {
            return response()->json(['status' => false, 'message' => 'Payment verification failed']);
        }

        $data = $response['data'];
        $email = $data['customer']['email'];

        $customer = Customer::where('email', $email)->first();

        if (!$customer) {
            return response()->json(['status' => false, 'message' => 'Customer not found']);
        }

        // Save the transaction
        Transaction::create([
            'customer_id' => $customer->id,
            'reference' => $data['reference'],
            'amount' => $data['amount'] / 100,
            'status' => $data['status'],
            'currency' => $data['currency'],
            'details' => json_encode($data),
        ]);

        $cart = Cart::where('customer_id', $customer->id)->with('items')->first();

        if ($cart && $cart->items->count()) {
            foreach ($cart->items as $item) {
                $customer->templates()->attach($item->template_id, [
                    'expires_at' => Carbon::now()->addMonth(),
                ]);
            }

            $cart->items()->delete();
        }

        return response()->json(['status' => true, 'message' => 'Payment verified. Templates added to library.']);
    }


}
