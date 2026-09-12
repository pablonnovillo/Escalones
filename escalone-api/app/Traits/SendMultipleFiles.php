<?php

namespace App\Traits;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

trait SendMultipleFiles
{

	protected function sendMultipleFiles($name, $email, $asunto, array $files, $messageComment = null)
	{
		try
		{			
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

            foreach($files as $file)
            {
            	$mail->addAttachment($file['path'], $file['name']);
            }
            $mail->addAddress(env('COMPANY_EMAIL'),'Escalone');

            $mail->isHTML(true);
            $mail->Subject = $asunto;
            $mail->Body = !empty($messageComment) ? $messageComment : ' ';

            $mail->send();
		}catch(\Exception $e)
		{
			 \Log::error("Error creado en " . $e->getMessage());
			return [
				'success'=> false,
				'error' => $e->getMessage()
			];
		}
	}

}


