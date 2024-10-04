import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
    const session = await getServerSession();
    if (!session?.user) {
        redirect("/api/auth/signin");
    }
    return <>Manage</>;
}