<?php

namespace App\Console\Commands;

use App\Models\TransaksiQris;
use Illuminate\Console\Command;

class ExpirePendingQris extends Command
{
    protected $signature = 'qris:expire-pending';
    protected $description = 'Tandai transaksi QRIS pending yang sudah lebih dari 10 menit sebagai expire';

    public function handle()
    {
        $count = TransaksiQris::where('status', 'pending')
            ->where('created_at', '<', now()->subMinutes(10))
            ->update(['status' => 'expire']);

        $this->info("{$count} transaksi ditandai expire.");
    }
}