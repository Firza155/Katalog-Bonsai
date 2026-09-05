<?php

namespace Database\Seeders;

use App\Models\Bonsai;
use Illuminate\Database\Seeder;

class BonsaiSeeder extends Seeder
{
    public function run(): void
    {
        $bonsais = [
            [
                'nama' => 'Bonsai Beringin Prospek',
                'deskripsi' => 'Bonsai beringin dengan batang unik, siap dibentuk lebih lanjut.',
                'harga' => 750000,
                'kategori' => 'prospek',
                'status' => 'tersedia',
            ],
            [
                'nama' => 'Bahan Bonsai Serut',
                'deskripsi' => 'Bahan bonsai serut, cocok untuk pemula belajar membentuk.',
                'harga' => 250000,
                'kategori' => 'bahan',
                'status' => 'tersedia',
            ],
            [
                'nama' => 'Bonsai Cemara Udang Jadi',
                'deskripsi' => 'Bonsai cemara udang sudah jadi, siap pajang.',
                'harga' => 3500000,
                'kategori' => 'bonsai_jadi',
                'status' => 'tersedia',
            ],
        ];

        foreach ($bonsais as $bonsai) {
            Bonsai::create($bonsai);
        }
    }
}