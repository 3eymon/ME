"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useMemo } from "react";

const lowlight = createLowlight(common);

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class:
              "language-javascript my-4 rounded-xl bg-gray-900 text-white p-4 overflow-x-auto font-mono",
          },
        },
      }),
      Link,
      Image,
      BulletList,
      OrderedList,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    []
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert dark:prose-invert max-w-full focus:outline-none text-white",
      },
    },
  });

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) return null;

  const buttons = [
    {
      label: "B",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      label: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      label: "U",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      label: "S",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      tooltip: "Strike",
    },
    {
      label: "• List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      label: "1. List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      label: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      label: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      label: "Quote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      label: "HR",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
      tooltip: "Horizontal Rule",
    },
    {
      label: "Code",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      label: "Image",
      action: addImage,
      active: false,
      tooltip: "Insert Image",
    },
    {
      label: "Link",
      action: () => {
        const url = prompt("Enter URL");
        if (url)
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
      },
      active: false,
      tooltip: "Insert Link",
    },
  ];

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 bg-gray-800 rounded-xl p-2 shadow-md">
        {buttons.map((btn, idx) => (
          <div key={idx} className="relative group">
            <button
              onClick={btn.action}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                btn.active
                  ? "bg-white text-black shadow-lg"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {btn.label}
            </button>
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {btn.tooltip}
            </span>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="editor border border-gray-700 rounded-xl p-4 min-h-[350px] bg-gray-900 shadow-inner prose prose-invert max-w-full overflow-auto blog-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
