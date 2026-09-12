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
        Schema::create('services_bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('booking_id');

            $table->foreign('service_id')->references('id')->on('services')->onUpdate('cascade')->onDelete('no action');
            $table->foreign('booking_id')->references('id')->references('id')->on('bookings')->onUpdate('cascade')->onDelete('no action');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services_bookings');
    }
};
