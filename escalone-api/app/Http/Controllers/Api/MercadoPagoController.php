<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class MercadoPagoController extends Controller
{   

    private $frontUrl;

    public function __construct()
    {
        $this->frontUrl = env('APP_URL_FRONT');
    } 

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
                "success" => env('REDIRECT_PAY_CONFIRM'),
                "failure" => env('REDIRECT_PAY_FAILED'),
                "pending" => env('REDIRECT_PAY_PENDING'),
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

    public function rutaAprobadoMP(){        
        return redirect("{$this->frontUrl}/pago-verificado");
    }

    public function rutaFailedMP(){        
        return redirect("{$this->frontUrl}/servicios");
    }

    public function rutaPendingMP(){
        return redirect("{$this->frontUrl}");
    }
}
