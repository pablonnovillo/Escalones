<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidationBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [            
                'fecha'=>'required|date',
                'hora_inicio'=>'required|date_format:H:i',
                'hora_final'=>'required|date_format:H:i|after:hora_inicio',           
                'email_cliente'=>'required|email',                        
        ];
    }

    public function messages(): array
    {
        return [
            "fecha.required" => "Por favor, selecciona la fecha de calendario",
            "fecha.date"=>"La fecha no tiene un formato valido",
            "hora_inicio.required"=>"Porfavor, ingrese la hora de inicio",
            "hora_inicio.date_format"=>"La hora de inicio debe tener el formato válido",
            "hora_final.required"=>"Porfavor, ingrese la hora de final",
            "hora_final.date_format"=>"la hora final deber tener un formato válido",
            "hora_final.after"=>"La hora final debe ser mayor a la de inicio, y debe ser el mismo dia",
            "email_cliente.required"=>"Por favor, ingrese su email",
            "email_cliente.email"=>"El email ingeresado no es valido"
        ];
    }
}



