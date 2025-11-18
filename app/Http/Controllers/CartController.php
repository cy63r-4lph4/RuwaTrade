<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Template;
use Illuminate\Http\Request; // you missed this too!
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::where('customer_id', auth('api')->id())
            ->with('items.template')
            ->first();

        $templates = $cart?->items->pluck('template')->filter()->values() ?? [];

        // Replace the 'thumbnail' field with full URL
        $templates->each(function ($template) {
            $template->thumbnail = $template->thumbnail
                ? asset('storage/' . $template->thumbnail)
                : null;
        });

        return response()->json($templates);
    }




    public function store(Request $request)
    {
        $request->validate(['template_id' => 'required|exists:templates,id']);
        $cart = Cart::firstOrCreate(['customer_id' => auth()->id()]);
        $cart->items()->create(['template_id' => $request->template_id]);

        return response()->json(['message' => 'Item added']);
    }

    public function destroy($id)
{
    $customerId = auth('api')->id();

    $item = CartItem::where('template_id', $id)
        ->whereHas('cart', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })
        ->first();

    if (!$item) {
        return response()->json([
            'message' => 'Cart item not found for this customer.',
        ], 404);
    }

    $item->delete();

    return response()->json([
        'message' => 'Item removed from cart',
    ]);
}



    // public function checkout()
    // {
    //     $cart = Cart::with('items.template')->where('customer_id', auth()->id())->first();

    //     if (!$cart || $cart->items->isEmpty()) {
    //         return response()->json(['message' => 'Cart is empty'], 400);
    //     }

    //     $totalAmount = $cart->items->sum(fn($item) => $item->template->price);
    //     // You can redirect or return this to initialize Paystack from frontend

    //     return response()->json([
    //         'amount' => $totalAmount,
    //         'email' => auth()->user()->email,
    //     ]);
    // }
}
