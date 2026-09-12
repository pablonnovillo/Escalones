<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Order;

class Printing extends Model
{
    //
    protected $fillable = [
        'file',
        'tipo_papel',
        'num_copias',        
        'precio_total',
    ];

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class,'printings_orders')->withTimestamps();
    }
}
