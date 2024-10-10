import React from "react";

import CreationForm from "@/components/form/CreationForm";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import { votingMethods } from "@/data/votingMethods";

export default async function Page({ searchParams }: { searchParams:{ type?:string }}) {
    return (
        <Wrapper className="flex min-h-[var(--main-height-mobile)] flex-col items-center justify-center desktop:min-h-[var(--main-height)]">
            <H1 style={{ marginTop: "7rem" }}>
                Create a poll
            </H1>
            <CreationForm defaultMethod={votingMethods.find(m => m.shorthand === searchParams.type)?.name}/>
        </Wrapper>
    );
}