export function getFormatDate(date: Date): string {
  const { year, month, day } = parseDate(date);
  return `${year}-${month}-${day}`;
}

export function getFormatDateRu(date: Date | string): string {
  const { year, month, day } = parseDate(date);
  return `${day}.${month}.${year}`;
}

const parseDate = (arg: string | Date) => {
  const date: Date =
    typeof arg === 'string' ? new Date(new Date(arg.toString()).toISOString().split('T')[0]) : new Date(arg.toString());

  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();

  const hours = converter(date.getHours());
  const minutes = converter(date.getMinutes());
  return { day, month, year, hours, minutes };
};

const converter = (num: number) => {
  return num < 10 ? `0${num}` : num;
};
