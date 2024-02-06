<?php

namespace App\Http\Services;
use Carbon\CarbonImmutable;
use App\Models\Clause;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ClauseService
{
    // public function createPost($text,$image, $user_id)
    public function updateClause($title,$text,$date,$id)
    {
        // 既存のnoticeレコードを取得
        $clasue = Clause::find($id);

        // レコードが存在するか確認
        // if (!$post) {
        //     // レコードが存在しない場合の処理（例: エラー処理）
        //     // ここで適切なエラー処理を行ってください
        //     return null;
        // }
        $clasue->title = $title;
        $clasue->text = $text;
        // $clause->start_date = \Carbon\Carbon::parse($date); // 日時のフォーマットを変更
        $clasue->start_date = $date;
        $clasue->updated_at = now();
        $clasue->update_user_id = 1;
        $clasue->update_user_kind = 1;

        // 'id',
        // 'ident_lv1_cd',
        // 'ident_lv2_cd',
        // 'ident_lv3_cd',
        // 'type',
        // 'title',
        // 'text',
        // 'check_box_title',
        // 'sort',
        // 'start_date',
        // 'end_date',
        // 'relation_kind_list',
        // 'del_flg',
        // 'created_at',
        // 'updated_at',
        // 'deleted_at',
        // 'create_user_id',
        // 'update_user_id',
        // 'delete_user_id',
        // 'create_user_kind',
        // 'update_user_kind',
        // 'delete_user_kind',

        $clasue->save();

        return $clasue;
    }

    public function searchClause($type, $date)
    {
        $query = DB::table('clauses')
        ->when($type && $date, function ($query) use ($type, $date) {
            Log::info('両方');
            Log::info($type);
            Log::info($date);
            // $typeと$dateの両方が渡された場合
            return $query->where('type', $type)
            ->where('start_date', '<=', $date)
            ->orderBy('start_date', 'asc') // 日付の昇順に並べ替え
            ->limit(1); // 最初の1件を取得
        })
        ->when(!$type && $date, function ($query) use ($date) {
            Log::info('dateのみ');
            Log::info($date);
            // $typeがなく$dateのみが渡された場合
            // すべてのタイプからそれぞれstart_Dateが近いものを取得
            return $query->where('start_date', '<=', $date)
            ->orderBy('type', 'asc') // タイプの昇順に並べ替え
            ->orderBy('start_date', 'asc') // 日付の昇順に並べ替え
            ->limit(6); // 最初の6件を取得
        })
        ->when($type && !$date, function ($query) use ($type) {
                Log::info('typeのみ');
                Log::info($type);
                // $typeのみが渡された場合
                return $query->where('type', $type);
            });

        $result = $query->get();

        Log::info('検索結果:', $result->toArray()); // これを追加して結果をログに出力

        return $result;
    }
}
