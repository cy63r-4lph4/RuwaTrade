<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'customer_id',
        'reference',
        'amount',
        'status',
        'currency',
        'details',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
