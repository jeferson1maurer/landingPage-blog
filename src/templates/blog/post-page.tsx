import { Avatar } from "@/components/avatar";
import { Markdown } from "@/components/markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostShare } from "./components/post-share";

type Props = {
  post: {
    frontmatter: {
      title: string;
      description: string;
      image: string;
      date: string;
      author: {
        name: string;
        avatar: string;
      };
    };
    content: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(params.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function PostPage({ post }: Props) {
  const publishedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "pt-BR",
  );
  const postUrl = `https://site.set/blog/${post}`;

  return (
    <main className="py-20 text-gray-100">
      <div className="container space-y-8 px-4 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-action-sm hover:text-gray-100"
              >
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <span className="text-blue-200 text-action-sm">
                {post.frontmatter.title}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12">
          <article className="bg-gray-600 rounded-lg overflow-hidden border border-gray-400">
            <figure className="relative aspect-16/10 w-full overflow-hidden rounded-lg">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
              />
            </figure>

            <header className="p-4 md:p-6 lg:p-12 pb-0 mt-8 md:mt-12">
              <h1
                className="mb-8 text-balance text-heading-lg md:text-heading-xl 
            lg:text-heading-xl"
              >
                {post.frontmatter.title}
              </h1>

              <Avatar.Container>
                <Avatar.Image
                  src={post.frontmatter.author.avatar}
                  alt={post.frontmatter.author.name}
                  size="sm"
                />
                <Avatar.Content>
                  <Avatar.Title>{post?.frontmatter.author.name}</Avatar.Title>
                  <Avatar.Description>
                    Publicado em{" "}
                    <time dateTime={post.frontmatter.date}>
                      {publishedDate}
                    </time>
                  </Avatar.Description>
                </Avatar.Content>
              </Avatar.Container>
            </header>

            <div className="prose prose-invert max-w-none px-4 mt-12 md:px-6 lg:px-12">
              <Markdown content={post.content} />
            </div>
          </article>

          <PostShare
            url={postUrl}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
          />
        </div>
      </div>
    </main>
  );
}
