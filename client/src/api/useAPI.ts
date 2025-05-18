import { useAuth } from "@/providers/AuthProvider";
import { ApiOptions, Headers } from "@/types";
import { useEffect, useState } from "react";

const useAPI = <T>(
  url: string,
  options: ApiOptions | undefined = undefined,
) => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const headers: Headers = {
          "Content-Type": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const mergedOptions = {
          headers,
          ...options,
        };
        const response = await fetch(`/api${url}`, mergedOptions);
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) setError(error);
        else throw Error("Unknown error while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url, options]);

  return { data, error, loading };
};

export default useAPI;
