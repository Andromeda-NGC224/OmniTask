export const formatColumnTitle = (
  status: string,
  t: (key: string) => string,
) => {
  const titleMap: Record<string, string> = {
    pending: 'chips.pending',
    in_progress: 'chips.inProgress',
    completed: 'chips.completed',
  };

  return t(titleMap[status]);
};
