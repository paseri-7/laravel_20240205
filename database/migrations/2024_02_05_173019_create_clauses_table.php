<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
/**
 * 同意文テーブル create
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clauses', function (Blueprint $table) {
            $table->increments('id')->comment('ID');
            $table->string('ident_lv1_cd', 3)->comment('識別LV1CD');
            $table->string('ident_lv2_cd', 3)->comment('識別LV2CD');
            $table->string('ident_lv3_cd', 3)->comment('識別LV3CD');
            $table->integer('type')->comment('種別');
            $table->string('title', 1000)->comment('同意文タイトル');
            $table->string('text', 1000)->comment('同意文本文');
            $table->string('check_box_title', 1000)->nullable()->comment('チェックボックスタイトル');
            $table->integer('sort')->nullable()->comment('ソート順');
            $table->timestamp('start_date')->comment('開始日');
            $table->timestamp('end_date')->nullable()->comment('終了日');
            $table->string('relation_kind_list', 10)->nullable()->comment('同意関係人種別リスト');
            $table->boolean('del_flg')->nullable()->default(false)->comment('削除フラグ');
            $table->timestamp('created_at')->nullable()->comment('作成日');
            $table->timestamp('updated_at')->nullable()->comment('更新日');
            $table->timestamp('deleted_at')->nullable()->comment('削除日');
            $table->string('create_user_id', 32)->comment('作成者');
            $table->string('update_user_id', 32)->comment('更新者');
            $table->string('delete_user_id', 32)->nullable()->comment('削除者');
            $table->integer('create_user_kind')->nullable()->comment('作成者種別');
            $table->integer('update_user_kind')->nullable()->comment('更新者種別');
            $table->integer('delete_user_kind')->nullable()->comment('削除者種別');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // DB::statement("DROP TABLE clauses CASCADE");
        Schema::dropIfExists('clauses');
    }
};