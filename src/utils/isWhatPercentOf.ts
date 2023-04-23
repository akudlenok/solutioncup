export function isWhatPercentOf(num1: number, num2: number): number {
  if (num2 === 0) {
    return 0;
  }

  return Math.floor((num1 / num2) * 100);
}
