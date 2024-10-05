import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    if (!/^\d+$/.test(id)) notFound();
    return <>Poll: {id}</>;
}