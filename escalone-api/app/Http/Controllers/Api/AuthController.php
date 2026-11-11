<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Traits\ApiResponseHandler;
use App\Traits\MailSender;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Http;
//use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use ApiResponseHandler;
    use MailSender;

    public function register(RegisterRequest $request){         

        try{
            $validated = $request->validated();           

            $user=User::create([
                'nombre_usuario'=>$request->nombre_usuario,
                'email'=> $request->email,
                'password'=>Hash::make($request->password),
            ]);            
            
            $linkVerify = $this->getVerificationMessage($user->nombre_usuario, $user->email);
            $this->sendMail($user->nombre_usuario, $user->email, "Verificar correo", $linkVerify, "Escalones - Confirmación email");
            
            return response()->json([
                'message'=>'Se le ha enviado un link a su correo para validar la cuenta',
            ],201);            

        }catch(\Exception $e){           
          return $this->handleApiError($e, 'Error al registrar usuario');  
        }
    }

    public function login(LoginRequest $request){        

        try{           
            
            $request->validated();

            $user = User::where('email',$request->email)->first();

            if(!$user){
                return response()->json([
                    'error'=>'No existe usuario registrado'
                ],401);
            }

            if($user && is_null($user->password)){
                return response()->json([
                    'errors'=>[
                        ['Esta cuenta fue registrada con Google. Por favor, inicie sesion usando el boton de Google.']
                    ]
                ], 422);
            }

            if($user->activo!='1'){
                return response()->json([
                //'error' => 'Usuario inactivo, verifique en su casilla de email para validar o active su cuenta'
                'error' => 'Usuario inactivo, porfavor active su cuenta'
                ], 403);
            }

            $credentials = $request->only('email','password');

            if(!$token=JWTAuth::attempt($credentials)){
                return response()->json([
                    'error'=>'Las credenciales no son válidas'
                ],401);
            }

            return response()->json([
                'message'=>'Inicio de sesion exitoso',
                'token'=>$token,
                'user'=>[
                    'id'=>$user->id,
                    'email'=>$user->email,
                    'nombre_usuario'=>$user->nombre_usuario,
                    'apellido'=>$user->apellido,
                    'telefono'=>$user->telefono,
                    'imagen_perfil'=>$user->imagen_perfil

                ]
            ]);                               
        }catch(\Exception $e){
            \Log::error("Error creado en el registro " . $e->getMessage());
            return $this->handleApiError($e,"Error al iniciar sesión");
        }
    }        

    public function googleLogin(Request $request)
    {
        try {
             $request->validate([
                'token'=>'required|string',
            ]);

            $googleKeyResponse = Http::get('https://www.googleapis.com/oauth2/v3/certs');
            $keys = JWK::parseKeySet($googleKeyResponse->json());

            $payload = (array) JWT::decode($request->token, $keys);

            $clientId = config('services.google.client_id');

            if($payload['aud'] !== $clientId){
                return response()->json(['error'=>'El token no pertenece a esta aplicación'],401);
            }

            $email = $payload['email'];
            $googleId = $payload['sub'];
            $nombre = $payload['given_name'] ?? $payload['name'] ?? 'Usuario';
            $apellido = $payload['family_name'] ?? '';
            $foto = $payload['picture'] ?? null;

            $user = User::where('email', $email)->first();

            if(!$user){
                $user = User::create([
                    'nombre_usuario'=>$nombre,
                    'apellido'=>$apellido,
                    'email'=>$email,
                    'google_id'=>$googleId,
                    'imagen_perfil'=>$foto,
                    //'imagen_perfil'=> null,
                    'activo'=>'1',
                    'password'=>null,
                ]);                
            }else{
                if(!$user->google_id){
                    $user->update(['google_id'=>$googleId]);
                }
            }

            $token = JWTAuth::fromUser($user);

           return response()->json([
            'message'=>'Inicio de sesión exitoso',
            'token'=>$token,
            'user'=>[
                'id'=>$user->id,
                'email'=>$user->email,
                'nombre_usuario'=>$user->nombre_usuario,
                'apellido'=>$user->apellido,
                'telefono'=>$user->telefono,
                'imagen_perfil'=>$user->imagen_perfil
            ]
           ]);
            
        } catch (\Exception $e) {
            //return response()->json(['error'=>'Token de Google inválido o expirado'], 401);
            \Log::error("Error en googleLogin ". $e->getMessage());
            return $this->handleApiError($e,"Error al iniciar sesion con Google");
        }
    }

    public function activateEmail(Request $request)
    {
        $user = User::where([
            ['email','=',$request->email],
            ['activo','=','0'],
        ])->first();        

        if($user){
            $user->activo  ='1';
            $user->save();
            return redirect()->away(env('APP_URL_FRONT') . "/auth/iniciar-sesion");
        }    
        return redirect()->away(env('APP_URL_FRONT') . "/auth/registro");
    }

    public function accountManagement(ForgotRequest $request)
    {
        $request->validated();

        return response()->json(true, 200);
    }

    public function resendVerification(Request $request){
        try {            
             
            $user = User::where('email',$request->email)->where('activo','0')->first();    

            if(!$user)
            {
                return response()->json([
                    'error'=>'usuario ya esta activo'
                ],401);
            }            

            $linkVerify = $this->getVerificationMessage($user->nombre_usuario, $user->email);
            $this->sendMail($user->nombre_usuario, $request->email, "Verificar correo", $linkVerify, "Escalones - Confirmación email");
            
            return response()->json([
                'message'=>'Se le ha enviado un link a su correo para validar su email',                
            ],201);            
        } catch (\Throwable $th) {
            return $this->handleApiError($th, "Error al envió del correo");
        }
    }
    //Olvido de Contraeña
    public function forgotPassword(Request $request)
    {   

        try {                       

            $user = User::where('email',$request->email)->first();
                $token = Str::random(64);
                DB::table("password_reset_tokens")->updateOrInsert(
                    ['email'=>$user->email],
                    [
                        "token"=>Hash::make($token),
                        "created_at"=>Carbon::now()
                    ]
                );

                $link = env('APP_URL_FRONT') . "/reset-password?token={$token}&email={$user->email}";

                $mensaje = "Hola {$user->nombre_usuario}, haga click en este enlace <br> <a href='{$link}'>{$link}</a>";                

                $this->sendMail($user->nombre_usuario, $user->email, "Se enviado el link para reestablecer su contraseña", $mensaje,'Escalone');
                
                return response()->json(['message'=>'Link enviado'],200);
        } catch (\Exception $e) {                        
            return $this->handleApiError($e,"Error al envíar link de recuperación");
        }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $request->validated();

        try {
            $record = DB::table('password_reset_tokens')->where('email',$request->email)->first();

            if(!$record || !Hash::check($request->token, $record->token))
            {
                return response()->json(['error'=>'Token inválido'],400);
            }

            User::where('email',$request->email)->update([
                'password'=>Hash::make($request->password),
            ]);

            DB::table('password_reset_tokens')->where('email',$request->email)->delete();

            return response()->json(['message'=>'Contraseña actualizada'],200);
            
        } catch (\Exception $e) {
            return $this->handleApiError($e,"Error al enviar el link de reestablecer contraseña");
        }
    }

    private function getVerificationMessage($nombre, $email) {
        $link = env('APP_URL') . "/verify-email/" . $email;
        return "Hola {$nombre}, se le ha enviado un link, presiona en: <a href='{$link}'>Link</a>";
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = auth()->user();

            if(!$user)
            {
                return response()->json(['error'=>'Usuario no autenticado'],401);
            }

            $request->validate([
                'nombre_usuario'=>'sometimes|required|string|max:60',
                'apellido'=>'nullable|string|max:60',
                'telefono'=>'nullable|string|max:20',
                //'imagen_perfil'=>'nullable|string|mimes:jpeg,png,jpg,webp|max:2048',                
                'imagen_perfil'=>'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            if($request->filled('nombre_usuario'))
            {
                $user->nombre_usuario = $request->nombre_usuario;
            }

            $user->apellido = $request->apellido;
            $user->telefono = $request->telefono;

            if($request->hasFile('imagen_perfil'))
            {
                $file = $request->file('imagen_perfil');
                $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images'),$filename);
                $user->imagen_perfil = url('images/' . $filename);
            }

            $user->save();

            return response()->json([
                'message'=>'Perfil actualizado correctamente'
            ],200);

        } catch (\Exception $e) {
            return $this->handleApiError($e, 'Error al actualizar el Perfil');
        }
    }
}
