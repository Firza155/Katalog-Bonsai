<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bonsai;
use App\Models\TransaksiQris;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Midtrans\Config;
use Midtrans\CoreApi;
use Midtrans\Notification;
use Midtrans\Transaction;

class TransaksiQrisController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'bonsai_id' => 'nullable|exists:bonsais,id',
        'nama_pembeli' => 'nullable|string|max:255',
        'item_pembelian' => 'nullable|string|max:255',
        'amount' => 'required|numeric|min:1',
    ]);

    $orderId = 'BONSAI-' . strtoupper(Str::random(8)) . '-' . time();

    $params = [
        'payment_type' => 'qris',
        'transaction_details' => [
            'order_id' => $orderId,
            'gross_amount' => (int) $validated['amount'],
        ],
    ];

    $response = CoreApi::charge($params);

    $qrisUrl = null;
    foreach ($response->actions as $action) {
        if ($action->name === 'generate-qr-code') {
            $qrisUrl = $action->url;
        }
    }

    $transaksi = TransaksiQris::create([
        'order_id' => $orderId,
        'bonsai_id' => $validated['bonsai_id'] ?? null,
        'nama_pembeli' => $validated['nama_pembeli'] ?? null,
        'item_pembelian' => $validated['item_pembelian'] ?? null,
        'amount' => $validated['amount'],
        'status' => 'pending',
        'raw_response' => json_encode($response),
    ]);

    return response()->json([
        'transaksi' => $transaksi,
        'qris_url' => $qrisUrl,
        'qr_string' => $response->qr_string ?? null,
    ], 201);
}

    public function index(Request $request)
    {
        $query = TransaksiQris::with('bonsai')->latest();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(20));
    }

    public function webhook(Request $request)
    {
        $notif = new Notification();

        $transaksi = TransaksiQris::where('order_id', $notif->order_id)->first();

        if (! $transaksi) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        $status = match ($notif->transaction_status) {
            'settlement', 'capture' => 'settlement',
            'expire' => 'expire',
            'cancel', 'deny' => 'cancel',
            default => 'pending',
        };

        $transaksi->update([
            'status' => $status,
            'raw_response' => json_encode($notif->getResponse()),
        ]);

        if ($status === 'settlement' && $transaksi->bonsai_id) {
            $transaksi->bonsai->update(['status' => 'terjual']);
        }

        return response()->json(['message' => 'OK']);
    }

    public function cekStatus($orderId)
{
    $transaksi = TransaksiQris::where('order_id', $orderId)->firstOrFail();

    $status = (array) Transaction::status($orderId);

    $newStatus = match ($status['transaction_status']) {
        'settlement', 'capture' => 'settlement',
        'expire' => 'expire',
        'cancel', 'deny' => 'cancel',
        default => 'pending',
    };

    $transaksi->update([
        'status' => $newStatus,
        'raw_response' => json_encode($status),
    ]);

    if ($newStatus === 'settlement' && $transaksi->bonsai_id) {
        $transaksi->bonsai->update(['status' => 'terjual']);
    }

    return response()->json($transaksi->fresh());
}
}