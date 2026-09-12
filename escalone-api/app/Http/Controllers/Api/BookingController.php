<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ValidationBookingRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use App\Models\User;
use App\Models\Service;
use App\Models\Game;
use App\Models\Bar;
use App\Traits\MailSender;
use Illuminate\Support\Facades\Hash;
use App\Traits\TemplateTicket;
use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class BookingController extends Controller
{
    use MailSender, TemplateTicket;

    public function validationBooking(ValidationBookingRequest $request)
    {      

        $validated = $request->validated();        
       
        return response()->json(true, 200);
    }

    public function numberBooking()
    {
        try {
            $lastBooking = Service::orderBy('id','desc')->first();

            if($lastBooking)
            {
                return response()->json([
                    "message"=>true,
                    "numero_reserva"=>$lastBooking->numero_reserva
                ], 200);
            }
            
            return response()->json([
                'error'=>false
            ],200);
        } catch (\Exception $e) {
            \Log::error("Error verificando booking: " . $e->getMessage());
            return response()->json([
                'error'=>'Error en el servidor',
                'message'=> $e->getMessage()
            ],500);
        }
        
    }

    public function store(Request $request)
    {        
        DB::beginTransaction();
        try{            
            $booking=Booking::create([
                'fecha'=>$request->fecha,
                'hora_inicio'=>$request->hora_inicio,
                'hora_final'=>$request->hora_final,
                'mesa_asignada'=>$request->mesa_asignada,
                'senia'=>$request->senia,                
            ]);
            $users = User::firstOrCreate(                
                ['email'=>$request->email_cliente],
                ['password'=>Hash::make(env('PASSWORD_GENERIC'))]
            );
        
            $service=Service::create([
                'tipo_servicio'=>$request->tipo_servicio,
                'duracion'=>$request->duracion,
                'descripción'=>$request->descripcion,
                'numero_reserva'=>$request->numero_reserva,
                'incluye_consumo'=>$request->incluye_consumo,
                'precio_total'=>$request->precio_total
            ]);

            DB::table('users_bookings')->insert([
                'user_id'=>$users->id,
                'booking_id'=>$booking->id
            ]);

            DB::table('services_bookings')->insert([
                'service_id'=>$service->id,
                'booking_id'=>$booking->id
            ]);
           
            $this->createSubService($service->id, $request->tipo_servicio);

            $cantidadTurnos = DB::table('users_bookings')->where('user_id',$users->id)->count();

            $mostrarActivacion = ($cantidadTurnos===1);

            $messageContent = $this->ticketTemplate($request->numero_reserva,$request->fecha,$request->hora_inicio, $request->hora_final,$request->mesa_asignada,$request->email_cliente, $mostrarActivacion);
          
            $this->sendMail("Sr. usuario", $request->email_cliente, "Envio de reserva de turno", $messageContent,"Escalones - Reservas");
            
            DB::commit();
            return response()->json([
                'message'=>'Turno creado con exito',
                'booking_id'=>$booking->id,
                'service_id'=>$service->id
            ],201);

        }catch(\Exception $e){
            DB::rollBack();
            \Log::error('Error creando el turno ' . $e->getMessage());
            return response()->json([
                'error'=>'Error del servidor al crear el turno solcitado',
                'message'=>$e->getMessage()
            ],500);

        }
    }

    public function userBookings()
    {
        try {            
            $user = JWTAuth::parseToken()->authenticate();
            

            $reservas = DB::table('bookings')->join('users_bookings','bookings.id','=','users_bookings.booking_id')->join('services_bookings','bookings.id','=','services_bookings.booking_id')->join('services','services_bookings.service_id','=','services.id')->where('users_bookings.user_id',$user->id)->select('services.tipo_servicio','bookings.id','bookings.fecha','bookings.hora_inicio','bookings.hora_final','bookings.mesa_asignada', 'services.numero_reserva','services.precio_total')->get();

            //$reservas =[];

            if($reservas->isEmpty())
            {
                return response()->json([   
                    'status'=>false,                  
                    'message'=>'Aun no tenes reservas realizadas',
                    'data'=>[]
                ],200);
            }

            return response()->json([
                'status'=>true,
                'message'=>'reservas obtenidas!',
                'data'=>$reservas
            ],200);

        } catch(\JWTException $e){
            return response()->json([
                'status'=>false,
                'error'=>'token invalido o vencido',
                'message'=> $e->getMessage()
            ],401);
        }
        catch (\Exception $e) {
            \Log::error("Error en usarBookings: " . $e->getMessage());
            return  response()->json([
                'status'=>false,
                'error'=>'error al obtener las reservas',
                'message'=>$e->getMessage()
            ],500);
            
        }
    }    

    private function createSubService($serviceId, $tipo)
    {
        $map = [
            'juegos' => \App\Models\Game::class,
            'co-working' => \App\Models\Bar::class
        ];

        if(isset($map[$tipo])){
            $model = $map[$tipo];
            $model::create(['services_id' => $serviceId]);
        }
            
    }
}
