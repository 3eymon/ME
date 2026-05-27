import { getAllPosts } from "@/services/blogActions";
import BlogCard from "@/components/blog/BlogCard";
import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import LazyloadImage from "@/components/blog/LazyloadImage";
import normalizeTags from "@/lib/normalizeTags";

export const revalidate = 3600;
export const metadata = {
  title: "My Blog | Seyed mohsen mousavi",
  description:
    "Read the latest articles, tutorials, and insights on web development and technology.",
  robots: "index, follow",
};

async function Blog() {
  const response = await getAllPosts();
  if (!response.success) return <>SERVER ERROR</>;
  const { data: posts }: any = response.data || [];

  return (
    <div className="w-full p-6 min-h-screen text-white">
      <h1 className="font-mod mb-8 text-4xl font-bold">My Blog</h1>
      {posts.length > 0 && (
        <div className="w-full border border-white/15 shadow-white/10 rounded-xl overflow-hidden mb-10 bg-t shadow flex flex-col lg:flex-row h-full">
          <Link
            href={`/blog/${posts[0].id}`}
            className="relative w-full lg:w-2/5 flex-shrink-0 aspect-[16/9] lg:aspect-auto"
          >
            <LazyloadImage
              src={`${process.env.NEXT_PUBLIC_API_URL}${posts[0].cover_image}`}
              alt={posts[0].title}
            />
          </Link>

          <div className="p-6 lg:p-8 flex flex-col justify-between w-full">
            <div>
              <p className="text-sm text-zinc-400 mb-2">
                {posts[0].author} •{" "}
                {new Date(posts[0].created_at).toLocaleDateString("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {normalizeTags(posts[0]?.tags).map((tag) => (
                  <span
                    key={tag}
                    className="bg-black text-white px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-black max-lg:line-clamp-2">
                {posts[0].title}
              </h1>
              <p className="mb-6 text-zinc-500 max-lg:line-clamp-3">
                {posts[0].summary}
              </p>
            </div>

            <Link
              href={`/blog/${posts[0].id}`}
              className="px-6 py-3 bg-black text-white rounded-lg hover:ring-4 ring ring-white/15 border border-white transition self-start"
            >
              Read More
            </Link>
          </div>
        </div>
      )}

      {posts.length > 1 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post: any, index: number) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
