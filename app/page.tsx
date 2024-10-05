import React from "react";

import Card from "@/components/routes/home/Card";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import { votingMethods } from "@/data/votingMethods";

export default async function Page() {
    return (
        <Wrapper>
            <div className="mt-24">
                <H1>Because Voting Matters</H1>
            </div>
            <p>
                Most voting systems in use today are imperfect and often leave people feeling unsatisfied.
                They limit you to casting a single vote, without considering your full preferences.
                Verivote aims to educate people about alternative voting methods, offering a way to explore
                different systems with small polls among friends. It&#39;s a simple, interactive way to learn
                how these alternative voting and counting methods work, providing a more accurate reflection of
                group preferences.
            </p>
            <div className="py-24" id="anchor">
                <div className="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 xl:grid-cols-3">
                    {votingMethods.map((method) => <Card votingMethod={method} key={method.name} />)}
                </div>
            </div>
        </Wrapper>
    );
}
