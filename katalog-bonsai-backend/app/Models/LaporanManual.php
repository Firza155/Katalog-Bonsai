<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanManual extends Model
{
    protected $fillable = ['nama_pembeli', 'item', 'harga', 'tanggal', 'catatan'];
}
