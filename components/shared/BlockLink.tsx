import Link from "next/link";
import React from "react";

export default function BlockLink({ children, href, className, onClick }: {
    children: React.ReactNode,
    href: string,
    className?: string,
    onClick?: () => void
}) {
    return (
        <Link
            href={href}
            className={`group inline-block rounded-full bg-neutral-100 px-10 py-2
                font-medium shadow-3d transition-shadow hover:shadow-3d-both dark:bg-neutral-900 dark:shadow-dark-3d 
                dark:hover:shadow-dark-3d-both ${className ?? ""}`}
            onClick={onClick}
        >
            <span className="m-0 inline-block font-medium transition-transform group-hover:scale-95">
                {children}
            </span>
        </Link>
    );
}