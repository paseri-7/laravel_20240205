<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Notice;
use App\Http\Services\NoticeService;
use Illuminate\Http\Request;

class NoticeController extends Controller
{
    /**
     * Display a listing of the post lists
     */
    public function index(Request $request)
    {
        $noticeServices = new NoticeService();

        // テキストを取得
        $text = $request->input('text');
        // 日付を取得
        $date = $request->input('date');
        // 状態フラグを取得
        $show_flg = $request->input('show_flg');
        // 更新対象のPostのIDを取得（例: URLパラメータから取得）
        $id = $request->input('id');

        $noticeServices->updateNotice($text,$date,$show_flg,$id);
        
        return response()->json(['message' => '更新に成功しました。']);
    }
}