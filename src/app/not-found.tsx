import Image from "next/image";
import React from "react";

import Wrapper from "@/components/layout/Wrapper";
import H1 from "@/components/typography/H1";
import illustration from "@/public/undraw_page_not_found_re_e9o6.svg";

export default async function NotFound() {
    return (
        <Wrapper>
            <div className="desktop:min-h-main-height flex flex-col items-center justify-center text-center">
                <H1>Page not found</H1>
                <Image src={illustration} alt="" className="mt-8 w-[50dvmin] select-none" draggable={false} priority />
            </div>
        </Wrapper>
    );
}
