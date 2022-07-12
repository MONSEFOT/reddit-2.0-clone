import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar';
import { PhotographIcon, LinkIcon } from '@heroicons/react/outline';
import { useForm } from "react-hook-form";
import { ApolloQueryResult, useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import { client } from '../utils/apollo-client';
import { GET_SUBRDDIT_BY_TOPIC , GET_POST_LIST } from '../graphql/queries';
import toast from 'react-hot-toast';

interface FormData {
    postTitle: string,
    postBody: string,
    postImage: string
    subreddit: string,
}
export default function PostBox() {
    const { data: session } = useSession();
    const [addPost] = useMutation(ADD_POST , {
        refetchQueries:[
            GET_POST_LIST,
            "getPostList"
        ],
    });
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const [imageBoxIsOpen, setImageBoxIsOpen] = useState<boolean>(false);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();


    //refactors
    const createPost = async (formData: FormData , subreddit_id:string) => {
        const image = formData.postImage || '';
        const { data: { insertPost: newPost } } = await addPost({
            variables: {
                title: formData.postTitle,
                body: formData.postBody,
                image: image,
                subreddit_id: subreddit_id,
                username: session?.user?.name,
            }
        });
        return newPost;
    }


    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading('Creating new post ...');
        try {
            // query for the dubreddit topic
            const { data: { getSubredditListByTopic } }:ApolloQueryResult<any> = await client.query({
                query: GET_SUBRDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subreddit,
                }
            });

            //boolean value of if there is subreddits under the entered subreddit in the form or not
            const subreddit:boolean = getSubredditListByTopic.length > 0;
            if (!subreddit) {
                //create subreddit
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit,
                    }
                });

                //create the post
                await createPost(formData , newSubreddit.id);
            } else {
                //use the existing subreddit
                await createPost(formData , getSubredditListByTopic[0].id);
            }
            

            //Reset post values
            setValue('postTitle' , '');
            setValue('postBody' , '');
            setValue('postImage' , '');
            setValue('subreddit' , ''); 
            toast.success('New post created' , {
                id: notification,
            });
        } catch (error) {
            toast.error(`${error}` , {
                id: notification,
            });
        }
    });
    return (
        <form onSubmit={onSubmit} className='px-2 p-2 bg-white border-gray-400 border-[0.3px] rounded-md'>
            <div className='p-2 flex items-center space-x-4 w-full'>
                {/* Avarate */}
                <Avatar seed={session?.user?.name!}/>
                <input {...register('postTitle', { required: true })} type="text" className='flex-1 py-2 px-4 text-sm bg-gray-100 outline-none border-[1px] border-gray-200 rounded-sm hover:border-blue-600 hover:bg-white' placeholder={session ? 'Create a post' : 'Sign in to post'} disabled={!session} />
                <div onClick={() => setImageBoxIsOpen(!imageBoxIsOpen)} className='p-1 hover:bg-gray-100'><PhotographIcon className={`w-7 h-7 stroke-1 ${imageBoxIsOpen ? 'text-blue-600' : 'text-gray-700'}`} /></div>
                <div className='p-1 hover:bg-gray-100'><LinkIcon className='w-7 h-7 text-gray-700 stroke-1' /></div>
            </div>
            {!!watch('postTitle') && (
                <div className='w-full'>
                    {/* Body */}
                    <input {...register('postBody')} type="text" placeholder='Text' className='w-full my-2 p-2 text-sm bg-gray-100 outline-none border-[1px] border-gray-200 rounded-sm hover:border-blue-600 hover:bg-white' />
                    <input {...register('subreddit', { required: true })} type="text" placeholder='Subreddit' className='w-full my-2 p-2 text-sm bg-gray-100 outline-none border-[1px] border-gray-200 rounded-sm hover:border-blue-600 hover:bg-white' />
                </div>
            )}
            {/* Errors */}
            {Object.keys(errors).length > 0 && (
                <div className='space-y-2 text-red-500'>
                    {errors.postTitle?.type === "required" && (
                        <p>Post title is requried</p>
                    )}
                    {errors.subreddit?.type === "required" && (
                        <p>- A subreddit is requried</p>
                    )}
                </div>
            )}
            {/* Create post button */}
            {!!watch('postTitle') && (
                <button type='submit' className='bg-blue-400 p-2 rounded-2xl text-white font-bold text-center w-full'>Create Post</button>
            )}
        </form>
    )
}
