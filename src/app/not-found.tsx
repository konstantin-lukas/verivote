import Image from "next/image";
import React from "react";

import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
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
