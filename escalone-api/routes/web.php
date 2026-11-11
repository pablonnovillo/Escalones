<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MercadoPagoController;

Route::get('/', function () {
    return view("welcome");   
});

Route::get('verify-email/{email}', [AuthController::class, 'activateEmail']);
Route::get('pago-verificado', [MercadoPagoController::class,'rutaAprobadoMP']);
Route::get('compra-cancelada', [MercadoPagoController::class,'rutaFailedMP']);
//Route::get('pago-rechazado', [MercadoPagoController::class,'rutaFailedMP']);
Route::get('pago-pendiente',[MercadoPagoController::class,'rutaPendingMP']);