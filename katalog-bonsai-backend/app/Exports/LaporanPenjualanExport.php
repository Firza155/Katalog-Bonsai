<?php

namespace App\Exports;

use App\Models\LaporanManual;
use App\Models\TransaksiQris;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LaporanPenjualanExport implements FromCollection, WithHeadings, WithMapping
{
    protected $from;
    protected $to;

    public function __construct($from = null, $to = null)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        $qris = TransaksiQris::with('bonsai')
            ->where('status', 'settlement')
            ->when($this->from, fn ($q) => $q->whereDate('created_at', '>=', $this->from))
            ->when($this->to, fn ($q) => $q->whereDate('created_at', '<=', $this->to))
            ->get()
            ->map(function ($t) {
                return [
                    'tanggal' => $t->created_at->format('Y-m-d'),
                    'nama_pembeli' => $t->nama_pembeli ?: '-',
                    'item' => $t->item_pembelian ?: "Order {$t->order_id}",
                    'harga' => $t->amount,
                    'metode' => 'QRIS',
                    'catatan' => $t->order_id,
                ];
            });

        $manual = LaporanManual::when($this->from, fn ($q) => $q->whereDate('tanggal', '>=', $this->from))
            ->when($this->to, fn ($q) => $q->whereDate('tanggal', '<=', $this->to))
            ->get()
            ->map(function ($l) {
                return [
                    'tanggal' => $l->tanggal,
                    'nama_pembeli' => $l->nama_pembeli,
                    'item' => $l->item,
                    'harga' => $l->harga,
                    'metode' => 'Manual/Offline',
                    'catatan' => $l->catatan,
                ];
            });

        return $qris->merge($manual)->sortBy('tanggal')->values();
    }

    public function map($row): array
    {
        return [
            $row['tanggal'],
            $row['nama_pembeli'],
            $row['item'],
            $row['harga'],
            $row['metode'],
            $row['catatan'],
        ];
    }

    public function headings(): array
    {
        return ['Tanggal', 'Nama Pembeli', 'Item', 'Harga', 'Metode Bayar', 'Catatan'];
    }
}