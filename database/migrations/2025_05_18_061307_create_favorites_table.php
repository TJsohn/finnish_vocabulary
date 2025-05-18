<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoritesTable extends Migration
{

    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->string('word_id');
            $table->string('finnish');
            $table->string('english');
            $table->text('example')->nullable();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('favorites');
    }
};
