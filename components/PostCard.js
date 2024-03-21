import Image from "next/image"
import Link from "next/link"

export default function PostCard (props){
    const { post, index, length, ...rest } = props
    const mobileBorders = `border-t-2 border-x-2 ${index === length-1 ? 'border-b-2' : ''}`
    const desktopBorders = `sm:border-y-2 ${index === length ? 'sm:border-b-2' : ''} ${index%2===1 ? 'sm:border-r-2' : ''} `
    return (
        <div className={`relative 2xl:mx-4 p-8 md:p-[47px] ${rest.className} ${mobileBorders} ${desktopBorders} border-black`}>
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
                                            {idx !== post.tags.nodes.length -1 ? <span className="mx-1">+</span> : ''}
                                        </span>
                                    )
                                })
                            }

                    </div>
                    <h3 className="text-5xl tracking-tight leading-41 text-center">{post.title}</h3>
            </Link>
            <Link href={post.uri} className={"card"}>
                <div className="uppercase font-sansSerif absolute top-[30%] right-[15px] text-white bg-red-500 p-2 rounded-3xl tracking-wider py-0.4 px-4">
                    More <Image width="40" height="20" src="/arrow.svg" alt="arrow" className="inline-block w-4 h-4 mb-1" />
                </div>
            </Link>
        </div>
    )
}