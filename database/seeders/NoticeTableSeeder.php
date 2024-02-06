<?php
namespace Database\Seeders;
// use App\Enums\NoticeShowFlagEnum;
// use App\Enums\UserKindEnum;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
/**
 * お知らせ Seeder
 */
class NoticeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notice')->insert([
            'id'               => 1,
            'ident_lv1_cd'     => '000',
            'ident_lv2_cd'     => '000',
            'ident_lv3_cd'     => '000',
            'anno_cd'          => 0,
            'name'             => 'サンプル',
            'text'             => "システムメンテナンスのため、以下の期間はサービスをご利用いただくことができません。\n【期間】2021年11月14日 AM1時～AM2時（予定）\nお客様には大変ご不便をおかけしますが、何卒ご了承くださいますようお願い申し上げます。",
            'path'             => null,
            'start_date'       => CarbonImmutable::create(2023, 4, 1),
            'end_date'         => CarbonImmutable::create(2024, 3, 31),
            'show_flg'         => 2,
            'created_at'       => CarbonImmutable::now(),
            'updated_at'       => CarbonImmutable::now(),
            'deleted_at'       => null,
            'create_user_id'   => 1,
            'update_user_id'   => 1,
            'delete_user_id'   => null,
            'create_user_kind' => 1,
            'update_user_kind' => 1,
            'delete_user_kind' => null,
        ]);
    }
}

