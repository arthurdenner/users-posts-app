import { useCallback, useEffect, useState } from 'react';

export enum Status {
  ERROR,
  LOADING,
  LOADED,
}

function useFetch<T>(fetchFunction: () => Promise<T>, initialState: T) {
  const [status, setStatus] = useState(Status.LOADING);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState<string | undefined>(undefined);

  const memoizedGetCallback = useCallback(() => {
    async function getCallback() {
      try {
        setStatus(Status.LOADING);

        const response = await fetchFunction();

        setStatus(Status.LOADED);
        setData(response);
      } catch (err) {
        setError(err.message);
        setStatus(Status.ERROR);
      }
    }

    getCallback();
  }, [fetchFunction]);

  useEffect(() => {
    memoizedGetCallback();
  }, [memoizedGetCallback]);

  return { data, error, status, runFetch: memoizedGetCallback };
}

export default useFetch;
