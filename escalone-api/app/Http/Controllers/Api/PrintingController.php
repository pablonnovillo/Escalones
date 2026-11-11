<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ValidationPrintRequest;
use App\Models\Printing;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Order;
use App\Traits\SendMultipleFiles;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class PrintingController extends Controller
{
    use SendMultipleFiles;

    public function validationPrint(ValidationPrintRequest $request)
    {
        $validated = $request->validated();

        if(count($request->file('files'))>1)
        {
            if($this->sizeFiles($request->file('files')) > 4096)
            {
                return response()->json([
                    'errors'=>[
                        ['El tamaño total de ambos supera los 4 MB',]
                    ]            
                ],422);
            }
        }

        return response()->json(true, 200);
    }

    public function sizeFiles($files)
    {
        $totalSizeMb = 0;
        foreach($files as $file)
        {
            $totalSizeMb += $file->getSize() / 1024 / 1024;
        }
        return $totalSizeMb;
    }

    public function checkOrderNumber(Request $request)
    {
        try {
            $numeroPedido = $request->numero_pedido;

            $exists = Order::where('numero_pedido',$numeroPedido)->exists();

            return response()->json(!$exists,200);
            
        } catch (\Exception $e) {
            \Log::error("Error en la funcion de checkOrderNumber: " . $e->getMessage());
            return  response()->json([
                'error'=>'Error interno con el servidor, no se pudo conectar con la base de datos'
            ],500);
        }        
    }

    public function store(Request $request)
    {
        //throw new \Exception();
        DB::beginTransaction();
        try{                    

            $users = User::firstOrCreate(
                ['email' => $request->email_cliente],
                ['password'=>Hash::make(env('PASSWORD_GENERIC')),
                'nombre_usuario' => $request->nombre_cliente,
                'telefono' => $request->telefono_cliente,
            ]);

            $order = Order::create([
                'modo_entrega'=>$request->modo_entrega,
                'dirección_envio'=>$request->direccion_envio,
                'senia_recargo'=>$request->senia_recargo,
                'numero_pedido'=>$request->numero_pedido,
                'precio_total'=>$request->precio_total
            ]);


            DB::table('users_orders')->insert([
                'user_id'=>$users->id,
                'order_id'=>$order->id
            ]);

            $files = $request->file('files');
            $path = null;            

            $documents = [];

            foreach($files as $file) {                

                $printing = Printing::create([                    
                    'file'=>$file->getClientOriginalName(),
                    'tipo_papel'=>$request->tipo_papel,
                    'comentario' => $request->comentario_cliente,
                    'num_copias'=>$request->num_copias,
                    'precio_total'=>$request->precio_total,                
                ]);

                DB::table('printings_orders')->insert([
                    'printing_id'=>$printing->id,
                    'order_id'=>$order->id
                ]);

                $documents[] = [
                    'path' => $file->getPathname(),
                    'name' => $file->getClientOriginalName()
                ];
            } 

            $this->sendMultipleFiles($request->nombre_cliente, $request->email_cliente, "Nuevo pedido de Impresiones", $documents, $request->comentario_cliente);            
         
            DB::commit();
            return response()->json([
                'message'=>'Pedido de impresiones solicitados',
                'printing_id'=>$printing->id,
                'order_id'=>$order->id
            ],201);

        }catch(\Exception $e){
            DB::rollBack();
            \Log::error("Error creado en el registro de la funcion store: " . $e->getMessage());            
            return response()->json([
                'message'=> $e->getMessage(),
                'error'=>"Hubo un error interno en el servidor"
            ],500);

        }
    }

    public function userPrintings()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $impresiones = DB::table('printings')
                ->join('printings_orders','printings.id', '=','printings_orders.printing_id')
                ->join('orders','printings_orders.order_id','=','orders.id')
                ->join('users_orders','orders.id','=','users_orders.order_id')
                ->where('users_orders.user_id', $user->id)
                ->select(
                    'printings.id',
                    'printings.file',
                    'printings.tipo_papel',
                    'printings.num_copias',
                    'printings.precio_total as precio_impresion',
                    'printings.created_at',
                    'orders.numero_pedido',
                    'orders.modo_entrega',
                    'orders.dirección_envio',
                    'orders.precio_total as precio_orden'
                )->get();

                if($impresiones->isEmpty())
                {
                    return response()->json([
                        'status'=>false,
                        'message'=>'Aún no tenés impresiones realizadas',
                        'data'=>[]
                    ],200);                    
                }

                return response()->json([
                    'status'=>true,
                    'message'=>'Impresiones obtenidas con exito',
                    'data'=> $impresiones
                ]);

        }catch(\Timon\JWTAuth\Exceptions\JWTException $e) { 
            return response()->json([
                'status'=>false,
                'error'=>'Token invalido o vencido',
                'message'=>$e->getMessage()
            ],401);

        }catch (\Exception $e) {
            \Log::error("Error en userPrintings: " . $e->getMessage());
            return response()->json([
                'status'=>false,
                'error'=> 'Error al obtener las impresiones',
                'message'=> $e->getMessage()
            ], 500);            
        }
    }


}
