export function isValidDate(d: any) {
  return !isNaN(d) && d instanceof Date;
}

export function getAge(d1: Date) {
  const d2: Date = new Date();
  const diff = d2.getTime() - d1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function diffYears(d1: Date) {
  const d2: Date = new Date();
  const diff = d2.getTime() - d1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
