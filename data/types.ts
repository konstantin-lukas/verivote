import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export interface VotingMethod {
    name: string,
    shortDescription: string,
    longDescription: string,
    infoPage: string,
    createPage: string,
    illustration: StaticImageData,
    illustrationAlt: string,
    bestFor: string,
    pros: ReactNode[],
    cons: ReactNode[],
    tag?: string,
    learnMoreLink: string,
}

export interface CreationFormState {
    method: string,
}