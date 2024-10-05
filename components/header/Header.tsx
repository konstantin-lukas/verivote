"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import resolveConfig from "tailwindcss/resolveConfig";

import MobileMenu from "@/components/header/MobileMenu";
import ThemeToggle from "@/components/header/ThemeToggle";
import BlockButton from "@/components/shared/BlockButton";
import Logo from "@/components/shared/Logo";
import Wrapper from "@/components/shared/Wrapper";
import tailwindConfig from "@/tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default function Header() {
    const { status } = useSession();
    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        setIsDesktop(
            window
                .matchMedia(`(min-width: ${fullConfig.theme.screens.lg}) and (min-height: ${fullConfig.theme.screens.sm})`)
                .matches,
        );
        if (typeof window !== "undefined") {
            const handleChange = (e: MediaQueryListEvent) => {
                setIsDesktop(e.matches);
            };
            window
                .matchMedia(`(min-width: ${fullConfig.theme.screens.lg}) and (min-height: ${fullConfig.theme.screens.sm})`)
                .addEventListener("change", handleChange);
            return window
                .matchMedia(`(min-width: ${fullConfig.theme.screens.lg}) and (min-height: ${fullConfig.theme.screens.sm})`)
                .removeEventListener("change", handleChange);
        }
    }, []);

    if (!isDesktop) return <MobileMenu/>;

    return (
        <header className="relative flex h-header justify-center shadow-header dark:shadow-dark-header">
            <Wrapper>
                <div className="flex h-full items-center justify-between">
                    <nav className="flex h-full items-center">
                        <Link href="/" className="h-10">
                            <Logo className={"h-full w-auto"}/>
                        </Link>
                    </nav>
                    <div className="flex">
                        {
                            status !== "authenticated" || (
                                <nav className="flex items-center">
                                    <ul className="flex">
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
                            )
                        }
                        <ThemeToggle className="mr-8 size-10"/>
                        <BlockButton onClick={status !== "authenticated" ? () => signIn() : () => signOut()}>
                            <span className="flex items-center justify-center">
                                {status !== "authenticated" ? <MdLogin className="inline" size="1rem"/> : <MdLogout className="inline" size="1rem"/>}
                                <span className="ml-1">{status !== "authenticated" ? "Sign In" : "Sign Out"}</span>
                            </span>
                        </BlockButton>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
}