import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_POST_LIST } from '../graphql/queries';
import { Post as PostModel } from '../utils/typing';
import Post from './Post';

function Feed() {
    const {data , error} = useQuery(GET_POST_LIST);
    const posts:[PostModel] = data?.getPostList;  
    return (
        <div className='flex flex-col space-y-5'>
            {posts?.map(post=>(
                <Post key={post.id} post={post}/>
            ))}
        </div>
    )
}

export default Feed