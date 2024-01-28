import Head from 'next/head';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { getAllPosts } from '../lib/test-data';

import { client } from '../lib/apollo'
import { gql } from '@apollo/client';
import localFont from 'next/font/local'
import Image from 'next/image';


const applegaramond = localFont({
  src: [
    {
      path: '../public/fonts/applegaramond-webfont.woff',
      weight: 'normal',
    },
    {
      path: '../public/fonts/applegaramond-light-webfont.woff2',
      weight: '200',
    }
],
  variable: '--font-garamond' 
})
export default function Home({ posts }) {


  return (
    <div className="container justify-self-center bg-background flex flex-col min-h-screen">
      <Head>
        <title>Wine Mouth</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>
      <div className="logoContainer max-w-200 justify-center flex mt-5 mb-10">
        <Image width="200" height="200" className="w-100" style={{ width: '200px' }} src="/winemouth.svg" alt="Wine Mouth Logo" />
      </div>
      <main className={`flex justify-center ${applegaramond.variable} font-serif`}>

        <div className="grid grid-cols-2 max-w-4xl gap-2">
          {
            posts.map((post) => {
              return (
                <PostCard key={post.uri} post={post}></PostCard>
              )
            })
          }
        </div>
      </main>

      <Footer className="align-bottom mt-auto"></Footer>
    </div>
  )
}

export async function getStaticProps(){

  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          content
          uri
          date
          featuredImage {
            node {
							uri
              sourceUrl
              title
            }
          }
          tags {
						nodes {
              name
            }
          }
        }
      }
    }
  `

  let response
  try {
    response = await client.query({
      query: GET_POSTS
    })
  } catch (error) {
    console.log('console.log', error)
  }
  
  const posts = response?.data?.posts?.nodes
  return {
    props: {
      posts
    }
  }
}
