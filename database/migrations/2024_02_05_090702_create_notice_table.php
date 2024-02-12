<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
/**
 * お知らせ（マイページ） create
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('notice', function (Blueprint $table) {
            $table->increments('id')->comment('ID');
            $table->string('ident_lv1_cd', 3)->comment('識別LV1CD');
            $table->string('ident_lv2_cd', 3)->comment('識別LV2CD');
            $table->string('ident_lv3_cd', 3)->comment('識別LV3CD');
            $table->integer('anno_cd')->comment('お知らせID');
            $table->string('name', 200)->comment('名称');
            $table->string('text', 1000)->comment('お知らせ');
            $table->string('path', 200)->nullable()->comment('パス');
            $table->timestamp('start_date')->nullable()->comment('開始日');
            $table->timestamp('end_date')->nullable()->comment('終了日');
            $table->string('show_flg', 100)->nullable()->comment('表示フラグ');
            $table->timestamp('created_at')->nullable()->comment('作成日');
            $table->timestamp('updated_at')->nullable()->comment('更新日');
            $table->timestamp('deleted_at')->nullable()->comment('削除日');
            $table->string('create_user_id', 32)->comment('作成者');
            $table->string('update_user_id', 32)->comment('更新者');
            $table->string('delete_user_id', 32)->nullable()->comment('削除者');
            $table->integer('create_user_kind')->comment('作成者種別');
            $table->integer('update_user_kind')->comment('更新者種別');
            $table->integer('delete_user_kind')->nullable()->comment('削除者種別');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('notice');
    }
};
