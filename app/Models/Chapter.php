<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;
    protected $table = 'chapter';
    protected $primaryKey = 'id';
    protected $fillable = ['path', 'name', 'article_id'];
}
