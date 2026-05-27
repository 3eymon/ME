"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Spinner,
  Pagination,
  Chip,
} from "@heroui/react";

import {
  getAllPosts,
  getSinglePost,
  AddPost,
  UpdatePost,
  DeletePost,
} from "@/services/blogActions";
import { Post } from "@/app/blog/[id]/page";
import dynamic from "next/dynamic";
import { sanitizeAndParse } from "@/app/blog/[id]/PostContent";
import { IoClose } from "react-icons/io5";
import normalizeTags from "@/lib/normalizeTags";
const RichTextEditor = dynamic(
  () => import("@/components/blog/admin/RichTextEditor"),
  {
    ssr: false,
  }
);

interface Res {
  success: boolean;
  data?: Post | null | undefined;
  message?: string | undefined;
  errors?: any;
  status?: number | undefined;
}
type GetPostsResponse = {
  success: boolean;
  data?: { data: Post[] | null; totalPages?: number };
  message?: string;
};
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [viewPost, setViewPost] = useState<any | null>(null);
  const [editPost, setEditPost] = useState<any | null>(null);
  const [deletePost, setDeletePost] = useState<any | null>(null);
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [savingCreate, setSavingCreate] = useState(false);
  const [savingUpdate, setSavingUpdate] = useState(false);
  const [savingDelete, setSavingDelete] = useState(false);
  useEffect(() => {
    loadPosts(page);
  }, [page]);

  async function loadPosts(page: number = 1) {
    setLoadingPosts(true);
    setError(null);
    try {
      const res: GetPostsResponse = await getAllPosts(page);
      if (res.success) {
        setPosts(res.data?.data ?? []);
        setTotalPages(res.data?.totalPages ?? 1);
      } else {
        setError(res.message || "Failed to load posts");
      }
    } catch (err) {
      setError("Network error or server error");
    } finally {
      setLoadingPosts(false);
    }
  }

  function openCreate() {
    setTitle("");
    setContent("");
    setCoverFile(null);
    setSummary("");
    setAuthor("");
    setTags([]);
    setCreateOpen(true);
  }

  async function openView(id: string) {
    setLoadingView(true);
    const res = await getSinglePost(id);
    setLoadingView(false);
    if (res.success) setViewPost(res.data);
    else setNotice(res.message || "Failed to load post");
  }

  async function openEdit(id: string) {
    setLoadingEdit(true);
    const res: Res = await getSinglePost(id);
    setLoadingEdit(false);
    if (res.success && res.data) {
      setEditPost(res.data);
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setSummary(res.data.summary || "");
      setAuthor(res.data.author || "");
      setTags(res.data.tags ? JSON.parse(res.data.tags) : []);
      setCoverFile(null);
    } else {
      setNotice(res.message || "Failed to load post");
    }
  }

  async function handleCreate() {
    setSaving(true);
    setNotice(null);

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("summary", summary);
    form.append("author", author);
    form.append("tags", JSON.stringify(tags));
    if (coverFile) {
      form.append("cover_image", coverFile);
    }
    setSavingCreate(true);
    const res = await AddPost(form);
    setSaving(false);
    setSavingCreate(false);
    if (res.success) {
      setNotice("Post created successfully");
      setCreateOpen(false);
      await loadPosts();
    } else {
      setNotice(res.message || "Failed to create post");
    }
  }

  async function handleSave() {
    if (!editPost) return;
    setSaving(true);

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("summary", summary);
    form.append("author", author);
    form.append("tags", JSON.stringify(tags));
    if (coverFile) {
      form.append("cover_image", coverFile);
    }

    const res = await UpdatePost(editPost.id, form);
    setSaving(false);
    if (res.success) {
      setNotice("Post updated successfully");
      setEditPost(null);
      await loadPosts();
    } else {
      setNotice(res.message || "Failed to update post");
    }
  }

  async function handleDelete() {
    if (!deletePost) return;
    setSaving(true);
    const res = await DeletePost(deletePost.id);
    setSaving(false);
    if (res.success) {
      setNotice("Post deleted successfully");
      setDeletePost(null);
      await loadPosts();
    } else {
      setNotice(res.message || "Failed to delete post");
    }
  }
  return (
    <main className="max-md:py-5 md:p-8">
      <div className="flex max-md:flex-col max-md:gap-4 items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold max-md:text-3xl">
          Blog Management
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin-panel">
            <Button variant="flat">Back to Admin</Button>
          </Link>
          <Button onPress={openCreate}>Create New Post</Button>
        </div>
      </div>

      {notice && <div className="mb-4 p-3 border rounded">{notice}</div>}
      {error && (
        <div className="mb-4 p-3 border rounded text-red-600">{error}</div>
      )}

      {loadingPosts ? (
        <div className="flex items-center gap-2 justify-center w-full h-full">
          <Spinner variant="wave" color="default" size="lg" />
        </div>
      ) : (
        <>
          <Table aria-label="Blog posts table">
            <TableHeader>
              <TableColumn>Title</TableColumn>
              <TableColumn>Author</TableColumn>
              <TableColumn>Reading Time</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {posts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No posts found.</TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author || "-"}</TableCell>
                    <TableCell>{post.reading_time || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onPress={() => openView(String(post.id))}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => openEdit(String(post.id))}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onPress={() => setDeletePost(post)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Pagination
              color="default"
              boundaries={3}
              initialPage={page}
              total={totalPages}
              variant="bordered"
              onChange={(p) => setPage(p)}
              size="md"
              showControls
            />
          </div>
        </>
      )}

      <Modal
        isOpen={!!viewPost}
        onClose={() => setViewPost(null)}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>{viewPost?.title}</ModalHeader>
          <ModalBody>
            {viewPost?.cover_image && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${viewPost.cover_image}`}
                alt={viewPost.title}
                className="mb-3 max-h-60 object-cover w-full"
              />
            )}
            <p>
              <strong>Author:</strong> {viewPost?.author || "-"}
            </p>
            <p>
              <strong>Reading Time:</strong> {viewPost?.reading_time || "-"} min
            </p>
            <p>
              <strong>Tags:</strong>{" "}
              {normalizeTags(viewPost?.tags).length > 0
                ? normalizeTags(viewPost?.tags).join(", ")
                : "-"}
            </p>
            <p className="mt-2">{viewPost?.summary}</p>
            <div className=" blog-content prose prose-neutral max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
              {viewPost?.content && sanitizeAndParse(viewPost.content)}
            </div>{" "}
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setViewPost(null)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={!!editPost}
        onClose={() => setEditPost(null)}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <Input
                label="Title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
              <RichTextEditor value={content} onChange={setContent} />

              <Textarea
                label="Summary"
                value={summary}
                onChange={(e: any) => setSummary(e.target.value)}
              />
              <Input
                label="Author"
                value={author}
                onChange={(e: any) => setAuthor(e.target.value)}
              />
              <Input
                label="Tags"
                value={tagInput}
                onChange={(e: any) => setTagInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter" && tagInput.trim() !== "") {
                    e.preventDefault();
                    setTags([...tags, tagInput.trim()]);
                    setTagInput("");
                  }
                }}
              />
              {normalizeTags(tags).length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {normalizeTags(tags).map((tag) => (
                    <Chip
                      variant="dot"
                      key={tag}
                      className="flex items-center gap-1 relative"
                    >
                      <span>{tag}</span>

                      <button
                        type="button"
                        onClick={() =>
                          setTags((prev) => prev.filter((t) => t !== tag))
                        }
                        className="ml-1 text-red-500 font-bold hover:text-red-700 cursor-pointer bg-white absolute flex items-center justify-center rounded-full -top-1 -right-2"
                      >
                        <IoClose className="size-4" />
                      </button>
                    </Chip>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 mt-2">No tags added.</p>
              )}

              <Input
                type="file"
                label="Cover Image"
                onChange={(e: any) => setCoverFile(e.target.files[0])}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setEditPost(null)}>Cancel</Button>
            <Button color="primary" onPress={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <Input
                label="Title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
              <RichTextEditor value={content} onChange={setContent} />

              <Textarea
                label="Summary"
                value={summary}
                onChange={(e: any) => setSummary(e.target.value)}
              />
              <Input
                label="Author"
                value={author}
                onChange={(e: any) => setAuthor(e.target.value)}
              />
              <Input
                label="Tags"
                value={tagInput}
                onChange={(e: any) => setTagInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter" && tagInput.trim() !== "") {
                    e.preventDefault();
                    setTags([...tags, tagInput.trim()]);
                    setTagInput("");
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {normalizeTags(tags).map((tag, index) => (
                  <Chip
                    variant="dot"
                    key={index}
                    className="flex items-center gap-1 relative"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                      className="ml-1 text-red-500 font-bold hover:text-red-700 cursor-pointer  bg-white absolute flex items-center justify-center rounded-full -top-1 -right-2"
                    >
                      <IoClose className="size-4" />
                    </button>
                  </Chip>
                ))}
              </div>
              <Input
                type="file"
                label="Cover Image"
                onChange={(e: any) => setCoverFile(e.target.files[0])}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setCreateOpen(false)}>Cancel</Button>
            <Button color="primary" onPress={handleCreate} disabled={saving}>
              {saving ? "Creating..." : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={!!deletePost} onClose={() => setDeletePost(null)}>
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete {'"'}
              {deletePost?.title}
              {'"'}?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setDeletePost(null)}>Cancel</Button>
            <Button color="danger" onPress={handleDelete} disabled={saving}>
              {saving ? "Deleting..." : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
