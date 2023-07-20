export function getReadableDate(createdAt: string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(createdAt);

  return date.toLocaleDateString('fa-IR', options);
}