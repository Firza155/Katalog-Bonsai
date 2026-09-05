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
    Schema::table('transaksi_qris', function (Blueprint $table) {
        $table->string('nama_pembeli')->nullable()->after('bonsai_id');
        $table->string('item_pembelian')->nullable()->after('nama_pembeli');
    });
}

public function down(): void
{
    Schema::table('transaksi_qris', function (Blueprint $table) {
        $table->dropColumn(['nama_pembeli', 'item_pembelian']);
    });
}
};
