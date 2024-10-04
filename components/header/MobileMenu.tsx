import { useCooldownState as useToggle } from "anzol";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import React, { useRef } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { LuBrush } from "react-icons/lu";
import { MdArrowBack, MdLogin, MdLogout } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";

import ThemeToggle from "@/components/header/ThemeToggle";
import BlockButton from "@/components/shared/BlockButton";
import BlockLink from "@/components/shared/BlockLink";
import Logo from "@/components/shared/Logo";

function MenuLink({ href, children, closeMenu }: { href: string, children: ReactNode, closeMenu: () => void }) {
    return (
        <li
            className="group mt-8 flex size-full items-center justify-center first:mt-12 [@media(max-height:400px)]:mt-6
            [@media(max-height:400px)]:first:mt-8"
        >
            <BlockLink
                href={href}
                onClick={closeMenu}
            >
                <div className="flex w-24 items-center justify-center transition-all">
                    {children}
                </div>
            </BlockLink>
        </li>
    );
}

export default function MobileMenu() {
    const [isOpen, setIsOpen, forceSetIsOpen] = useToggle(false, 100);
    const openIconRef = useRef(null);
    const closeIconRef = useRef(null);
    const menuRef = useRef(null);
    const { data: session } = useSession();
    return (
        <div className="z-50">
            <CSSTransition
                in={isOpen}
                timeout={200}
                nodeRef={menuRef}
                classNames="menu"
                unmountOnExit
            >
                <div
                    ref={menuRef}
                    className="fixed left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center bg-neutral-100
                    dark:bg-neutral-900"
                >
                    <Link
                        href="/"
                        onClick={() => forceSetIsOpen(false)}
                    >
                        <Logo className="size-auto h-full w-[60dvmin]"/>
                    </Link>
                    <nav className="w-full">
                        <ul className="flex w-full flex-col items-center">
                            <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/create">
                                <LuBrush className="inline" size="1rem"/>
                                <span className="ml-1">Create</span>
                            </MenuLink>
                            <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/public">
                                <HiOutlineCog6Tooth className="inline" size="1rem"/>
                                <span className="ml-1">Manage</span>
                            </MenuLink>
                            <li className="group mt-8 flex size-full items-center justify-center [@media(max-height:400px)]:mt-6">
                                <BlockButton onClick={!session?.user ? () => signIn() : () => signOut()}>
                                    <span className="flex w-24 items-center justify-center transition-all">
                                        {!session?.user ? <MdLogin className="inline" size="1rem"/> : <MdLogout className="inline" size="1rem"/>}
                                        <span className="ml-1">{!session?.user ? "Sign In" : "Sign Out"}</span>
                                    </span>
                                </BlockButton>
                            </li>
                        </ul>
                    </nav>
                    <div className="absolute right-6 top-6">
                        <ThemeToggle className="size-10"/>
                    </div>
                </div>
            </CSSTransition>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className="fixed left-6 top-6 size-10 rounded-full bg-[var(--hu-blue)]"
            >
                <CSSTransition
                    in={isOpen}
                    timeout={200}
                    nodeRef={closeIconRef}
                    classNames="menu-icon-close"
                    unmountOnExit
                >
                    <span ref={closeIconRef} className="absolute left-0 top-0">
                        <MdArrowBack
                            size="2.5rem"
                            className="fill-[var(--dark-font)] dark:fill-[var(--light-font)]"
                        />
                    </span>
                </CSSTransition>

                <CSSTransition
                    in={!isOpen}
                    timeout={200}
                    nodeRef={openIconRef}
                    classNames="menu-icon-open"
                    unmountOnExit
                >
                    <span ref={openIconRef} className="absolute left-0 top-0">
                        <RiMenu5Fill
                            size="2.5rem"
                            className="fill-[var(--dark-font)] dark:fill-[var(--light-font)]"
                        />
                    </span>
                </CSSTransition>
            </button>
        </div>
    );
}