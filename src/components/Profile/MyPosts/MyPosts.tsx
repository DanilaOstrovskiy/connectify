import React from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";


export function MyPosts(){
    return(
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div>
                New post
            </div>
            <div className={s.posts}>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}