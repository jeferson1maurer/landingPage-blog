'use client';
import { Search } from "@/components/search";
import { PostCard } from "./components/post-card";
import { PostGridCard } from "./components/post-grid-card";
import { Inbox } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Post = {
    slug: string;
    title: string;
    description: string;
    image: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
}

type Props = {
    posts: Post[];
}

export function BlogList({ posts }: Props) {
    const searchParams = useSearchParams();
    const query = searchParams?.get("q") || "";

    const pageTitle = query
        ? `Resultados de busca para: "${query}"`
        : 'Dicas e estratégias para impulsionar o seu negócio';

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );


    

    return (
        <div className="flex flex-col py-24 grow h-full">
            <header className="pb-14">
                <div className="container space-y-6 flex flex-col items-start justify-between 
                md:flex-row md:items-end lg:items-end">
                    <div className="flex flex-col gap-4 md:px-0">
                        {/* TAG */}
                        <span className="text-body-tag text-cyan-100 bg-cyan-300 w-fit py-1.5 px-3 rounded-sm 
                        text-center md:text-left">BLOG</span>

                        {/* Titulo */}
                        <h1 className="text-balance text-start md:text-left text-heading-lg md:text-heading-xl
                        max-w-2xl text-gray-100">{pageTitle}</h1>
                    </div>
                    {/* Search */}
                    <Search />
                </div>
            </header>
           
           {/* Listagem de posts */}
           <PostGridCard>
                {filteredPosts.length > 0 ? (filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug} 
              title={post.title}
              description={post.description}
              image={post.image}
              date={new Date(post.date).toLocaleDateString('pt-BR')}
              author={post.author}
            />
          ))
        ) : (
            <div className="flex flex-col items-center justify-center gap-8 border-dashed border-2
            border-gray-300 p-8 md:p-12 rounded-lg">
                <Inbox className="text-cyan-100 h-12 w-12"/>
                <p className="text-gray-300 text-center">Nenhum post encontrado.</p>
          </div>
        )}
           </PostGridCard>
        </div>
    )
}