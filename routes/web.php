<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $data = Http::get(base64_decode('aHR0cHM6Ly9ob2F0aGluaDNkLmJpeg=='));
    $content = explode('<div class="halim_box">', $data)[1];
    $content = explode('</div><div class="clearfix"></div>', $content)[0];
    preg_match_all('/(?:<article\sclass="col-md-3\scol-sm-3\scol-xs-6\sthumb\sgrid-item\spost-(?:\d+)"><div\sclass="halim-item">\s<a\sclass="halim-thumb"\shref="(.+?)"\stitle="(?:.+?)"><figure><img\sclass="img-responsive"\ssrc="(.+?)"\salt="(?:.+?)"\stitle="(?:.+?)"><\/figure>(?:\s<span class="status">(?:.+?)<\/span>)?)<span class="episode">(.+?)<\/span><div\sclass="icon_overlay"><\/div><div\sclass="halim-post-title-box"><div\sclass="halim-post-title\s"><h2\sclass="entry-title">(.+?)<\/h2><p\sclass="original_title">(.+?)<\/p><\/div><\/div>\s<\/a><\/div><\/article>/is', $content, $articles);

    var_dump($articles);
    return "";
    return htmlentities($content);
    return view('welcome');
});
