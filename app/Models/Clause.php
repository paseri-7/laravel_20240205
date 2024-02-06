<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clause extends Model
{
    protected $table = 'clauses';

    protected $fillable = [
  
        'id',
        'ident_lv1_cd',
        'ident_lv2_cd',
        'ident_lv3_cd',
        'type',
        'title',
        'text',
        'check_box_title',
        'sort',
        'start_date',
        'end_date',
        'relation_kind_list',
        'del_flg',
        'created_at',
        'updated_at',
        'deleted_at',
        'create_user_id',
        'update_user_id',
        'delete_user_id',
        'create_user_kind',
        'update_user_kind',
        'delete_user_kind',
    ];

    // 他の関数やリレーションシップの定義があればここに追加します
}
