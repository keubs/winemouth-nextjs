import Image from "next/image"
import Link from "next/link"

export default function PostCard (props){
    const { post, ...rest } = props
    return (
        <div className={`relative p-[47px] ${rest.className}`}>
            <Link href={post.uri} className={"card"}>
            {post.featuredImage &&
                <Image src={`${post.featuredImage.node.sourceUrl}?`} alt={post.title} width={400} height={400} />
            }
            </Link>
            <Link href={post.uri} className={"card"}>
                    <div className="text-center h-8 flex justify-center items-center">
                            {
                                post.tags.nodes.map((tag, idx) => {
                                    return (
                                        <span  key={tag.name} >
                                            <span className="tag text-xs font-sansSerif uppercase tracking-widest">{tag.name}</span>
                                            {idx !== post.tags.nodes.length -1 ? ' + ' : ''}
                                        </span>
                                    )
                                })
                            }

                    </div>
                    <h3 className="text-5xl tracking-tight leading-41 text-center">{post.title}</h3>
            </Link>
            <Link href={post.uri} className={"card"}>
                <div className="uppercase font-sansSerif absolute top-[60%] right-[25px] text-white bg-red-500 p-2 rounded-3xl tracking-wider py-0.4 px-1.2">
                    More <Image width="40" height="20" src="/arrow.svg" alt="arrow" className="inline-block w-4 h-4 mb-1" />
                </div>
            </Link>
        </div>
    )
}