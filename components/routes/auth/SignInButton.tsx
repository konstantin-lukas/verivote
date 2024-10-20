"use client";

import { signIn } from "next-auth/react";
import type { ReactNode } from "react";
import React from "react";

import ButtonLink from "@/components/shared/BlockButton";

export default function SignInButton({ serviceName, children }: { serviceName: string, children: ReactNode }) {
    return (
        <ButtonLink onClick={() => signIn(serviceName)} className="mt-6 flex translate-y-[-0.1rem] flex-row items-center justify-center">
            {children}
        </ButtonLink>
    );
}