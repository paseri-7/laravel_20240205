<?php
namespace Database\Seeders;
// use App\Enums\ClauseTypeEnum;
// use App\Enums\UserKindEnum;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
/**
 * 同意文 Seeder
 */
class ClausesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * check_box_title, sort は未使用カラム
     *
     * @return void
     */
    public function run()
    {
        DB::table('clauses')->insert(
            [
                [
                    'id'               => 1,
                    'ident_lv1_cd'       => '000',
                    'ident_lv2_cd'       => '000',
                    'ident_lv3_cd'       => '000',
                    'type'               => 1,
                    'title'              => 'マイページ利用規約',
                    'text'               => '<h1><b>マイページ利用規約 本文テキスト</b></h1><br><h2>マイページ利用規約 本文テキスト</h2>',
                    'check_box_title'    => NULL,
                    'sort'               => null,
                    'start_date'         => CarbonImmutable::create(2023, 4, 1),
                    'end_date'           => null,
                    'relation_kind_list' => '0,1,2,3',
                    'del_flg'            => false,
                    'created_at'         => CarbonImmutable::now(),
                    'updated_at'         => CarbonImmutable::now(),
                    'deleted_at'         => null,
                    'create_user_id'     => 1,
                    'update_user_id'     => 1,
                    'delete_user_id'     => null,
                    'create_user_kind'   => 1,
                    'update_user_kind'   => 1,
                    'delete_user_kind'   => null
                ],
                [
                    'id'               => 2,
                    'ident_lv1_cd'       => '000',
                    'ident_lv2_cd'       => '000',
                    'ident_lv3_cd'       => '000',
                    'type'               => 2,
                    'title'              => '個人情報同意文言',
                    'text'               => '<h1>個人情報同意文言 本文テキスト</h1>',
                    'check_box_title'    => NULL,
                    'sort'               => null,
                    'start_date'         => CarbonImmutable::create(2023, 4, 1),
                    'end_date'           => null,
                    'relation_kind_list' => '0,1,2',
                    'del_flg'            => false,
                    'created_at'         => CarbonImmutable::now(),
                    'updated_at'         => CarbonImmutable::now(),
                    'deleted_at'         => null,
                    'create_user_id'     => 1,
                    'update_user_id'     => 1,
                    'delete_user_id'     => null,
                    'create_user_kind'   => 1,
                    'update_user_kind'   => 1,
                    'delete_user_kind'   => null
                ],
            ]
        );
    }
}