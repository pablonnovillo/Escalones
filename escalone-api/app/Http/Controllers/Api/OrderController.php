<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ValidarCartRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
     public function validateCart(ValidarCartRequest $request)
    {
        $validated = $request->validated();
        
        return response()->json(true, 200);
    }

    public function paymentCart(Request $request)
    {   
        DB::beginTransaction();

        try {

            $order = Order::create([
                'modo_entrega'=> $request->modo_entrega,
                'dirección_envio'=> $request->domicilio ?? null,
                'numero_pedido'=> $request->numero_pedido,
                'precio_total'=> $request->precio_total,
                'created_at'=> now(),
                'updated_at'=> now(),
            ]);

            $user = User::firstOrCreate(
                ['email'=>$request->email],
                ['password'=>Hash::make(env('PASSWORD_GENERIC'))]
            );

            DB::table('users_orders')->insert([
                'user_id'=>$user->id,
                'order_id'=>$order->id,
            ]);

            foreach($request->productos as $producto)        
            {
                DB::table('orders_products')->insert([
                    'order_id'=>$order->id,
                    'product_id'=>$producto['id'],
                    'cantidad'=> $producto['cantidad'],
                    'subtotal'=> $producto['subtotal'],                    
                ]);
            }

            DB::commit();

            return response()->json([
                'message'=>'Pedido creado con exito',
                'order_id'=> $order->id
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('Error creado en el order: ' . $e->getMessage());
            return response()->json([
                'error'=>'Error del servidor al procesar el pedido',
                'data' => $e->getMessage()
            ],500);
        }        
        
    }
}
