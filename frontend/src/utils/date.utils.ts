export function convertUnixStringToDate(unix: string) {
  return new Date(Number(unix) * 1000);
}
