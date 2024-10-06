import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="flex justify-center gap-6 py-4">
            <Link href="/legal-notice" className="inline-link">Legal notice</Link>
            <Link href="/privacy-policy" className="inline-link">Privacy policy</Link>
        </footer>
    );
}