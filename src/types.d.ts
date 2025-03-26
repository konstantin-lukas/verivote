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

type Success<T> = [data: T, error: null];

type Failure<E> = [data: null, error: E];

export type Result<T, E = Error> = Success<T> | Failure<E>;

export type ActionResult = Promise<[ok: boolean, message: string]>;
