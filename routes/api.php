<?php

use App\Http\Controllers\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix("home")->group(function () {
    Route::get('/getList', [MovieController::class, 'index']);

    Route::get('/refresh', [MovieController::class, 'update']);

    Route::get('/update-chapter', [MovieController::class, 'updateChapter']);
});
