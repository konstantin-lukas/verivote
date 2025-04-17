import { useCooldownState as useToggle } from "anzol";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import React, { useRef } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { LuBrush } from "react-icons/lu";
import { MdArrowBack, MdLogin, MdLogout, MdOutlinePersonOutline } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";

import ThemeToggle from "@/components/header/ThemeToggle";
import BlockButton from "@/components/shared/BlockButton";
import BlockLink from "@/components/shared/BlockLink";
import Logo from "@/components/shared/Logo";

function MenuLink({
    href,
    children,
    closeMenu,
    testId,
}: {
    href: string;
    children: ReactNode;
    closeMenu: () => void;
    testId?: string;
}) {
    return (
        <li className="group mt-8 flex size-full items-center justify-center first:mt-12 landscape:mt-0 landscape:first:mt-0">
            <BlockLink href={href} onClick={closeMenu} testId={testId}>
                <div className="flex w-24 items-center justify-center transition-all">{children}</div>
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
    const buttonsClass = `landscape:grid-cols-${session ? 2 : 1}`;
    return (
        <header className="relative z-50">
            <CSSTransition in={isOpen} timeout={200} nodeRef={menuRef} classNames="menu" unmountOnExit>
                <div
                    ref={menuRef}
                    className="fixed left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center bg-neutral-100
                    transition-colors dark:bg-neutral-900"
                >
                    <Link href="/" onClick={() => forceSetIsOpen(false)}>
                        <Logo className="size-auto h-full w-[60dvmin]" alt="Navigate to home page" />
                    </Link>
                    <nav className="w-full">
                        <ul
                            className={`flex w-full flex-col items-center landscape:mx-auto landscape:mt-8 
                                landscape:grid landscape:w-96 landscape:gap-6 ${buttonsClass}`}
                        >
                            {session ? (
                                <>
                                    <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/account" testId="account">
                                        <MdOutlinePersonOutline className="inline" size="1rem" />
                                        <span className="ml-1">Account</span>
                                    </MenuLink>
                                    <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/create" testId="poll">
                                        <LuBrush className="inline" size="1rem" />
                                        <span className="ml-1">Create</span>
                                    </MenuLink>
                                    <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/manage" testId="manage">
                                        <HiOutlineCog6Tooth className="inline" size="1rem" />
                                        <span className="ml-1">Manage</span>
                                    </MenuLink>
                                </>
                            ) : (
                                ""
                            )}
                            <li className="group mt-8 flex size-full items-center justify-center landscape:mt-0">
                                <BlockButton onClick={!session ? () => signIn() : () => signOut({ callbackUrl: "/" })}>
                                    <span className="flex w-24 items-center justify-center transition-all">
                                        {!session ? (
                                            <MdLogin className="inline" size="1rem" />
                                        ) : (
                                            <MdLogout className="inline" size="1rem" />
                                        )}
                                        <span className="ml-1">{!session ? "Sign In" : "Sign Out"}</span>
                                    </span>
                                </BlockButton>
                            </li>
                        </ul>
                    </nav>
                    <div className="absolute right-6 top-6">
                        <ThemeToggle className="size-10" />
                    </div>
                </div>
            </CSSTransition>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className="fixed left-6 top-6 size-10"
            >
                <CSSTransition
                    in={isOpen}
                    timeout={200}
                    nodeRef={closeIconRef}
                    classNames="menu-icon-close"
                    unmountOnExit
                >
                    <span ref={closeIconRef} className="absolute left-0 top-0">
                        <MdArrowBack size="2.5rem" className="fill-dark-font dark:fill-light-font" />
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
                        <RiMenu5Fill size="2.5rem" className="fill-dark-font dark:fill-light-font" />
                    </span>
                </CSSTransition>
            </button>
        </header>
    );
}
