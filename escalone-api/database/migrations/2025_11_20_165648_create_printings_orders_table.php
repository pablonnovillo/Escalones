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
        Schema::create('printings_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('printing_id');
            $table->unsignedBigInteger('order_id');

            $table->foreign('printing_id')->references('id')->on('printings')->onUpdate('cascade')->onDelete('no action');
            $table->foreign('order_id')->references('id')->on('orders')->onUpdate('cascade')->onDelete('no action');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('printings_orders');
    }
};
