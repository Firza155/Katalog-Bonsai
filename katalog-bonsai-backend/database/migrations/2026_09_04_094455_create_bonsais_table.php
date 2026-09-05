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
        Schema::create('bonsais', function (Blueprint $table) {
    $table->id();
    $table->string('nama');
    $table->text('deskripsi')->nullable();
    $table->decimal('harga', 12, 2);
    $table->enum('kategori', ['bahan', 'prospek', 'bonsai_jadi']);
    $table->enum('status', ['tersedia', 'pending', 'terjual'])->default('tersedia');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bonsais');
    }
};
