"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLink = {
  children: React.ReactNode;
} & LinkProps;

export function ActiveLink({ children, href, ...rest }: ActiveLink) {
  const linkPath = (typeof href === "string" ? href : href.pathname) ?? "";
  const pathname = usePathname();
  const isActive =
    pathname === linkPath || pathname?.startsWith(`${linkPath}/`);

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        "text-action-sm transition-colors hover:text-blue-200",
        isActive ? "text-blue-200" : "text-gray-100",
      )}
    >
      {children}
    </Link>
  );
}
