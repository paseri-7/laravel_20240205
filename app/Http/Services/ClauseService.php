<?php

namespace App\Http\Services;
use Carbon\CarbonImmutable;
use App\Models\Clause;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ClauseService
{
    public function updateClause($title,$text,$date,$id)
    {
        // 既存のnoticeレコードを取得
        $clasue = Clause::find($id);

        $clasue->title = $title;
        $clasue->text = $text;
        $clasue->start_date = $date;
        $clasue->updated_at = now();
        $clasue->update_user_id = 1;
        $clasue->update_user_kind = 1;

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
        })
        ->when(!$type && !$date, function ($query){
            Log::info('type,dateなし');
            // $何も渡されなかった場合
            return $query;
        });

        $result = $query->get();

        Log::info('検索結果:', $result->toArray()); // これを追加して結果をログに出力

        return $result;
    }

    public function latestClause()
    {
        $query = DB::table('clauses')
            ->where('start_date', '<=', now())
            ->orderBy('type', 'asc') // タイプの昇順に並べ替え
            ->orderBy('start_date', 'asc') // 日付の昇順に並べ替え
            ->limit(6); // 最初の6件を取得
        
        $result = $query->get();

        return $result;
    }

    public function allClause()
    {
        $result = Clause::all();
        return $result;
    }
}
