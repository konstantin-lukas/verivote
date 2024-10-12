import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export interface VotingMethod {
    name: string,
    shortDescription: string,
    longDescription: string,
    infoPage: string,
    shorthand: string,
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
    name: string,
    date: string,
    needsMajority: boolean,
    options: string[],
}

export interface Poll {
    Id: string,
    OpenUntil: string,
    Name: string,
    Options: string[],
    Majority: boolean,
    Method: string,
}