import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import { MdArrowForward } from "react-icons/md";

import BlockLink from "@/components/shared/BlockLink";
import H2 from "@/components/shared/H2";

export default function Card({ heading, children, href, bestFor, tag, illustration, illustrationAlt }: {
    heading: string,
    children: string,
    href: string,
    bestFor: string,
    tag?: string,
    illustration: StaticImageData,
    illustrationAlt: string,
}) {
    const tagClass = tag ? `after:content-['${tag.replaceAll(" ", "_")}']` : "";
    return (
        <div className="flex flex-col justify-between">
            <div>
                <div
                    className={tag && `relative inline-block after:absolute ${tagClass}
                        after:left-0 after:top-0 after:translate-y-[calc(-100%-1rem)] after:rounded-full after:bg-red-600
                        after:px-2 after:text-[0.8rem] after:text-white`}
                >
                    <H2>
                        {heading}
                    </H2>
                </div>
                <p className="mb-6">
                    {children}
                </p>
                <div className="mb-6 flex justify-center">
                    <Image
                        src={illustration}
                        alt={illustrationAlt}
                        className="w-full select-none pr-8 sm:w-8/12 md:w-full"
                        draggable={false}
                        priority
                    />
                </div>
            </div>
            <div>
                <p>
                    <b className="font-bold">Best for:</b> {bestFor}
                </p>
                <BlockLink href={href} className="mt-8 flex justify-center">
                    <MdArrowForward className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Learn more</span>
                </BlockLink>
            </div>
        </div>
    );
}