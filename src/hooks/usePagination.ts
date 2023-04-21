import { useMemo, useState } from 'react';
import { DEFAULT_SIZE_PAGE } from 'constants/filter';

export function usePagination(defaultSize = DEFAULT_SIZE_PAGE, defaultPage = 1) {
  const [page, setPage] = useState<number>(defaultPage);
  const [size, setSize] = useState<number>(defaultSize);
  return useMemo(() => ({ page, size, setPage, setSize }), [page, size, setPage, setSize]);
}
