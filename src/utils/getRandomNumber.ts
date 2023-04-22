export function getRandomNumber(min: number = 0, max: number = 99): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
