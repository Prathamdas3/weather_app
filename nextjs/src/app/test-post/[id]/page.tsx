import type { Metadata } from 'next'
import axios from 'axios'
import { cache } from 'react'
import { notFound } from 'next/navigation'

//if you want to cache data and do not want to rerun the same fetch every time the use cache to cache it and store it
// const getPost = cache(async (postId: string) => {
//   const post = await getData(postId)
//   return post;
// })

//this will statically generate your pages before hand and faster loading time means good seo and faster performance
// export default async function generateStaticParams() {
// const {data}=await axios.get('urlwithallposts')
// return data.map(({id})=>id);
// }

//dynamic metadata and remember you can only export generateMetadata from a server component not from a client component this goes for generateStaticMetaData
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { data } = await axios.get('url/' + id)
  return {
    title: data.title,
    description: data.description,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  }
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  // const data=await getdata(id)
  // if(status===404){
  // notFound()
  // }
  return <main></main>
}
