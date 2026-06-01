export function parseLocalDate(str: string): Date {
  const datePart = str.includes("T") ? str.split("T")[0] : str;
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toLocalDateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
