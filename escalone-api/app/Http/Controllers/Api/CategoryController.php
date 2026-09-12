<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        try {            
            $products = Category::with('products')->get();

            if($products->isEmpty())
            {
                return response()->json([
                    'status'=>false,
                    'message'=>'No hay Catergias disponibles por el momento',
                    'data'=> [],
                ],200);
            }

            return response()->json([
                'status'=>true,
                'data'=>$products
            ],200);   
        } catch (\Exception $e) {
            \Log::error("Error en el CategoryController: " . $e->getMessage());
            return response()->json([
                'message'=>$e->getMessage(),
                'error'=>'Error en el servidor, no se pudieron cargar las categorias',                
            ],500,[],JSON_UNESCAPED_UNICODE);
        }        
    }
}
