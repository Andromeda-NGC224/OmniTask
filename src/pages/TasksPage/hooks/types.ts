import type { Dispatch, SetStateAction } from 'react';

export interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}
