<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Service;

class Game extends Model
{
    //
    protected $fillable = [
        'services_id',
    ];

    public $timestamps = false;

    public function services(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
