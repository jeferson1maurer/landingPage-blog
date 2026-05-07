import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/templates/blog";

export default function BlogListPage() {
    const sortedPosts = getAllPosts();

    return (
        <BlogList posts={sortedPosts} />
    );
}