<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ClauseController;
use App\Models\Notice;
use App\Models\Clause;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 初期の記載
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// メンテナンスメニュー
Route::get('/', function () {
    return Inertia::render('Maintenance/Maintenance');
})->name('maintenance');;

// お知らせ管理
// Route::get('/notice', function () {
//     $notice = Notice::all(); // または適切な方法でデータを取得
//     return Inertia::render('Notice/Notice', [
//         'notice' => $notice,
//     ]);
// })->name('notice');

// お知らせ管理
Route::get('/notice', function () {
    $notice = Notice::find(1); // IDが1のお知らせを取得
    return Inertia::render('Notice/Notice', [
        'notice' => $notice,
    ]);
})->name('notice');

// お知らせ編集
Route::get('/notice_edit', function () {
    $notice = Notice::find(1); // IDが1のお知らせを取得
    return Inertia::render('NoticeEdit/NoticeEdit', [
        'notice' => $notice,
    ]);
})->name('notice_edit');

// お知らせ 更新時の処理
Route::post('/notice_edit', [NoticeController::class, 'index'])
->name('notice_edit');


// 同意文言管理
Route::get('/clause', [ClauseController::class, 'index']
)->name('clause');

// 同意 検索時の処理
Route::post('/search', [ClauseController::class, 'search'])
->name('search');

// 同意 最新世代表示時の処理
Route::post('/latest', [ClauseController::class, 'latest'])
->name('latest');

// 同意 全世代表示時の処理
Route::post('/all', [ClauseController::class, 'all'])
->name('all');

// 同意文言詳細
Route::get('/clause_detail/{id}', function ($id) {
    $clause = Clause::find($id); // 遷移元から受け取ったIDを元に同意情報を取得 

    return Inertia::render('ClauseDetail/ClauseDetail', [
        'clause' => $clause,
    ]);
})->where('id', '[0-9]+')->name('clause_detail');

// 同意文言編集
Route::get('/clause_edit/{id}', function ($id) {
    $clause = Clause::find($id); // 遷移元から受け取ったIDを元に同意情報を取得 

    return Inertia::render('ClauseEdit/ClauseEdit', [
        'clause' => $clause,
    ]);
})->where('id', '[0-9]+')->name('clause_edit');

// 同意 更新時の処理
Route::post('/clause_edit_2', [ClauseController::class, 'update'])
->name('clause_edit_2');


// bk側の記載(うまくいかなかった方)

// maintenance-menu
// Route::get('/', function () {
//     return view('welcome');
//  });

// notice
// Route::get('notice', function () {
//     return view('notice');
// });




// 以下は初期から記載ありのもの
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
