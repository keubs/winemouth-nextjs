import Image from "next/image"
import Link from "next/link"

export default function PostCard ({ post }){
    return (
        <div className="relative p-[47px]">
            <Link href={post.uri} className={"card"}>
            {post.featuredImage &&
                <Image src={`${post.featuredImage.node.sourceUrl}?`} alt={post.title} width={400} height={400} />
            }
            </Link>
            <Link href={post.uri} className={"card"}>
                    <div className="text-center">
                        <>
                            {
                                post.tags.nodes.map((tag, idx) => {
                                    return (
                                        <span  key={tag.name} >
                                            <span className="tag text-xs font-sansSerif uppercase">{tag.name}</span>
                                            {idx !== post.tags.nodes.length -1 ? ' + ' : ''}
                                        </span>
                                    )
                                })
                            }
                        </>
                    </div>
                    <h3 className="text-5xl tracking-tight leading-41">{post.title}</h3>
            </Link>
            <Link href={post.uri} className={"card"}>
                <div className="uppercase font-sansSerif absolute top-[370px] -right-[30px] text-white bg-red-500 p-2 rounded-3xl">
                    More &rarr;
                </div>
            </Link>
        </div>
    )
}