<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class HoatHinh3DService implements IMovieService
{
    public function getList()
    {
        return Article::query()->orderByDesc("updated_at")->orderByDesc("id")->get();
    }

    public function updateItem(bool $force = false)
    {
        $data = Http::get(base64_decode('aHR0cHM6Ly9ob2F0aGluaDNkLmJpeg=='));
        $content = explode('<div class="halim_box">', $data)[1];
        $content = explode('</div><div class="clearfix"></div>', $content)[0];
        preg_match_all('/(?:<article\sclass="col-md-3\scol-sm-3\scol-xs-6\sthumb\sgrid-item\spost-(?:\d+)"><div\sclass="halim-item">\s<a\sclass="halim-thumb"\shref="(.+?)"\stitle="(?:.+?)"><figure><img\sclass="img-responsive"\ssrc="(.+?)"\salt="(?:.+?)"\stitle="(?:.+?)"><\/figure>(?:\s<span class="status">(?:.+?)<\/span>)?)<span class="episode">(.+?)<\/span><div\sclass="icon_overlay"><\/div><div\sclass="halim-post-title-box"><div\sclass="halim-post-title\s"><h2\sclass="entry-title">(.+?)<\/h2><p\sclass="original_title">(.+?)<\/p><\/div><\/div>\s<\/a><\/div><\/article>/is', $content, $articles);

        for ($i = count($articles[2]) - 1; $i >= 0; $i--) {
            $article = Article::query()->where('path', $articles[1][$i])->first();
            $img = $articles[2][$i];
            $name = $articles[4][$i];
            $name_original = $articles[5][$i];

            if (!$article) {
                $img_name = date('dmYHis') . '_' . basename($img);
            } else {
                $img_name = $article->image;
            }

            $img_path = public_path('images/articles/' . $img_name);

            if ($article) {
                File::delete($img_path);
            }

            File::put($img_path, Http::get($img));

            if ($article) {
                $article->update([
                    'image' => $img_name,
                    'name' => $name
                ]);
            } else {
                Article::create([
                    'path' => $articles[1][$i],
                    'image' => $img_name,
                    'name' => $name,
                    'name_original' => $name_original,
                ]);
            }
        }

        return ["status" => true];
    }

    public function updateChapter(int $id)
    {
        $article = Article::query()->where('id', $id)->first();

        if ($article) {
            $data = Http::get($article->path);
            $content = explode('<ul id="listsv-1" class="halim-list-eps">', $data);
            $content = explode('</ul><div class="clearfix"></div>', $content[1])[0];
            preg_match_all('/<li\sclass="halim-episode\s(?:.+?)"><a\shref="(.+?)"\stitle="(?:\d+)"><span\sclass="(?:.+?)\sbox-shadow\shalim-btn"\sdata-post-id="(?:\d+)"\sdata-server="(?:\d+)"\sdata-episode-slug="(?:.+?)"\sdata-position(?:="\w+")?\sdata-embed="(?:.+?)">(.+?)<\/span><\/a><\/li>/is', $content, $chapters);

            var_dump($chapters);
        }
        // https://hoathinh3d.biz/dau-la-dai-luc-2-tuyet-the-duong-mon
    }
}
