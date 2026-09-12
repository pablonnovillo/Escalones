<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
         // CORS habilitado para toda la API
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);

        //habilitar si queres para la web
        /*$middleware->web(append: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);*/
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
        $exceptions->render(function (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Error de comunicación',
                'error'   => 'Tuvimos problemas con la conexión de base de datos, contactese con el administrador del sitio.'
            ], 500, [], JSON_UNESCAPED_UNICODE);
        });
    })->create();
