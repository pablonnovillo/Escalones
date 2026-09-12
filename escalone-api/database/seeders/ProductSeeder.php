<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Lapiceras'=>[
                ['nombre' => 'Lapicera Parker Jotter', 'precio' => 15000,  'descripcion'=>'El Parker Jotter es un bolígrafo reconocido por su diseño delgado y ligero, ideal para llevarlo cómodamente en el bolsillo o en un estuche.', 'img' => 'parker.webp'],
                ['nombre' => 'Set Microfibras x12', 'precio' => 8500,  'descripcion'=>'Más de 500 productos, llega hoy. Set Microfibras Estilógrafos Profesional X 12 Graduaciones.', 'img' => 'microfibras.webp'],
                ['nombre' => 'Rollerball Gel 0.5', 'precio' => 2200,  'descripcion'=>'El Rollerball Gel Binbao 0.5 Azul ofrece un trazo preciso con tinta de secado rápido, ideal para uso escolar, oficina y comercial', 'img' => 'roller.webp'],
            ],
            'Marcadores'=>[
                ['nombre' => 'Edding 360 Pizarra', 'precio' => 5000,  'descripcion'=>'edding 360 marcador para pizarras blancas: el aliado fiable · Punta redonda 1,5-3 mm · Se borra en seco.', 'img' => 'edding360.png'],
                ['nombre' => 'Marcadores Brush Pen Punta Pincel X6', 'precio' => 12000,  'descripcion'=>'rotulador de fibra sintética cuya punta imita a la de un pincel, lo que permite obtener diferentes grosores de trazo en un solo movimiento', 'img' => 'brush.webp'],
                ['nombre' => 'Resaltadores Pastel x6 Sharpie', 'precio' => 4500,  'descripcion'=>'Resaltadores Sharpie Fine Pastel x6 Colores. FILGO 4.8', 'img' => 'resaltadores.webp'],
            ],
            'Cuadernos'=>[
                ['nombre' => 'Cuaderno Universitario A4', 'precio' => 7000,  'descripcion'=>'1.5 cm de largo, 21.0 cm de ancho y 25.0 cm de alto', 'img' => 'cuaderno_a4.jpg'],
                ['nombre' => 'Libreta Moleskine Style', 'precio' => 9500,  'descripcion'=>'Se distingue por ser un icono contemporáneo de la cultura pop, un espacio en blanco que alberga tus palabras y diseños', 'img' => 'moleskine.jpg'],
                ['nombre' => 'Anotador Espiralado', 'precio' => 3000,  'descripcion'=>'Libreta práctica y funcional, caracterizada por un sistema de encuadernación de espiral (plástico o metálico) que une las hojas y tapas, permitiendo una apertura de 360°', 'img' => 'anotador.webp'],
            ]
        ];

        foreach($categories as $nombreCat => $productos)
        {
            $categoryId = DB::table('categories')->where('name',$nombreCat)->value('id');
            foreach ($productos as $p) {
                DB::table('products')->insert([
                    'nombre' => $p['nombre'],
                    'original_precio' => $p['precio'],
                    'oferta_precio' => $p['precio'] * 0.85,
                    'cantidad'=>20,
                    'descripcion' =>$p['descripcion'],
                    'image'=>$p['img'],
                    'created_at'=>now(),
                    'updated_at'=>now(),
                    'category_id'=>$categoryId,
                ]);
            }

        }
    }
}
