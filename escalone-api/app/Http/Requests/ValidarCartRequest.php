<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidarCartRequest extends FormRequest
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
            'email_cliente'=>'required|email',            
            'modo_entrega'=>'required|string',
            'direccion_envio'=>'required_if:modo_entrega,envio|string|nullable'          
        ];
    }

    public function messages(): array
    {
        return [
            'email_cliente.required'=>'Por favor, ingrese su correo electrónico',
            'direccion_envio.required_if'=>'Por favor, ingrese la dirección del domicilio',
        ];
    }
}
