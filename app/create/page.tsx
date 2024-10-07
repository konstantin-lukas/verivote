import React from "react";

import CreationMenu from "@/components/routes/create/CreationMenu";
import Wrapper from "@/components/shared/Wrapper";

export default async function Page() {
    return (
        <Wrapper className="flex min-h-[var(--main-height-mobile)] justify-center desktop:min-h-[var(--main-height)]">
            <CreationMenu/>
        </Wrapper>
    );
}