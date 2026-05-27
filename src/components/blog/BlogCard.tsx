"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
gsap.registerPlugin(ScrollTrigger);

interface BlogCardProps {
  post: any;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="group cursor-pointer">
      <Link
        href={`/blog/${post.id}`}
        className="block overflow-hidden rounded-lg"
      >
        {post.cover_image && (
          <div className="relative h-64 w-full">
            <LazyLoadImage
              src={`${process.env.NEXT_PUBLIC_API_URL}${post.cover_image}`}
              alt={post.title}
              effect="blur"
              className="object-cover w-full h-full rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
              wrapperClassName="w-full h-full"
            />
          </div>
        )}
      </Link>

      <div className="mt-3 text-sm text-gray-500">
        {post.author} •{" "}
        {new Date(post.created_at).toLocaleDateString("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <h2 className="mt-1 text-lg font-semibold group-hover:text-blue-500 transition-colors">
        {post.title}
      </h2>
      <p className="mt-1 text-gray-400 line-clamp-2">{post.summary}</p>
    </div>
  );
};

export default BlogCard;
