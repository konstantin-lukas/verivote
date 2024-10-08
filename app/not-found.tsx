import Image from "next/image";
import React from "react";

import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import illustration from "@/public/undraw_page_not_found_re_e9o6.svg";

export default async function NotFound() {
    return (
        <Wrapper>
            <div
                className="flex min-h-[var(--main-height-mobile)] flex-col items-center justify-center text-center
                desktop:min-h-[var(--main-height)]"
            >
                <H1>Page not found</H1>
                <Image src={illustration} alt="Error 404 - Page not found" className="mt-8 w-[50dvmin] select-none" draggable={false} />
            </div>
        </Wrapper>
    );
}
