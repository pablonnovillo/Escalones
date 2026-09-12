<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        try {            
            $products = Product::all();

            if($products->isEmpty())
            {
                return response()->json([
                    'status'=>false,
                    'message'=>'No hay productos disponibles por el momento',
                    'data'=> [],
                ],200);
            }

            return response()->json([
                'status'=>true,
                'data'=>$products
            ],200);   
        } catch (\Exception $e) {
            \Log::error("Error en el ProductController: " . $e->getMessage());
            return response()->json([
                'error'=>'Error en el servidor, no se pudieron cargar los productos',                
            ],500);
        }        
    }

    public function filterCategory(Request $request)
    {
        try {
            $nombreCategoria = $request->categoria;

            $filtrarProductos = DB::table('products')->join('categories','products.category_id','=','categories.id')->select('products.*','categories.name as nombre_categoria')->where('categories.name','=',$nombreCategoria)->get();

            if($filtrarProductos->isEmpty())
            {
                return response()->json([
                    'mensaje' => 'No hay productos para la categoría: ' . $nombreCategoria,
                    'data' => [] 
                ], 200);
            }

            return response()->json([
                'mensaje'=>'Productos encontrados',
                'data'=>$filtrarProductos
            ]);

        } catch (\Exception $e) {
             \Log::error("Error en el ProductController: " . $e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'error'   => 'Tuvimos problemas con la conexión de base de datos, contactese con el administrador del sitio.'
                ], 500, [], JSON_UNESCAPED_UNICODE);
            }
    }   
}
