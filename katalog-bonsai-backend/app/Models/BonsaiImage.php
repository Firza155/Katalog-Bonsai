<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BonsaiImage extends Model
{
    protected $fillable = ['bonsai_id', 'path_foto'];

    public function bonsai()
    {
        return $this->belongsTo(Bonsai::class);
    }
}
