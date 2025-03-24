"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdLogin, MdLogout } from "react-icons/md";

import MobileMenu from "@/components/header/MobileMenu";
import ThemeToggle from "@/components/header/ThemeToggle";
import BlockButton from "@/components/shared/BlockButton";
import Logo from "@/components/shared/Logo";
import Wrapper from "@/components/shared/Wrapper";

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

    const signedInComponents = signedIn && (
        <nav className="flex items-center">
            <ul className="flex">
                <li className="leading-none">
                    <Link href="/account" className="inline-link mr-8" data-cy="account">
                        Account
                    </Link>
                </li>
                <li className="leading-none">
                    <Link href="/create" className="inline-link mr-8" data-cy="poll">
                        Create
                    </Link>
                </li>
                <li className="leading-none">
                    <Link href="/manage" className="inline-link mr-8" data-cy="manage">
                        Manage
                    </Link>
                </li>
            </ul>
        </nav>
    );

    return (
        <header className="relative flex h-header-height justify-center bg-neutral-100 shadow-header transition-all dark:bg-neutral-900 dark:shadow-dark-header">
            <Wrapper>
                <div className="flex h-full items-center justify-between">
                    <nav className="flex h-full items-center">
                        <Link href="/" className="h-10">
                            <Logo className="h-full w-auto" alt="Navigate to home page" />
                        </Link>
                    </nav>
                    <div className="flex">
                        {signedInComponents}
                        <ThemeToggle className="mr-8 size-10" />
                        <BlockButton onClick={signedIn ? () => signOut({ callbackUrl: "/" }) : () => signIn()}>
                            <span className="flex items-center justify-center">
                                {signedIn ? (
                                    <MdLogout className="inline" size="1rem" />
                                ) : (
                                    <MdLogin className="inline" size="1rem" />
                                )}
                                <span className="ml-1">{signedIn ? "Sign Out" : "Sign In"}</span>
                            </span>
                        </BlockButton>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
}
