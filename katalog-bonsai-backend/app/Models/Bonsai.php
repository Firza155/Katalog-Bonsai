<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bonsai extends Model
{
    protected $fillable = ['nama', 'deskripsi', 'harga', 'kategori', 'status'];

    public function images()
    {
        return $this->hasMany(BonsaiImage::class);
    }

    public function transaksiQris()
    {
        return $this->hasMany(TransaksiQris::class);
    }
}
