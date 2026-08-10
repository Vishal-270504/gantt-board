export interface FormatDateOptions {
  dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY';
  timeFormat?: '12-hour' | '24-hour';
  showTime?: boolean;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDatePart(date: Date, format: FormatDateOptions['dateFormat']): string {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD MMM YYYY':
      return `${day} ${monthShort} ${year}`;
    default:
      return `${day} ${monthShort} ${year}`;
  }
}

function formatTimePart(date: Date, format: FormatDateOptions['timeFormat']): string {
  const hours = date.getHours();
  const minutes = pad(date.getMinutes());

  if (format === '12-hour') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${pad(h)}:${minutes} ${period}`;
  }

  return `${pad(hours)}:${minutes}`;
}

export function formatDate(
  isoString: string,
  options: FormatDateOptions = {}
): string {
  if (!isoString) return '';

  const {
    dateFormat = 'DD MMM YYYY',
    timeFormat = '24-hour',
    showTime = true,
  } = options;

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const datePart = formatDatePart(date, dateFormat);

  if (!showTime) return datePart;

  const timePart = formatTimePart(date, timeFormat);
  return `${datePart} ${timePart}`;
}

export default formatDate;