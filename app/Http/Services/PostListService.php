<?php

namespace App\Http\Services;

use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostListService
{
    /**
     * Display a listing of the post lists
     */
    public function index()
    {
        // $posts = Post::all();
        $posts = DB::select('
                select T1.id, T1.user_id, T1.text, T1.post_image, T1.parent_tweet_id, 
                T1.created_at, T1.updated_at,  T2.name, T2.profile_image
                from posts T1 
                left outer join users T2 on T1.user_id = T2.id
            ');
        return $posts;
    }
}