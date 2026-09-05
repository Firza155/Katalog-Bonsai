<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LaporanManual;
use Illuminate\Http\Request;

class LaporanManualController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(LaporanManual::latest()->paginate(20));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pembeli' => 'required|string|max:255',
            'item' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'tanggal' => 'required|date',
            'catatan' => 'nullable|string',
        ]);

        $laporan = LaporanManual::create($validated);

        return response()->json($laporan, 201);
    }

    public function update(Request $request, LaporanManual $laporanManual)
    {
        $validated = $request->validate([
            'nama_pembeli' => 'sometimes|required|string|max:255',
            'item' => 'sometimes|required|string|max:255',
            'harga' => 'sometimes|required|numeric|min:0',
            'tanggal' => 'sometimes|required|date',
            'catatan' => 'nullable|string',
        ]);

        $laporanManual->update($validated);

        return response()->json($laporanManual);
    }

    public function destroy(LaporanManual $laporanManual)
    {
        $laporanManual->delete();

        return response()->json(['message' => 'Laporan berhasil dihapus']);
    }
}