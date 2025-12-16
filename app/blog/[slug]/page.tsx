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
      <div className="w-full max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center mb-4 px-4 py-2 font-bold text-black bg-[#E9945B] neo-button"
        >
          ← Back to Blog
        </Link>

        <article className="w-full sm:neo-card sm:p-6 md:p-12 mb-12">
          <header className="mb-10 border-b-2 border-black pb-8">
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
            </div>
          </header>

          <div
            className="markdown-content text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
          />
        </article>
        <div className="flex flex-wrap gap-4">
          {postData.tags &&
            postData.tags.map((tag) => (
              <span
                key={tag}
                className="font-bold text-gray-600 dark:text-gray-400 border border-black px-2 py-1 neo-shadow"
              >
                #{tag}
              </span>
            ))}
        </div>
        <Comment />
      </div>
    </main>
  );
}
