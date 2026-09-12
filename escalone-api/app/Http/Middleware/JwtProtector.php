<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtProtector extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         try {
            $rawToken = $request->bearerToken();

            // VALIDACIÓN MANUAL ANTES DE TYMON
            if (!$rawToken || $rawToken === 'null' || $rawToken === 'undefined') {
                return response()->json([
                    'status' => false,
                    'error' => 'No se proporcionó un token válido, por favor cierre sesión e intente loguearte'
                ], 401);
            }

            $user = JWTAuth::parseToken()->authenticate();

            if(!$user)
            {
                return response()->json([
                    'status'=>false,
                    'error'=>'usuario no encontrado'

                ],404);
            }

        } catch (\Exception $e) {
            $errorMsg = 'Tuvimos un  error al obtener las reservas, por favor intente más tarde';

            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException)
            {
                $errorMsg = 'La sesión ha expirado, por favor cierre sesión e intente loguearte';
            }else if($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException)
            {
                $errorMsg = 'El token es inválido, por favor cierre sesión e intente loguearte';
            }

            return response()->json([
                'status'=>false,
                'error'=> $errorMsg
            ],401);
        }

        return $next($request);
    }
}
