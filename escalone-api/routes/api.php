<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MercadoPagoController;
use App\Http\Controllers\Api\PrintingController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Middleware\JwtProtector;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class,'register']);
Route::post('/iniciar-sesion',[AuthController::class,'login']);
Route::post('/login-google',[AuthController::class,'googleLogin']);
Route::post('/contacto',[ContactController::class,'index']);

//Rutas de forgat Contraseña PROBAR
Route::post('/gestion-cuenta',[AuthController::class,'accountManagement']);
Route::post('/forgot-password',[AuthController::class,'forgotPassword']);
Route::post('/activar-correo',[AuthController::class,'resendVerification']);
Route::post('/reset-password',[AuthController::class,'resetPassword']);

//Rutas de validaciones y servicios
Route::post('/validar-impresion',[PrintingController::class,'validationPrint']);
Route::post('/validar-reserva',[BookingController::class,'validationBooking']);
Route::get('/consultar-numero-reserva',[BookingController::class,'numberBooking']);
Route::post('/pedido-impresiones',[PrintingController::class,'store']);
Route::get('/verificar-numero-pedido',[PrintingController::class,'checkOrderNumber']);


Route::post('/reserva-servicio',[BookingController::class,'store']);

//Rutas Tienda Online
Route::get('/productos',[ProductController::class,'index']);
Route::get('/productos/filtrar', [ProductController::class,'filterCategory']);
Route::get('/categorias',[CategoryController::class,'index']);

Route::post('/validar-carrito',[OrderController::class,'validateCart']);
Route::post('/abonar-carrito',[OrderController::class,'paymentCart']);

Route::middleware([JwtProtector::class])->group(function(){
    Route::get('/mis-reservas',[BookingController::class,'userBookings']);
    Route::get('/mis-impresiones',[PrintingController::class,'userPrintings']);
    Route::post('/update-profile',[AuthController::class,'updateProfile']);
});


//Rutas de mercadopago
Route::post('/mercadopago/preference', [MercadoPagoController::class,'createPreference']);
Route::post('/mercadopago/webhook', [MercadoPagoController::class,'webhook']);

