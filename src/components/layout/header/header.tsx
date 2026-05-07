import Link from "next/link";
import { Button } from "../../ui/button";
import {ActiveLink} from "../../active-link";
import {Logo} from "../../logo";

export function Header() {

    return (
        <header className="fixed top-0 z-50 w-full border-b 
        border-white/10 dark:bg-background/95 backdrop-blur 
        dark:supports-backdrop-filters:bg-background/60">
            <div className="mx-auto max-w-7xl px-16 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <nav className="flex items-center gap-6">
                        <ActiveLink href="/">Início</ActiveLink>
                        <ActiveLink href="/blog">Blog</ActiveLink>
                        <Button variant="secondary" asChild>
                            <Link href="/comecar">Começar</Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )    
}