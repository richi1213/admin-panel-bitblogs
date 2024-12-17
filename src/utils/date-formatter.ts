import dayjs from 'dayjs';

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  return dayjs(dateString).format('YYYY-MM-DD HH:mm');
};
