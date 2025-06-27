export const formatColumnTitle = (status: string) => {
  const titleMap: Record<string, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return titleMap[status];
};
