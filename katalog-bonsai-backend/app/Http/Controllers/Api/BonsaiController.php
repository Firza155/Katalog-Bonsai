<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bonsai;
use App\Models\BonsaiImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BonsaiController extends Controller
{
    // GET /api/bonsais
    public function index(Request $request)
    {
        $query = Bonsai::with('images');

        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->paginate(12));
    }

    // GET /api/bonsais/{id}
    public function show(Bonsai $bonsai)
    {
        return response()->json($bonsai->load('images'));
    }

    // POST /api/bonsais
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|in:bahan,prospek,bonsai_jadi',
            'status' => 'nullable|in:tersedia,pending,terjual',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $bonsai = Bonsai::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('bonsai', 'public');
                $bonsai->images()->create(['path_foto' => $path]);
            }
        }

        return response()->json($bonsai->load('images'), 201);
    }

    // POST /api/bonsais/{id} (pakai method spoofing _method=PUT untuk upload file)
    public function update(Request $request, Bonsai $bonsai)
    {
        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'deskripsi' => 'nullable|string',
            'harga' => 'sometimes|required|numeric|min:0',
            'kategori' => 'sometimes|required|in:bahan,prospek,bonsai_jadi',
            'status' => 'nullable|in:tersedia,pending,terjual',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $bonsai->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('bonsai', 'public');
                $bonsai->images()->create(['path_foto' => $path]);
            }
        }

        return response()->json($bonsai->load('images'));
    }

    // DELETE /api/bonsais/{id}
    public function destroy(Bonsai $bonsai)
    {
        foreach ($bonsai->images as $image) {
            Storage::disk('public')->delete($image->path_foto);
        }
        $bonsai->delete();

        return response()->json(['message' => 'Bonsai berhasil dihapus']);
    }

    // DELETE /api/bonsais/{bonsaiId}/images/{imageId} — hapus 1 foto spesifik
    public function destroyImage(Bonsai $bonsai, BonsaiImage $image)
    {
        Storage::disk('public')->delete($image->path_foto);
        $image->delete();

        return response()->json(['message' => 'Foto berhasil dihapus']);
    }
}