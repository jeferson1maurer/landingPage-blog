import { BlogList } from "@/templates/blog";
import { getAllPosts, Post } from '@/lib/posts'
import { GetStaticProps } from "next";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function BlogPage({posts}: Props) {
    return (
        <BlogList posts={posts}/>
    )
}

