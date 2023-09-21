<?php

namespace App\Services;

interface IMovieService{
    public function updateItem(bool $force = false);
}