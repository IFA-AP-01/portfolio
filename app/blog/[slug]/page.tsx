import Comment from "@/components/common/comment";
import { getPostData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} | IFA Team`,
    description: postData.description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let postData;
  try {
    postData = await getPostData(slug);
  } catch (error) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center px-4 py-28 min-h-screen">
      {/* Header Section: Back Link */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
        <div className="lg:col-span-3">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 font-bold text-black bg-[#E9945B] neo-button"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* Main Content Section: Article and Table of Contents */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4">
        <div className="lg:col-span-3">
          <article className="w-full sm:neo-card sm:p-4 mb-12">
            <header className="mb-10 border-b-2 border-black pb-8 pt-4">
              <h1 className="text-2xl md:text-4xl font-black mb-2 leading-tight">
                {postData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                By{" "}
                <Link
                  className="text-[#E9945B] hover:underline"
                  target="_blank"
                  href={`https://github.com/${postData.author}`}
                >
                  @{postData.author}
                </Link>
              </p>
              <div className="flex flex-wrap gap-4 items-center text-sm font-mono">
                <span className="bg-purple-300 border-2 border-black px-3 py-1 font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {new Date(postData.date).toISOString().split("T")[0]}
                </span>
                <span className="font-bold text-gray-500 dark:text-gray-400">
                  • {postData.readingTime}
                </span>
              </div>
            </header>

            <div
              className="markdown-content text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
            />
          </article>
        </div>

        {/* Table of Contents Sidebar - Sticky relative to this grid section only */}
        <aside className="hidden lg:block lg:col-span-1 h-full pb-12">
          <div className="sticky top-28 p-4 neo-card bg-white">
            <h3 className="text-xl font-black mb-4 border-b-2 border-black pb-2">
              Table of Contents
            </h3>
            <nav>
              <ul className="space-y-2 text-sm max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {postData.toc && postData.toc.length > 0 ? (
                  postData.toc.map((item) => (
                    <li
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="hover:text-[#E9945B] hover:underline transition-colors block py-0.5"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No headings found</p>
                )}
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      {/* Footer Section: Tags and Comments */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-4">
            <h2 className="text-2xl font-black">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            {postData.tags &&
              postData.tags.map((tag) => (
                <Link
                  href={`/blog?tag=${tag}`}
                  key={tag}
                  className="font-bold text-gray-600 dark:text-gray-400 border border-black px-2 py-1 neo-shadow hover:bg-yellow-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
          </div>
          <Comment url={`https://ifa.team/blog/${slug}`} />
        </div>
      </div>
    </main>
  );
}
