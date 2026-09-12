<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Requests\IndexContactRequest;
use Illuminate\Validation\ValidationException;
use App\Traits\ApiResponseHandler;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Traits\MailSender;


class ContactController extends Controller
{

    use ApiResponseHandler, MailSender;

    public function index(IndexContactRequest $request){          

        try {             
            $request->validated();        

            $nombre = $request->nombre;
            $email = $request->email;
            $mensaje = $request->mensaje;            

            $this->sendMail($nombre, $email, $mensaje);           
            
            $contact = Contact::create($request->all());                
            return response()->json([
                'message' => 'Correo enviado con éxito',                    
            ], 201);
        } catch (\Exception $e) {
            return $this->handleApiError($e, 'Error en el sistema, intente más tarde');                   
        }               
    }

    private function sendMail($name, $email, $messageContent)
    {
        //throw new \Exception();
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');            
            $mail->SMTPSecure = 'tls';
            $mail->Port = env('PORT_MAILER');            


            $mail->setFrom($email, $email);                        
            $mail->addReplyTo($email, $name);            
            $mail->addAddress(env('COMPANY_EMAIL'),'Escalone');


            $mail->isHTML(true);
            $mail->Subject = 'Nuevo contacto recibido';
            $mail->Body    = 'Hola soy ' . $name . ', y mi mensaje es: <br>' . $messageContent;

            $mail->send();           

        } catch (\Exception $e) {
            \Log::error("Fallo de envio de correo a " . $e->getMessage());            
            return [
                'success' => false,
                'error' => "No pudimos enviar a su correo la solicitud, verifique si es correcto o intente más tarde."
            ];
        }
    }    
}
