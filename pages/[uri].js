import Head from 'next/head'
import Footer from '../components/Footer'
import { getPostByUri } from '../lib/test-data';
import { client } from '../lib/apollo'
import { gql } from '@apollo/client';
import Image from 'next/image';
import localFont from 'next/font/local'

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

  return (
    <div>
      <div className="logoContainer max-w-200 justify-center flex mt-5 mb-10">
        <Image width="200" height="200" className="w-100" style={{ width: '200px' }} src="/winemouth.svg" alt="Wine Mouth Logo" />
      </div>
      <main className={`flex justify-center ${applegaramond.variable} font-serif`}>
          <div className="siteHeader">
            <h1 className="title">
                {post.title}
            </h1>
            <p>✍️  &nbsp;&nbsp;{`${post.author.node.firstName} ${post.author.node.lastName}`} | 🗓️ &nbsp;&nbsp;{ new Date(post.date).toLocaleDateString() }</p>
          </div>
            <article dangerouslySetInnerHTML={{__html: post.content}}>   
            </article>
      </main>

      <Footer></Footer>

    </div>
  )
}


export async function getStaticProps({ params }){
  
  const GET_POST_BY_URI = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
      title
      content
      date
      uri
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