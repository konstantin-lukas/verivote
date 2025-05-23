"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdLogin, MdLogout } from "react-icons/md";

import BlockButton from "@/components/interaction/BlockButton";
import ThemeToggle from "@/components/interaction/ThemeToggle";
import Wrapper from "@/components/layout/Wrapper";
import Logo from "@/components/misc/Logo";
import MobileMenu from "@/components/navigation/MobileMenu";

export default function Header({ signedIn }: { signedIn: boolean }) {
    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        setIsDesktop(window.matchMedia(`(min-width: 64rem) and (min-height: 40rem)`).matches);
        if (typeof window !== "undefined") {
            const handleChange = (e: MediaQueryListEvent) => {
                setIsDesktop(e.matches);
            };
            window.matchMedia(`(min-width: 64rem) and (min-height: 40rem)`).addEventListener("change", handleChange);
            return window
                .matchMedia(`(min-width: 64rem) and (min-height: 40rem)`)
                .removeEventListener("change", handleChange);
        }
    }, []);

    if (!isDesktop) return <MobileMenu />;

    const navigation = signedIn && (
        <nav className="flex items-center" aria-label="Main site navigation">
            <ul className="flex">
                <li className="leading-none">
                    <Link href="/account" className="inline-link mr-8">
                        Account
                    </Link>
                </li>
                <li className="leading-none">
                    <Link href="/create" className="inline-link mr-8">
                        Create
                    </Link>
                </li>
                <li className="leading-none">
                    <Link href="/manage" className="inline-link mr-8">
                        Manage
                    </Link>
                </li>
            </ul>
        </nav>
    );

    const signInOutButton = (
        <BlockButton onClick={signedIn ? () => signOut({ callbackUrl: "/" }) : () => signIn()}>
            <span className="flex items-center justify-center">
                {signedIn ? <MdLogout className="inline" size="1rem" /> : <MdLogin className="inline" size="1rem" />}
                <span className="ml-1" data-test-id="sign-in-out-button-text">
                    {signedIn ? "Sign Out" : "Sign In"}
                </span>
            </span>
        </BlockButton>
    );

    const themeToggle = <ThemeToggle className="mr-8 size-10" />;

    const verivoteLogo = (
        <nav className="flex h-full items-center" aria-label="Home navigation">
            <Link href="/" className="h-10">
                <Logo className="h-full w-auto" alt="Navigate to home page" />
            </Link>
        </nav>
    );

    return (
        <header className="h-header-height shadow-header dark:shadow-dark-header fixed left-0 top-0 z-50 flex w-full justify-center bg-neutral-100 transition-all dark:bg-neutral-900">
            <Wrapper>
                <div className="flex h-full items-center justify-between">
                    {verivoteLogo}
                    <div className="flex">
                        {navigation}
                        {themeToggle}
                        {signInOutButton}
                    </div>
                </div>
            </Wrapper>
        </header>
    );
}
