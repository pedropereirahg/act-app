import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

export default function useSearch(
  initialValue: null | string,
  onChange?: (callback: () => void) => void
): [null | string, NextRouter] {
  const [query, setQuery] = useState<null | string>(initialValue);
  const router: NextRouter = useRouter();

  useEffect(() => {
    const { query: newQuery } = router.query;
    if (router.isReady && query !== newQuery) {
      const callback = () => setQuery(typeof newQuery === 'string' ? newQuery : '');
      if (typeof onChange === 'function') {
        onChange(callback)
      } else {
        callback()
      }
    }
  }, [router.query]);

  return [query, router];
}
