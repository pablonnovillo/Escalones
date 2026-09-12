<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Order;
use App\Models\Booking;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
     'nombre_usuario',
     'telefono',
     'email',
     'password',
     'comentario',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'users_orders');
    }

    public function Bookings()
    {
        return $this->belongsToMany(Booking::class,'users_bokkings');
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    /*protected $fillable = [
        'name',
        'email',
        'password',
    ];*/

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    /*protected $hidden = [
        'password',
        'remember_token',
    ];*/

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //Metodos requeridos por JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
