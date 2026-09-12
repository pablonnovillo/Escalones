<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Booking;
use App\Models\Bar;
use App\Models\Game;

class Service extends Model
{
    //
    protected $fillable = [
        'tipo_servicio',
        'duracion',
        'descripción',
        'incluye_consumo',
        'numero_reserva',
        'precio_total',
    ];

    public function bookings(): BelongsToMany
    {
        return $this->belongsToMany(Booking::class,'services_bookings')->withTimestamps();
    }

    public function bars(): HasOne
    {
        return $this->hasOne(Bar::class);
    }

    public function games(): HasOne
    {
        return $this->hasOne(Game::class);
    }
}
