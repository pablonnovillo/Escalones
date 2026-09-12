<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string("tipo_servicio",50)->nullable();
            $table->unsignedInteger("duracion");
            $table->text("descripción")->nullable();
            $table->enum("incluye_consumo",['0','1']);
            $table->unsignedInteger("numero_reserva");
            $table->decimal("precio_total",10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
