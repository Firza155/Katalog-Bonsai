<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BonsaiController;
use App\Http\Controllers\Api\TransaksiQrisController;
use App\Http\Controllers\Api\LaporanManualController;
use App\Http\Controllers\Api\LaporanController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;

// Auth
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // CRUD Katalog Bonsai (khusus admin, wajib login)
    Route::apiResource('bonsais', BonsaiController::class);
    Route::delete('/bonsais/{bonsai}/images/{image}', [BonsaiController::class, 'destroyImage']);

    // Transaksi QRIS (khusus admin)
    Route::apiResource('transaksi-qris', TransaksiQrisController::class)->only(['index', 'store']);
    Route::get('/transaksi-qris/{orderId}/cek-status', [TransaksiQrisController::class, 'cekStatus']);

    // Laporan (khusus admin)
    Route::apiResource('laporan-manual', LaporanManualController::class)->except(['show']);
    Route::get('/laporan/export', [LaporanController::class, 'export']);
});

// Route publik untuk katalog user (tanpa login)
Route::get('/public/bonsais', [BonsaiController::class, 'index']);
Route::get('/public/bonsais/{bonsai}', [BonsaiController::class, 'show']);
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Webhook Midtrans (public, dipanggil server Midtrans — bukan browser)
Route::post('/midtrans/webhook', [TransaksiQrisController::class, 'webhook']);