<?php

namespace App\Traits;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

trait MailSender
{
    protected function sendMail($name, $email, $asunto, $messageContent, $title)
    {
        //throw new \Exception();
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = env('HOST_MAILER');
            $mail->SMTPAuth = true;            
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = 'tls';
            $mail->Port = env('PORT_MAILER');
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            /*$mail->SMTPDebug = 2; 
            $mail->Debugoutput = function($str, $level) {
                \Log::debug("SMTP DEBUG: $str");
            };*/
            
            $mail->setFrom(env('MAIL_USERNAME'), $title);            
            $mail->addAddress($email, $name);            


            $mail->isHTML(true);            
            $mail->Subject = $asunto;            
            $mail->Body    = $messageContent;

            $mail->send();
            //return ['success' => true];            
        } catch (\Exception $e) {
            \Log::error("Fallo de envio de correo a " . $e->getMessage());
            //throw new \Exception("No pudimos enviar a su correo la solicitud, verifique si es correcto o intente más tarde.");
            /*return [
               'success' => false,
               'error' => "No pudimos enviar a su correo la solicitud, verifique si es correcto o intente más tarde."
            ];*/
        }            
    }    
}
