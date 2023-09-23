<?php

namespace App\Services;

interface IMovieService{
    public function getList();
    public function updateItem(bool $force = false);
    public function updateChapter(int $id);
}