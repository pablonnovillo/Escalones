<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\Api\AuthController;

Route::get('/', function () {
    return view("welcome");   
});

Route::get('verify-email/{email}', [AuthController::class, 'activateEmail']);