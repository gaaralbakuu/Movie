<?php

namespace App\Http\Controllers;

use App\Services\IMovieService;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    function __construct(protected IMovieService $movieService)
    {
    }

    public function index()
    {
        return $this->movieService->getList();
    }

    public function update()
    {
        return $this->movieService->updateItem(true);
    }

    public function updateChapter(Request $request)
    {
        $id = $request->id;

        return $this->movieService->updateChapter($id);
    }
}
