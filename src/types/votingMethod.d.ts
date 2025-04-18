import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export interface VotingMethodDetails {
    name: string;
    shortDescription: string;
    longDescription: string;
    infoPage: string;
    shorthand: string;
    illustration: StaticImageData;
    illustrationAlt: string;
    bestFor: string;
    pros: ReactNode[];
    cons: ReactNode[];
    tag?: string;
    learnMoreLink: string;
    dbId: number;
}
