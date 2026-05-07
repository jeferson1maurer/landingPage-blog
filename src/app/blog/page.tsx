import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/templates/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas e estratégias para impulsionar o seu negócio",
  robots: "index, follow",
  openGraph: {
    title: "Blog",
    description: "Dicas e estratégias para impulsionar o seu negócio",
    url: "https://landing-page-blog-ten.vercel.app/og-image.jpg",
    siteName: "Site.Set",
    locale: "pt_BR",
    type: "website",    
    images: [
      {
        url: "https://landing-page-blog-ten.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Site.Set",
      },
    ],
  },
};

export default function BlogListPage() {
    const sortedPosts = getAllPosts();

    return (
        <BlogList posts={sortedPosts} />
    );
}