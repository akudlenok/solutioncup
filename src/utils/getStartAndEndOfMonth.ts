export function getStartAndEndOfMonth(month: number): [Date, Date] {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), month - 1, 1);
  const endOfMonth = new Date(now.getFullYear(), month, 0);
  return [startOfMonth, endOfMonth];
}
