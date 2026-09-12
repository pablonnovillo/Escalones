<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;
use App\Models\Service;

class Booking extends Model
{
    //
    protected $fillable = [
        'fecha',
        'hora_inicio',
        'hora_final',
        'mesa_asignada',
        'senia',
    ];

    protected$casts = [
        'fecha'=> 'date:Y-m-d',
        'hora_inicio'=>'string',
        'hora_final'=>'string',
        'senia'=>'decimal:2',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'users_bookings')->withTimestamps();
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class,'services_bookings')->withTimestamps();
    }
}
