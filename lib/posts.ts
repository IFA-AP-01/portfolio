import fs from "fs";
import path from "path";
import matter from "gray-matter";
import toml from "toml";
import { remark } from "remark";
// import html from 'remark-html'; // Removed in favor of rehype pipeline
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";

import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function extractTOC(content: string): TOCItem[] {
  const toc: TOCItem[] = [];
  const slugger = new GithubSlugger();

  try {
    const processor = remark().use(remarkGfm);
    const tree = processor.parse(content);

    visit(tree, "heading", (node: any) => {
      const text = toString(node);
      const id = slugger.slug(text);
      const level = node.depth;
      if (level > 2) return;

      toc.push({ id, text, level });
    });
  } catch (e) {
    console.error("Error in extractTOC:", e);
  }

  return toc;
}

const postsDirectory = path.join(process.cwd(), "content");

export interface PostData {
  slug: string;
  title: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  toc: TOCItem[];
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          toml: toml.parse.bind(toml),
        },
        language: "toml",
        delimiters: "+++",
      });

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || "Untitled",
        author: matterResult.data.author || "IFA Team",
        date: matterResult.data.date?.toString() || new Date().toISOString(),
        description: matterResult.data.description || "",
        tags: matterResult.data.tags || [],
        readingTime: calculateReadingTime(matterResult.content),
        toc: extractTOC(matterResult.content),
        ...matterResult.data,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
    delimiters: "+++",
  });

  // Use remark-rehype pipeline to convert markdown to HTML, supporting raw HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    ...matterResult.data,
    slug,
    contentHtml,
    title: matterResult.data.title || "Untitled",
    author: matterResult.data.author || "IFA Team",
    date: matterResult.data.date?.toString() || new Date().toISOString(),
    description: matterResult.data.description || "",
    tags: matterResult.data.tags || [],
    readingTime: calculateReadingTime(matterResult.content),
    toc: extractTOC(matterResult.content),
  };
}
