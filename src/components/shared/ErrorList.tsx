import React from "react";

export default function ErrorList({ errors }: { errors: string[] }) {
    return (
        <div className="text-left">
            <span className="font-bold">The following errors occurred:</span>
            <ul className="ml-4 list-disc">
                {errors.map((e, i) => (
                    <li key={i}>{e}.</li>
                ))}
            </ul>
        </div>
    );
}
