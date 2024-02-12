<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Clause;
use App\Http\Services\ClauseService;
use Illuminate\Http\Request;

// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;


class ClauseController extends Controller
{
    /**
     * Display a listing of the post lists
     */
    public function index()
    {
        $clauseServices = new ClauseService();

        // latestClauseメソッドを呼び出して結果を取得
        $result = $clauseServices->latestClause();

        return Inertia::render('Clause/Clause', [
            'clauses' => $result,
        ]);
    }

    public function update(Request $request)
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
        return response()->json(['message' => '検索に成功しました。','clauses' => $result]);
    }

    public function latest()
    {
        $clauseServices = new ClauseService();

        // searchClauseメソッドを呼び出して結果を取得
        $result = $clauseServices->latestClause();

         // レスポンスに結果を含めて返す
        return response()->json(['message' => '検索に成功しました。','clauses' => $result]);
    }

    public function all()
    {
        $clauseServices = new ClauseService();

        // searchClauseメソッドを呼び出して結果を取得
        $result = $clauseServices->allClause();

         // レスポンスに結果を含めて返す
        return response()->json(['message' => '検索に成功しました。','clauses' => $result]);
    }
}