import { notFound } from "next/navigation";
import { getSinglePost } from "@/services/blogActions";
import PostContent from "./PostContent";

export const dynamic = "force-dynamic";

export interface Post {
  id: number;
  title: string;
  content: string;
  cover_image: string;
  reading_time: number;
  author: string;
  summary: string;
  tags: string;
  created_at: string;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getSinglePost(id);

  const post = response.data?.data || response.data;
  if (!post) return { title: "Post Not Found" };
  const url = `https://xseyed.ir/blog/${id}`;

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags
      ? typeof post.tags === "string" && post.tags.length > 0
        ? JSON.parse(post.tags)
        : Array.isArray(post.tags)
        ? post.tags
        : []
      : [],
    openGraph: {
      title: post.title,
      url: url,

      description: post.summary,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}${post.cover_image}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`${process.env.NEXT_PUBLIC_API_URL}${post.cover_image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getSinglePost(id);

  if (!response?.success) return <div>SERVER ERROR</div>;

  const post = (response.data?.data || response.data) as Post | undefined;
  if (!post) return notFound();

  return <PostContent post={post} />;
}
