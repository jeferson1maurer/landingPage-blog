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
import { PostShare } from "@/templates/blog/components/post-share";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

   console.log(posts);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(
    post.frontmatter.date
  ).toLocaleDateString("pt-BR");

  const postUrl = `https://site.set/blog/${slug}`;

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
              <h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl">
                {post.frontmatter.title}
              </h1>

              <Avatar.Container>
                <Avatar.Image
                  src={post.frontmatter.author.avatar}
                  alt={post.frontmatter.author.name}
                  size="sm"
                />

                <Avatar.Content>
                  <Avatar.Title>
                    {post.frontmatter.author.name}
                  </Avatar.Title>

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