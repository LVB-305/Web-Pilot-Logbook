export function calculateTimeDifference(start: string, end: string): string {
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  let diffMinutes =
    endHours * 60 + endMinutes - (startHours * 60 + startMinutes);

  // Handle cases where end time is on the next day
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export function calculateHobbsDifference(start: number, end: number): string {
  return (end - start).toFixed(1);
}
