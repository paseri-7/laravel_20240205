<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        
        <!-- jsxファイルの呼び出し -->
        @routes
        @viteReactRefresh
        @vite('resources/js/Pages/Notice/Notice.jsx')
        @inertiaHead
    </head>
    <body >
        <!-- 以下にレンダリングされた要素が格納される -->
        <div id = "notice"></div>

        <!-- Inertia ページの表示 -->
        @inertia
         <!-- Inertia ページのロケーション情報 -->
        @inertiaLocation
    </body>
</html>
