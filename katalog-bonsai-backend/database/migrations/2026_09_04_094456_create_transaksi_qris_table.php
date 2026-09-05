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
        Schema::create('transaksi_qris', function (Blueprint $table) {
    $table->id();
    $table->string('order_id')->unique();
    $table->foreignId('bonsai_id')->nullable()->constrained('bonsais')->nullOnDelete();
    $table->decimal('amount', 12, 2);
    $table->enum('status', ['pending', 'settlement', 'expire', 'cancel'])->default('pending');
    $table->longText('raw_response')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_qris');
    }
};
