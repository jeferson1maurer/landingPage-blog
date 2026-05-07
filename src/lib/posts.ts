import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

type Input = {
  content: string;
  data?: any; // ou especifique o tipo de `data` se ele tiver uma estrutura específica
};

type Frontmatter = {
  title: string;
  description: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(fullPath, "utf-8");

      const { data } = matter(fileContent);
      const frontmatter = data as Frontmatter;

      return {
        slug,
        ...frontmatter,
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        author: {
          name: data.author?.name || "",
          avatar: data.author?.avatar || "",
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(
  slug: string
):
  | {
      frontmatter: Frontmatter;
      content: string;
    }
  | null {

  if (!slug) return null;

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as Frontmatter,
    content,
  };
}