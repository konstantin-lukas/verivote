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
    dbId: number,
}

export interface CreationFormState {
    method: number,
    name: string,
    date: string,
    needsMajority: boolean,
    options: string[],
}

export interface Poll {
    id: string,
    openUntil: string,
    name: string,
    options: string[],
    majority: boolean,
    method: number,
}

export interface PollSummary {
    name: string,
    method: number,
    voterCount: number,
    winners: number[],
    options: string[],
    results: number[],
    closingDate: string,
}