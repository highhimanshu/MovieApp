import { useEffect, useState } from "react";

const useDebounce = (search: string, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  return debounceValue;
};

export default useDebounce;
