<?php

namespace App\Http\Services;

use App\Models\Notice;

class NoticeService
{
    // public function createPost($text,$image, $user_id)
    public function updateNotice($text,$date,$show_flg,$id)
    {
        // 既存のnoticeレコードを取得
        $notice = Notice::find($id);

        // レコードが存在するか確認
        // if (!$post) {
        //     // レコードが存在しない場合の処理（例: エラー処理）
        //     // ここで適切なエラー処理を行ってください
        //     return null;
        // }
        $notice->text = $text;
        $notice->end_date = $date;
        $notice->show_flg = $show_flg;
        $notice->updated_at = now();
        $notice->update_user_id = 1;
        $notice->update_user_kind = 1;

        $notice->save();

        return $notice;
    }
}
