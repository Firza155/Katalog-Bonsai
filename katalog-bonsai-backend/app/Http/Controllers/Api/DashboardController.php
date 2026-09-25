<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bonsai;
use App\Models\LaporanManual;
use App\Models\TransaksiQris;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private function pct($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }
        return round((($current - $previous) / $previous) * 100);
    }

    public function stats(Request $request)
{
    $bulanIni = now()->startOfMonth();
    $bulanLalu = now()->subMonthNoOverflow()->startOfMonth();
    $bulanLaluAkhir = $bulanIni->copy()->subSecond();

    $totalBonsai = Bonsai::count();
    $bonsaiBulanIni = Bonsai::where('created_at', '>=', $bulanIni)->count();
    $bonsaiBulanLalu = Bonsai::whereBetween('created_at', [$bulanLalu, $bulanLaluAkhir])->count();

    $penjualanBulanIni = TransaksiQris::where('status', 'settlement')->where('created_at', '>=', $bulanIni)->count()
        + LaporanManual::where('tanggal', '>=', $bulanIni->format('Y-m-d'))->count();
    $penjualanBulanLalu = TransaksiQris::where('status', 'settlement')->whereBetween('created_at', [$bulanLalu, $bulanLaluAkhir])->count()
        + LaporanManual::whereBetween('tanggal', [$bulanLalu->format('Y-m-d'), $bulanLaluAkhir->format('Y-m-d')])->count();
    $totalPenjualan = TransaksiQris::where('status', 'settlement')->count() + LaporanManual::count();

    $omzetBulanIni = TransaksiQris::where('status', 'settlement')->where('created_at', '>=', $bulanIni)->sum('amount')
        + LaporanManual::where('tanggal', '>=', $bulanIni->format('Y-m-d'))->sum('harga');
    $omzetBulanLalu = TransaksiQris::where('status', 'settlement')->whereBetween('created_at', [$bulanLalu, $bulanLaluAkhir])->sum('amount')
        + LaporanManual::whereBetween('tanggal', [$bulanLalu->format('Y-m-d'), $bulanLaluAkhir->format('Y-m-d')])->sum('harga');

    $qrisBulanIni = TransaksiQris::where('status', 'settlement')->where('created_at', '>=', $bulanIni)->count();
    $qrisBulanLalu = TransaksiQris::where('status', 'settlement')->whereBetween('created_at', [$bulanLalu, $bulanLaluAkhir])->count();
    $totalQris = TransaksiQris::where('status', 'settlement')->count();

    $jumlahHari = (int) $request->input('days', 7);
    $jumlahHari = max(1, min($jumlahHari, 90));
    $mulai = now()->subDays($jumlahHari - 1)->startOfDay();

    $qrisHarian = TransaksiQris::where('status', 'settlement')
        ->where('created_at', '>=', $mulai)
        ->selectRaw('DATE(created_at) as tanggal, COUNT(*) as jumlah')
        ->groupBy('tanggal')
        ->pluck('jumlah', 'tanggal');

    $manualHarian = LaporanManual::where('tanggal', '>=', $mulai->format('Y-m-d'))
        ->selectRaw('tanggal, COUNT(*) as jumlah')
        ->groupBy('tanggal')
        ->pluck('jumlah', 'tanggal');

    $grafikPenjualan = [];
    for ($i = $jumlahHari - 1; $i >= 0; $i--) {
        $tanggal = now()->subDays($i)->format('Y-m-d');
        $grafikPenjualan[] = [
            'tanggal' => $tanggal,
            'jumlah' => (int) ($qrisHarian[$tanggal] ?? 0) + (int) ($manualHarian[$tanggal] ?? 0),
        ];
    }

    $qrisTerbaru = TransaksiQris::with('bonsai.images')
        ->where('status', 'settlement')
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($t) {
            return [
                'nama' => $t->item_pembelian ?: "Order {$t->order_id}",
                'waktu' => $t->created_at->toIso8601String(),
                'harga' => (float) $t->amount,
                'metode' => 'QRIS',
                'foto' => $t->bonsai?->images?->first()?->path_foto,
            ];
        });

    $manualTerbaru = LaporanManual::latest('tanggal')
        ->take(5)
        ->get()
        ->map(function ($l) {
            return [
                'nama' => $l->item,
                'waktu' => $l->tanggal . 'T00:00:00',
                'harga' => (float) $l->harga,
                'metode' => 'Manual',
                'foto' => null,
            ];
        });

    $penjualanTerbaru = $qrisTerbaru->concat($manualTerbaru)
        ->sortByDesc('waktu')
        ->take(5)
        ->values();

    return response()->json([
        'total_bonsai' => $totalBonsai,
        'total_bonsai_pct' => $this->pct($bonsaiBulanIni, $bonsaiBulanLalu),
        'total_penjualan' => $totalPenjualan,
        'total_penjualan_pct' => $this->pct($penjualanBulanIni, $penjualanBulanLalu),
        'total_pendapatan' => $omzetBulanIni,
        'total_pendapatan_pct' => $this->pct($omzetBulanIni, $omzetBulanLalu),
        'total_qris' => $totalQris,
        'total_qris_pct' => $this->pct($qrisBulanIni, $qrisBulanLalu),
        'grafik_penjualan' => $grafikPenjualan,
        'penjualan_terbaru' => $penjualanTerbaru,
    ]);
}
}