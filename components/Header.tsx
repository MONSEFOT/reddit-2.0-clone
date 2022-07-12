import Image from 'next/image'
import React, { useEffect } from 'react'
import {
    SearchIcon,
    ChevronDownIcon,
    BellIcon,
    ChatIcon,
    PlusIcon,
    GlobeIcon,
    VideoCameraIcon,
    SparklesIcon,
    SpeakerphoneIcon,
} from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Avatar from './Avatar';

const Header = () => {
    const { data: session } = useSession();
    const onDropMenu = () => {
        document?.getElementById('menu')?.classList.toggle('hidden');
    }
    return (
        <div className='min-w-max max-h-fit px-5 py-[5px] bg-white flex items-center space-x-5'>
            <Link href="/" >
                <div className='flex items-center space-x-3 hover:cursor-pointer'>
                    <div className='relative w-9 h-9'>
                        <Image src="/assets/icons/reddit_mark.png" className='w-10' objectFit='contain' layout='fill' alt="" />
                    </div>
                    <div className='relative w-12 h-9 hidden lg:block'>
                        <Image src="/assets/icons/reddit_logotype.png" objectFit='contain' layout='fill' alt="" />
                    </div>
                </div>
            </Link>
            {/* Home     */}
            <div className='flex justify-between items-center rounded-sm px-2 py-1 border-[1px] border-transparent hover:border-gray-200 hover:cursor-pointer'>
                <div className='flex items-center space-x-2 xl:min-w-[300px]'>
                    <HomeIcon className='w-7' />
                    <p className='text-sm font-bold hidden lg:inline xl:flex-1'>Home</p>
                </div>
                <ChevronDownIcon className='w-4' />
            </div>
            {/* Search Bar */}
            <form className='w-full flex bg-gray-100 border-gray-200 border-[1px] px-4 py-[5px] rounded-sm space-x-3 hover:bg-white hover:border-[1px] hover:border-blue-600' >
                <SearchIcon className="w-5" />
                <input className="bg-transparent w-full outline-none placeholder:text-grey" type="text" name="search-bar" id="search-bar" placeholder="Search Reddit" />
            </form>
            <div className='flex'>
                <div className='hidden lg:flex'>
                    <SparklesIcon className='icon' />
                    <GlobeIcon className='icon' />
                    <VideoCameraIcon className='icon' />
                    <hr className='h-10 border border-gray-100 mx-2' />
                </div>
                <div className='flex'>
                    <ChatIcon className='icon' />
                    <BellIcon className='icon' />
                    <PlusIcon className='icon' />
                    <SpeakerphoneIcon className='icon rounded-full bg-gray-100' />
                </div>
            </div>
            {session ? (
                // <button onClick={() => signOut()} className='border-[1px] border-blue-600 text-blue-600 font-bold rounded-2xl w-24 px-2 py-1'>Sign Out</button>
                <div onClick={onDropMenu} className='relative flex items-center p-1 border-[1px] border-transparent hover:cursor-pointer hover:border-gray-500'>
                    <Avatar seed={session?.user?.name!}/>
                    <div className='hidden lg:block'>
                        <p className='font-bold text-sm truncate'>{session?.user?.name}</p>
                        <button onClick={() => signOut()} className='font-bold text-sm text-blue-600 underline underline-offset-2'>sign out</button>
                    </div>
                    <div className='hover:cursor-pointer lg:hidden'>
                        <ChevronDownIcon className='w-5' />
                    </div>
                    <div id='menu' className='hidden absolute -bottom-[13.5rem] -right-4 w-52 h-52 p-3 space-y-5 bg-white rounded-sm lg:hidden'>
                        <p className='font-bold text-sm truncate'>{session?.user?.name}</p>
                        <button onClick={() => signOut()} className='border-[1px] border-blue-600 text-blue-600 font-bold rounded-2xl w-24 px-2 py-1'>Sign Out</button>
                    </div>
                </div>
            ) : (
                <button onClick={() => signIn()} className='border-[1px] border-blue-600 text-blue-600 font-bold rounded-2xl min-w-[100px] px-2 py-1'>Sign In</button>
            )}
        </div>
    )
}

export default Header