import { NextPage } from 'next';
import Head from 'next/head'
import PostBox from '../components/PostBox';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen max-w-4xl mx-auto text-black'>
      <Head>
        <title>Reddit 2.0</title>
        <meta name="description" content="Reddit 2.0 Clone By Manssif" />
        <link rel="icon" href="/assets/icons/reddit_mark.png" />
      </Head>
      <PostBox/>
    </div>
  )
}

export default Home;
