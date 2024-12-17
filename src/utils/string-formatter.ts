export const getInitials = (input: string): string => {
  return input
    .split(' ')
    .map((word) => word[0])
    .join('');
};
