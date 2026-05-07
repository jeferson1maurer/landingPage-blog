import { Avatar } from "@/components/avatar";
import { Markdown } from "@/components/markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const post = getPostBySlug(params.slug as string);

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

  const { shareButtons } = useShare({
    url: postUrl,
    title: post.frontmatter.title,
    text: post.frontmatter.description,
  });

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

            <div className="prose prove-invert max-w-none px-4 mt-12 md:px-6 lg:px-12">
              <Markdown content={post.content} />
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-lg bg-gray-700">
              <h2 className="hidden md:block mb-4 text-heading-xs text-gray-100">
                Compartilhar
              </h2>

              <div className="flex justify-between md:flex-col gap-2">
                {shareButtons.map((provider) => (
                  <Button
                    key={provider.provider}
                    onClick={() => provider.action()}
                    variant="outline"
                    className="w-fit md:w-full justify-start gap-2"
                  >
                    {provider.icon} 
                    <span className="hidden md:block">
                      {provider.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
