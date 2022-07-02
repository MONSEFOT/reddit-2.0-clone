import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header'
import { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/apollo-client";
import {Toaster} from 'react-hot-toast';
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <div className='min-h-screen overflow-x-scroll bg-gray-300'>
          <Toaster />
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
