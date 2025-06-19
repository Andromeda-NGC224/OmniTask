import { useCallback, useRef } from 'react';
import type { UseInfiniteScrollProps } from './types';

export const useInfiniteScroll = ({
  loading,
  hasMore,
  setPage,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback<(node: HTMLDivElement | null) => void>(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 },
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage],
  );

  return { lastElementRef };
};
