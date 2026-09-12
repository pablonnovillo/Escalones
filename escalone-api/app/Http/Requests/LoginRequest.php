<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
                'email'=>'required|email',
                'password'=>'required|string|min:8',
        ];               
    }

    public function messages(): array
    {
        return [
                'email.required'=>'Por favor, ingrese su correo electrónico',
                'password.required'=>'Por favor, ingrese su contraseña',
                'email.email'=>'El email ingresado no tiene el formato válido',
                'password.min' =>'La contraseña debe tener 8 caracteres como mínimo'
        ];
    }
}
