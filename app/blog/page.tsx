import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const metadata = {
  title: "Blog | IFA Team",
  description: "Read our latest articles and updates.",
};

const POSTS_PER_PAGE = 4;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const allPostsData = getSortedPostsData();

  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPostsData.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <main className="flex flex-col items-center px-4 py-28 min-h-screen">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {currentPosts.map(({ slug, date, title, description, tags }) => (
            <Link key={slug} href={`/blog/${slug}`} className="group h-full">
              <article className="h-full neo-card p-6 flex flex-col justify-between transition-transform duration-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#404040]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-mono font-bold border-2 border-black px-2 py-0.5 bg-purple-300 text-black">
                      {new Date(date).toISOString().split("T")[0]}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black mb-3 group-hover:underline decoration-4 underline-offset-4 decoration-yellow-400">
                    {title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags &&
                    tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold px-2 py-1 border-2 border-black bg-white dark:bg-black dark:text-white"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            {currentPage > 1 ? (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="neo-button flex items-center gap-2 bg-white hover:bg-yellow-200"
              >
                <FaArrowLeft /> Previous
              </Link>
            ) : (
              <button
                disabled
                className="neo-button flex items-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400 shadow-none"
              >
                <FaArrowLeft /> Previous
              </button>
            )}

            <span className="font-bold text-lg">
              {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="neo-button flex items-center gap-2 bg-white hover:bg-yellow-200"
              >
                Next <FaArrowRight />
              </Link>
            ) : (
              <button
                disabled
                className="neo-button flex items-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed border-gray-400 shadow-none"
              >
                Next <FaArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
