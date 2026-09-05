<?php

namespace App\Http\Controllers\Api;

use App\Exports\LaporanPenjualanExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class LaporanController extends Controller
{
    public function export(Request $request)
    {
        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date',
            'format' => 'nullable|in:xlsx,csv',
        ]);

        $format = $request->format ?? 'xlsx';
        $filename = 'laporan-penjualan-' . now()->format('Y-m-d') . '.' . $format;

        return Excel::download(
            new LaporanPenjualanExport($request->from, $request->to),
            $filename
        );
    }
}