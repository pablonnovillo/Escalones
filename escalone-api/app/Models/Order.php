<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;
use App\Models\Product;
use App\Models\Printing;

class Order extends Model
{
    //
    protected $fillable=[
        'modo_entrega',
        'dirección_envio',
        'senia_recargo',
        'numero_pedido',
        'precio_total',
    ];

    public function clients()
    {
        return $this->belongsToMany(User::class,'users_orders','order_id','user_id')->withTimestamps();
    }

    public function products()
    {
        return $this->belongsToMany(Product::class,'orders_products','order_id', 'product_id')->withPivot('cantidad','subtotal')->withTimestamps();
    }

    public function pritings()
    {
        return $this->belongsToMany(Printing::class,'printing_orders')->withTimestamps();
    }
}
