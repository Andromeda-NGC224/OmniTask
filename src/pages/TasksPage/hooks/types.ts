export interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
