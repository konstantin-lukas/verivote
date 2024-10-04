import { useCooldownState as useToggle } from "anzol";
import Link from "next/link";
import type { ReactNode } from "react";
import React, { useRef } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { LuBrush } from "react-icons/lu";
import { MdArrowBack } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";

import BlockLink from "@/components/BlockLink";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

function MenuLink({ href, children, closeMenu }: { href: string, children: string | ReactNode, closeMenu: () => void }) {
    return (
        <li className="group mt-8 flex h-full items-center justify-center first:mt-12">
            <BlockLink
                href={href}
                onClick={closeMenu}
            >
                <div className="transition-all">
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
                        <ul className="flex flex-col items-center">
                            <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/create">
                                <LuBrush className="inline"/> Create
                            </MenuLink>
                            <MenuLink closeMenu={() => forceSetIsOpen(false)} href="/">
                                <HiOutlineCog6Tooth className="inline"/> Manage
                            </MenuLink>
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
                    <div ref={closeIconRef} className="absolute left-0 top-0">
                        <MdArrowBack
                            size="2.5rem"
                            className="fill-[var(--dark-font)] dark:fill-[var(--light-font)]"
                        />
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={!isOpen}
                    timeout={200}
                    nodeRef={openIconRef}
                    classNames="menu-icon-open"
                    unmountOnExit
                >
                    <div ref={openIconRef} className="absolute left-0 top-0">
                        <RiMenu5Fill
                            size="2.5rem"
                            className="fill-[var(--dark-font)] dark:fill-[var(--light-font)]"
                        />
                    </div>
                </CSSTransition>
            </button>
        </div>
    );
}