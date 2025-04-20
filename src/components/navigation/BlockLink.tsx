import Link from "next/link";

export default function BlockLink({
    children,
    href,
    className,
    onClick,
    target,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
    target?: string;
}) {
    return (
        <Link
            href={href}
            className={`shadow-3d hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both group block rounded-full bg-neutral-100 px-10 py-2 font-medium transition-all dark:bg-neutral-900 ${className ?? ""}`}
            onClick={onClick}
            target={target}
        >
            <span className="m-0 inline-block font-medium transition-transform group-hover:scale-95">{children}</span>
        </Link>
    );
}
