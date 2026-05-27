import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
        <p className="mb-6">This Page just for route management</p>
        <Link
          href="/admin-panel/blog"
          className="inline-block px-4 py-2 border rounded hover:bg-gray-100 hover:text-black"
        >
          Blog
        </Link>
      </div>
    </main>
  );
}
