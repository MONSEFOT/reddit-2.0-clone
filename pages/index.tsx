import { NextPage } from 'next';
import Head from 'next/head'
import Feed from '../components/Feed';
import PostBox from '../components/PostBox';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen max-w-4xl mx-auto text-black py-10 space-y-10'>
      <Head>
        <title>Reddit 2.0</title>
        <meta name="description" content="Reddit 2.0 Clone By Manssif" />
        <link rel="icon" href="/assets/icons/reddit_mark.png" />
      </Head>
      <PostBox/>
      <Feed/>
    </div>
  )
}

export default Home;
