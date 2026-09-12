<?php

namespace App\Traits;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

trait SendFilesMail
{
	protected function sendFiles($name, $email, $asunto, $rutaTemporal, $nombreOrignal, $messageContent)
	{
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

            $mail->setFrom($email, $email);            
            //$mail->addAddress($email, $name);
            //$mail->setFrom($email, $email);
            //$mail->addReplyTo($email, $name);
            //$mail->addAddress('pablonovillo@yahoo.com','Escalone');
            //Datos adjuntos
            $mail->addAttachment($rutaTemporal, $nombreOrignal);
            $mail->addAddress(env('COMPANY_EMAIL'),'Escalone');


            $mail->isHTML(true);
            $mail->Subject = $asunto;
            $mail->Body    =  $messageContent ?: ' Sin ningun mensaje';

            $mail->send();

            return ['success' => true];

        } catch (\Exception $e) {
                return [
                    'success' => false,
                    'error' => $mail->ErrorInfo
                ];
        }
	}
}
