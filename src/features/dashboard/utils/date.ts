export function formatDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const dateStr = date.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return `${dateStr} ${timeStr}`;
}
