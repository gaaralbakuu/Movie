<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class HoatHinh3DService extends IMovieService
{
    public function getMain()
    {
        $data = Http::get(base64_decode('aHR0cHM6Ly9ob2F0aGluaDNkLmJpeg=='));
    }
}
