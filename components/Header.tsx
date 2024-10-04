"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import resolveConfig from "tailwindcss/resolveConfig";

import BlockButton from "@/components/BlockButton";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";
import Wrapper from "@/components/Wrapper";
import tailwindConfig from "@/tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default function Header() {
    const { data: session } = useSession();
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
        <header className="flex h-[var(--header-height)] justify-center shadow-header dark:shadow-dark-header">
            <Wrapper>
                <div className="flex h-full items-center justify-between">
                    <nav className="flex h-full items-center">
                        <Link href="/" className="h-10">
                            <Logo className={"h-full w-auto"}/>
                        </Link>
                    </nav>
                    <div className="flex">
                        {
                            !session?.user || (
                                <nav className="flex items-center">
                                    <ul className="flex">
                                        <li className="leading-none">
                                            <Link href="/create" className="inline-link mr-8">
                                                Create
                                            </Link>
                                        </li>
                                        <li className="leading-none">
                                            <Link href="/" className="inline-link mr-8">
                                                Manage
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            )
                        }
                        <ThemeToggle className="mr-8 size-10"/>
                        <BlockButton onClick={!session?.user ? () => signIn() : () => signOut()}>
                            <span className="flex items-center justify-center">
                                {!session?.user ? <MdLogin className="inline"/> : <MdLogout className="inline"/>}
                                <span className="ml-1">{!session?.user ? "Sign In" : "Sign Out"}</span>
                            </span>
                        </BlockButton>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
}