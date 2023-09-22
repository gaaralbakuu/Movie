<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class HoatHinh3DService implements IMovieService
{
    public function getList(){
        return Article::query()->orderBy("updated_at")->get();
    }

    public function updateItem(bool $force = false)
    {
        $data = Http::get(base64_decode('aHR0cHM6Ly9ob2F0aGluaDNkLmJpeg=='));
        $content = explode('<div class="halim_box">', $data)[1];
        $content = explode('</div><div class="clearfix"></div>', $content)[0];
        preg_match_all('/(?:<article\sclass="col-md-3\scol-sm-3\scol-xs-6\sthumb\sgrid-item\spost-(?:\d+)"><div\sclass="halim-item">\s<a\sclass="halim-thumb"\shref="(.+?)"\stitle="(?:.+?)"><figure><img\sclass="img-responsive"\ssrc="(.+?)"\salt="(?:.+?)"\stitle="(?:.+?)"><\/figure>(?:\s<span class="status">(?:.+?)<\/span>)?)<span class="episode">(.+?)<\/span><div\sclass="icon_overlay"><\/div><div\sclass="halim-post-title-box"><div\sclass="halim-post-title\s"><h2\sclass="entry-title">(.+?)<\/h2><p\sclass="original_title">(.+?)<\/p><\/div><\/div>\s<\/a><\/div><\/article>/is', $content, $articles);

        foreach ($articles[1] as $key => $path) {
            $article = Article::query()->where('path', $path)->first();
            if (!$article || $force) {
                if ($force && $article) {
                    $img_name = $article->image;
                    $img_path = public_path('images/articles/' . $img_name);
                    File::delete($img_path);
                    $article->delete();
                }
                $img = $articles[2][$key];
                $name = $articles[4][$key];
                $name_original = $articles[5][$key];
                $img_name = date('dmYHis') . '_' . basename($img);
                $img_path = public_path('images/articles/' . $img_name);
                File::put($img_path, Http::get($img));

                Article::create([
                    'path' => $path,
                    'image' => $img_name,
                    'name' => $name,
                    'name_original' => $name_original,
                ]);
            }
        }

        var_dump($articles);
    }
}
