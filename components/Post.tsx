import React from 'react'
import { Post } from '../utils/typing'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    BookmarkIcon,
    ChatAltIcon,
    DotsHorizontalIcon,
    GiftIcon,
    ShareIcon
} from '@heroicons/react/outline';
import TimeAgo from "react-timeago";
import Avatar from './Avatar';

interface Props {
    post: Post
}

function Post({ post }: Props) {
    return (
        <div className='flex rounded-md cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-600'>
            {/* Votes */}
            <div className='flex flex-col p-4 items-center justify-start space-y-1 bg-gray-100 text-gray-600 rounded-l-md'>
                <ArrowUpIcon className='voteButton hover:text-red-400 hover:cursor-pointer' />
                <p className='text-black'>{post.comments.length}</p>
                <ArrowDownIcon className='voteButton hover:text-red-400 hover:cursor-pointer' />
            </div>
            <div className='px-3 py-1 space-y-3'>
                {/* Header */}
                <div className='flex items-center space-x-2'>
                    <Avatar seed={post.subreddit.topic} />
                    <p className='font-bold text-md hover:text-blue-500 hover:underline hover:cursor-pointer'>r/{post.subreddit.topic}</p>
                    <p className='text-md text-gray-500'>Posted By u/{post.username} <TimeAgo date={post.created_at}/></p>
                </div>
                {/* Body */}
                <div>
                    <h2 className='font-bold text-xl'>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
                {/*    Image */}
                <img src={post.image} alt=""/>
                {/* Footer */}
                <div className='flex items-center justify-between text-gray-400 text-sm font-semibold'>
                    <div className='flex items-center space-x-1 p-1 rounded-sm hover:cursor-pointer hover:bg-gray-200'>
                        <ChatAltIcon className='h-7 w-7 stroke-1'/>
                        <p>{post.comments.length} Comments</p>
                    </div>
                    <div className='flex items-center space-x-1 p-1 rounded-sm hover:cursor-pointer hover:bg-gray-200'>
                        <GiftIcon className='h-7 w-7 stroke-1'/>
                        <p>Awards</p>
                    </div>
                    <div className='flex items-center space-x-1 p-1 rounded-sm hover:cursor-pointer hover:bg-gray-200'>
                        <ShareIcon className='h-7 w-7 stroke-1'/>
                        <p>Share</p>
                    </div>
                    <div className='flex items-center space-x-1 p-1 rounded-sm hover:cursor-pointer hover:bg-gray-200'>
                        <BookmarkIcon className='h-7 w-7 stroke-1'/>
                        <p>Save</p>
                    </div>
                    <div className='flex items-center space-x-1 p-1 rounded-sm hover:cursor-pointer hover:bg-gray-200'>
                        <DotsHorizontalIcon className='h-7 w-7 stroke-1'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post