import React from "react";
import {Header} from "./header";
import {Footer} from "./footer";
import { Inter, PT_Sans_Caption } from "next/font/google";
import { CallToAction } from "@/templates/landing-page/sections";

type LayoutProps = {
    children: React.ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500']
})

const ptSansCaption = PT_Sans_Caption({
    subsets: ['latin'],
    variable: '--font-caption',
    weight: "700"
})

export function Layout({ children } : LayoutProps) {
    return (
        <div className={`${inter.variable} ${ptSansCaption.variable} relative flex min-h-screen flex-col bg-gray-700 font-sans`}>
            <Header />
            <main className="flex flex-col flex-1 mt-10 mb-12">
                {children}
            </main>
            <CallToAction />
            <Footer />
        </div>
    )
}