export function getEndsInDays(endDate: Date | string): number {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - now.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isSurveyActive(endDate: Date | string, now = new Date()): boolean {
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  return end.getTime() >= now.getTime();
}
