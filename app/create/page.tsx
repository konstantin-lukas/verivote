import React from "react";

import CreationMenu from "@/components/routes/create/CreationMenu";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";

export default async function Page() {
    return (
        <Wrapper className="flex min-h-[var(--main-height-mobile)] flex-col items-center justify-center desktop:min-h-[var(--main-height)]">
            <H1 style={{ marginTop: "7rem" }}>
                Create a poll
            </H1>
            <CreationMenu/>
        </Wrapper>
    );
}