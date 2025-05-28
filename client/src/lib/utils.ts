import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOverdue(date: string | null) {
  if (!date) return false;
  const inputDate = new Date(date);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
}

export function isDueToday(date: string | null) {
  if (!date) return false;
  const today = new Date();
  const inputDate = new Date(date);

  return today.toDateString() === inputDate.toDateString();
}
