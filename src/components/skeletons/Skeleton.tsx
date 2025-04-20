export default function Skeleton({ className }: { className?: string }) {
    const c = `skeleton${className ? ` ${className}` : ""}`;
    return <div className={c} />;
}
