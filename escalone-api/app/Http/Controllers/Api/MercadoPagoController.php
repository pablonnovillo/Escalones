<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class MercadoPagoController extends Controller
{   
    public function createPreference(Request $request)
    {
      $accessToken = env('MERCADOPAGO_ACCESS_TOKEN');
      $preferenceData = [
            "items" => [
                [
                    "title" => $request->title,
                    "quantity" => 1,
                    "unit_price" => (float)$request->price
                ]
            ],
            "back_urls" => [
                //"success" => "https://www.google.com/",
                 "success" => "https://escalone-test.web.app/pago-verificado",
                //"failure" => "http://localhost:5173",
                //"pending" => "http://localhost:5173"               
                "failure" => "https://escalone-test.web.app/pago-rechazado",
                "pending" => "https://escalone-test.web.app/pago-rechazado"
            ]
            //"auto_return" => "approved"            
        ];

         $idempotencyKey = uniqid('mp_', true);
         $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Content-Type' => 'application/json',
            'X-Idempotency-Key' => $idempotencyKey
        ])->post('https://api.mercadopago.com/checkout/preferences', $preferenceData);

        if ($response->failed()) {
            return response()->json(['error' => $response->body()], 500);
        }

        $responseData = $response->json();

        return response()->json([
            'preferenceId' => $responseData['id'] ?? null,
            'init_point' => $responseData['init_point'] ?? null
        ]);
    }  

    public function webhook(Request $request){
         $data = $request->all();

        \Log::info('Webhook MercadoPago', $data);

        return response()->json(['status' => 'ok']);
    }   
}
