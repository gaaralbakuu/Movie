<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $table = 'article';
    protected $primaryKey = 'id';
    protected $fillable = ['path', 'image', 'name', 'name_original'];
}
