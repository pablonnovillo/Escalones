<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Category;
use App\Models\Order;


class Product extends Model
{
    //
    protected $fillable = [

    ];

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class,'orders_products')->withTimestamps();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
