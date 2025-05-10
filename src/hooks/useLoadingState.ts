import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

import { LoadingStateContext } from "@/contexts";

export default function useLoadingState() {
    const { isLoading, setIsLoading } = useContext(LoadingStateContext);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams, setIsLoading]);
    return { isLoading, setIsLoading };
}
