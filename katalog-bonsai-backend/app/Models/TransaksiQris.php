<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaksiQris extends Model
{
    protected $fillable = ['order_id', 'bonsai_id', 'nama_pembeli', 'item_pembelian', 'amount', 'status', 'raw_response'];

    public function bonsai()
    {
        return $this->belongsTo(Bonsai::class);
    }
}
