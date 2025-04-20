export default function ErrorList({ errors, isServerSideError }: { errors: string[]; isServerSideError?: boolean }) {
    const heading = isServerSideError ? "The following server side errors occurred:" : "The following errors occurred:";
    return (
        <div className="text-left">
            <span className="font-bold">{heading}</span>
            <ul className="ml-4 list-disc">
                {errors.map((e, i) => (
                    <li key={i}>{e}.</li>
                ))}
            </ul>
        </div>
    );
}
