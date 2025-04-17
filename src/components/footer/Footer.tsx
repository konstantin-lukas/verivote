import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="h-footer-height flex items-center justify-center gap-6">
            <Link href="/legal-notice" className="inline-link">
                Legal notice
            </Link>
            <Link href="/privacy-policy" className="inline-link">
                Privacy policy
            </Link>
        </footer>
    );
}
