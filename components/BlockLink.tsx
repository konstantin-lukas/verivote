import Link from "next/link";
import React from "react";

export default function BlockLink({ children, href }: {
    children: React.ReactNode,
    href: string,
}) {
    return (
        <Link
            href={href}
            className="group inline-block rounded-full bg-neutral-100 px-5 py-3 font-medium shadow-3d transition-shadow
            hover:shadow-3d-inset dark:bg-neutral-900 dark:shadow-dark-3d dark:hover:shadow-dark-3d-inset"
        >
            <span className="m-0 inline-block font-medium transition-transform group-hover:scale-95">
                {children}
            </span>
        </Link>
    );
}