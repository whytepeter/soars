import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";

type UseQueryResult<T> = {
  data: T | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

type UseQueryOptions<T> = {
  onSuccess?: (data: T) => void; // Callback for success
  onError?: (error: Error) => void; // Callback for error
};

export function useQuery<T>(
  queryFn: () => Promise<{ data: T }>,
  dependencies: any[] = [],
  options?: UseQueryOptions<T>
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mountedRef = useRef(true);

  const executeQuery = useCallback(async () => {
    setLoading(true);

    try {
      const result = await queryFn();
      if (mountedRef.current) {
        setData(result?.data);
        options?.onSuccess?.(result?.data);
      }
    } catch (err: any) {
      if (mountedRef.current) {
        toast.error(err?.message || "Error occured");
        options?.onError?.(err as Error);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [queryFn]);

  useEffect(() => {
    mountedRef.current = true;
    executeQuery();

    return () => {
      mountedRef.current = false;
    };
  }, dependencies);

  return { data, loading, refetch: executeQuery };
}
