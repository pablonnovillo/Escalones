<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgotRequest extends FormRequest
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
                'email'=>'required|email|exists:users,email',
                'req'=>'required'
        ];
    }

    public function messages(): array
    {
        return  [
            'email.required'=>'Por favor, ingrese su correo electrónico',
            'req.required'=>'Por favor seleccione una acción',
            'email.email'=>'Por favor, ingrese un correo eletrónico válido',
            'email.exists'=>'El email ingresado no es un usuario activo o no esta registrado'
        ];
    }
}
