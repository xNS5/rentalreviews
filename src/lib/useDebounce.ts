import { useEffect, useCallback, DependencyList} from 'react';

export function useDebounce(effect: any, dependencies: DependencyList, delay: number) {
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
}