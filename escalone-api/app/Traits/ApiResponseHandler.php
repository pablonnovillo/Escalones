<?php

namespace App\Traits;

use Illuminate\Validation\ValidationException;

trait ApiResponseHandler
{
    protected function handleApiError(\Exception $e, string $message)
    {
        \Log::error('Error en' . $e->getMessage());
        if ($e instanceof ValidationException) {
            return response()->json([
                'message'=> $message,
                'error'  => $e->getMessage()
            ], 422, [], JSON_UNESCAPED_UNICODE);
        }

        // 2. Error de Base de Datos (PDOException / QueryException)
        if ($e instanceof \PDOException || $e instanceof \Illuminate\Database\QueryException) {
            return response()->json([
                'message' => $message,
                'error'   => 'Tuvimos problemas con la conexión de base de datos, contactese con el administrador del sitio.'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        }

        return response()->json([            
            'message'=> $e->getMessage(),            
            'error' => $message,
        ], 500, [], JSON_UNESCAPED_UNICODE);
    }
}
