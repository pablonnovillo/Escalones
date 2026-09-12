<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidationPrintRequest extends FormRequest
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
            'files'=>'required|array|min:1',
            'files.*'=>'file|mimes:pdf,jpg,jpeg,png|max:4096',
            'tipo_papel'=>'required|string',
            'num_copias'=>'required|integer|min:1',
            'nombre_cliente'=>'nullable|string|max:100',
            'telefono_cliente'=>'nullable|string|min:10',
            'email_cliente'=>'required|email',
            'comentario_cliente'=>'nullable|string',
            'modo_entrega'=>'required|string',
            'direccion_envio'=>'required_if:modo_entrega,envio|string|nullable'           
        ];
    }

    public function messages(): array
    {
        return  [
            'files.required'=>'Por favor, debe subir un archivo',
            'files.*.mimes'=>'El archivo debe ser PDF, JPG, JPEG o PNG',
            'files.*.max'=>'El archivo debe ser menor de 4 megas',
            'tipo_papel.required'=>'Por favor, seleccione el tipo de papel',
            'num_copias.required'=>'Por favor, ingrese la cantidad de copias',
            'num_copias.integer'=>'Por favor, ingrese una cantidad válida',       
            'email_cliente.required'=>'Por favor, ingrese su correo electrónico',
            'direccion_envio.required_if'=>'Por favor, ingrese la dirección del domicilio',
        ];
    }
}
