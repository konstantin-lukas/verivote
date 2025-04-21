import getConfig from "next/config";
import Link from "next/link";

const { publicRuntimeConfig } = getConfig();

export default function Footer() {
    return (
        <footer className="h-footer-height flex items-center justify-center gap-6">
            <Link href="/legal-notice" className="inline-link">
                Legal notice
            </Link>
            <Link href="/privacy-policy" className="inline-link">
                Privacy policy
            </Link>
            <Link href={process.env.NEXT_PUBLIC_REPO!} className="inline-link" target="_blank">
                Version {publicRuntimeConfig?.version}
            </Link>
        </footer>
    );
}
