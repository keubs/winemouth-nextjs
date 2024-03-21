import Head from 'next/head'
import Footer from '../components/Footer'
import { getPostByUri } from '../lib/test-data';
import { client } from '../lib/apollo'
import { gql } from '@apollo/client';
import Image from 'next/image';
import localFont from 'next/font/local'
import Link from 'next/link';

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

export default function SlugPage({ post }) {
  const {
    author: { node: { firstName, lastName } },
    title,
    content,
    date,
    featuredImage: {
      node: {
        sourceUrl
      }
    }
  } = post
  return (
    <>
      <Head>
        <title>🍷🫦 | {title}</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>
      <div className="container justify-self-center bg-background flex flex-col min-h-screen">
        <div className="logoContainer max-w-200 justify-center flex mt-5 mb-10">
          <Link href="/">
            <Image width="200" height="200" className="w-100" style={{ width: '200px' }} src="/winemouth.svg" alt="Wine Mouth Logo" />
          </Link>
        </div>
        <main className={`flex flex-col justify-center ${applegaramond.variable} font-serif max-w-screen-lg self-center`}>
          <section className='flex flex-col md:flex-row px-6 border-2 py-6 border-black max-w-99 m-4 sm:m-1'>
            <div className="m-b-2">
              <Image width={495} height={600} src={sourceUrl} alt="" />
            </div>
            <h1 className="title text-5xl px-12 border-black">
                {title}
            </h1>
          </section>
          {/* <div className="siteHeader">
            <p>{`${firstName} ${lastName}`} | 🗓️ &nbsp;&nbsp;{ new Date(date).toLocaleDateString() }</p>
          </div> */}
          <article className='px-10 sm:px-20 font-sansSerif' dangerouslySetInnerHTML={{__html: content}} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}


export async function getStaticProps({ params }){
  
  const GET_POST_BY_URI = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
      id
      title
      content
      date
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          firstName
          lastName
        }
      }
    }
  }
`
  const response = await client.query({
    query: GET_POST_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const post = response?.data?.post
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}