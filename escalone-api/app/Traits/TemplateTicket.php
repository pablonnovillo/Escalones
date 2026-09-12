<?php

namespace App\Traits;

use Carbon\Carbon;

trait TemplateTicket{

	function ticketTemplate($turno, $fecha, $horaInicio, $horaFin, $mesa, $email, $showActivation)
    {
        $fechaFormateada = Carbon::parse($fecha)->format('d-m-Y');
        $bloqueActivacion = '';

        if($showActivation){
            $bloqueActivacion = '
            <div class="text-center fw-bolder">
                <p>
                Para activar tu cuenta, hace click en este 
                <a href="' . env('APP_URL') . '/verify-email/' . $email . '">enlace</a><br>
                Tus credenciales son:<br>
                Email: ' . $email . '<br>
                Password:' . env('PASSWORD_GENERIC') . '<br>
                Conviene cambiar la contraseña en "olvidar contraseña"
                </p>
            </div>';
        }

        return '
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .ticket {
                    max-width: 600px;
                    margin: auto;
                    background: #ffffff;
                    border: 2px solid #000;
                }
                .section {
                    padding: 25px;
                    text-align: center;
                    border-bottom: 1px solid #000;
                }
                .section:last-child {
                    border-bottom: none;
                }
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                .info {
                    font-size: 18px;
                }

                .text-center{
                    text-align:center;
                }
                .fw-bolder{
                    font-weight:bolder;                    
                }
            </style>
        </head>
        <body>
           ' . $bloqueActivacion . '
            <div class="ticket">
                <div class="section">
                    <div class="title">COMPROBANTE DE RESERVA TURNO: ' . $turno . '</div>
                </div>
                <div class="section">
                    <div class="info">' . $fechaFormateada . ' de ' . $horaInicio . ' a ' . $horaFin . '</div>
                </div>
                <div class="section">
                    <div class="info">MESA ASIGNADA: ' . $mesa . '</div>
                </div>
                <div class="section">
                    <div class="info">Confirmación enviada a ' . $email . '</div>
                </div>
            </div>
        </body>
        </html>';
    }
}