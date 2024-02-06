<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Clause;
use App\Http\Services\ClauseService;
use Illuminate\Http\Request;

class ClauseController extends Controller
{
    /**
     * Display a listing of the post lists
     */
    public function index(Request $request)
    {
        $clauseServices = new ClauseService();

        // タイトルを取得
        $title = $request->input('title');
        // テキストを取得
        $text = $request->input('text');
        // 日付を取得
        $date = $request->input('date');
        // 更新対象のPostのIDを取得（例: URLパラメータから取得）
        $id = $request->input('id');

        $clauseServices->updateClause($title,$text,$date,$id);
        
        return response()->json(['message' => '更新に成功しました。']);
    }

    public function search(Request $request)
    {
        $clauseServices = new ClauseService();

        // クライアントから送信されたデータを取得
        $type = $request->input('type');
        $date = $request->input('date');

        // searchClauseメソッドを呼び出して結果を取得
        $result = $clauseServices->searchClause($type, $date);
        
        // レスポンスに結果を含めて返す
        return ['data' => $result];
    }
}