"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { Post } from "./page";
import { Highlight, themes } from "prism-react-renderer";
import normalizeTags from "@/lib/normalizeTags";

const theme = themes.oneDark;

type Props = { post: Post };

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl  overflow-hidden">
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 z-10 rounded-md bg-black/10 backdrop-blur-xs px-2 py-1 ring-1 ring-white/15 cursor-pointer text-xs  transition-all ${
          copied ? "bg-white/10" : "text-white hover:ring-4"
        }`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <Highlight theme={theme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto rounded-xl p-4`}
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export function sanitizeAndParse(html: string) {
  const clean = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "frameborder",
      ],
      code: ["class"],
    },
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === "code" &&
        domNode.parent &&
        domNode.parent instanceof Element &&
        domNode.parent.name === "pre"
      ) {
        const className = domNode.attribs.class || "";
        const languageMatch = className.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : "javascript";
        const code = domToReact(
          domNode.children as import("html-react-parser").DOMNode[]
        );

        const codeText =
          typeof code === "string"
            ? code
            : Array.isArray(code)
            ? code.map((c) => (typeof c === "string" ? c : "")).join("")
            : "";

        return <CodeBlock code={codeText} language={language} />;
      }

      if (
        domNode instanceof Element &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(domNode.name)
      ) {
        let className = "";
        switch (domNode.name) {
          case "h1":
            className = "text-3xl mb-4 sm:text-4xl font-bold";
            break;
          case "h2":
            className = "text-2xl my-3 sm:text-3xl font-semibold";
            break;
          case "h3":
            className = "text-xl sm:text-2xl font-semibold";
            break;
          case "h4":
            className = "text-lg sm:text-xl font-semibold";
            break;
          case "h5":
            className = "text-base sm:text-lg font-medium";
            break;
          case "h6":
            className = "text-sm sm:text-base font-medium";
            break;
        }
        return React.createElement(
          domNode.name,
          { className },
          domToReact(domNode.children as import("html-react-parser").DOMNode[])
        );
      }
    },
  };

  return parse(clean, options);
}

export default function PostContent({ post }: Props) {
  const [showSummary, setShowSummary] = useState(true);
  const createdAt = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-1 sm:px-6 py-4">
      <Link
        href="/blog"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 bg-zinc-900/80 text-blue-400 hover:text-blue-500 px-3 py-1 rounded-lg backdrop-blur-sm shadow-lg transition"
      >
        <IoArrowBack className="w-5 h-5" /> Back
      </Link>

      <header className="my-8" id="post-header">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-200 shadow-sm">
            Author: {post.author}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-200 shadow-sm">
            {createdAt}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-200 shadow-sm">
            {post.reading_time} min read
          </span>
        </div>
      </header>

      {post.cover_image && (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${post.cover_image}`}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {showSummary && post.summary && (
        <blockquote className="mb-6 flex border-l-4 border-white bg-zinc-800 text-zinc-100 p-4 rounded-lg text-xs sm:text-sm">
          {post.summary}
        </blockquote>
      )}

      <div className=" blog-content prose prose-neutral max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
        {post.content && sanitizeAndParse(post.content)}
      </div>

      {normalizeTags(post.tags).length > 0 && (
        <footer className="mt-10 flex flex-wrap gap-2">
          {normalizeTags(post.tags).map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 text-sm border-zinc-700 text-zinc-500"
            >
              #{t}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
}
