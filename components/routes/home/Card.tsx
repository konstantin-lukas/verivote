import React from "react";

import H2 from "@/components/shared/H2";

export default function Card({ heading, children }: {
    heading: string,
    children: string,
}) {
    return (
        <div>
            <H2>
                {heading}
            </H2>
            <p>
                {children}
            </p>
        </div>
    );
}