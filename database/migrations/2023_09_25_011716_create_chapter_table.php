<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chapter', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("article_id")->unsigned();
            $table->string("name");
            $table->string("path");
            $table->timestamps();
            $table->foreign('article_id')->references('id')->on('article');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapter');
    }
};
