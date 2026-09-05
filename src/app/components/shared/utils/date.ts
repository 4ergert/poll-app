export function getEndsInDays(endDate: Date | string): number {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - now.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
