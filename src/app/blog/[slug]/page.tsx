import { getPostBySlug } from "@/lib/posts";
import PostPage from "@/templates/blog/post-page";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;


  const post = getPostBySlug(slug);
    if (!post) {
      notFound();
    }

  return (
    <div>
        <PostPage post={post} />
    </div>
  );
}