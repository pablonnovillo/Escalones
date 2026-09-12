<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'email'=>'required|email|string|min:3|unique:users',
            'password'=>'required|string|min:8'
        ];        
    }

    public function messages(): array
    {
        return [
            'email.required'=>'Por favor, ingrese su correo electrónico',
            'password.required'=>'Por favor, ingrese la contraseña',
            'email.email'=>'El correo electrónico ingresado no tiene el formato válido'
        ];
    }
}
