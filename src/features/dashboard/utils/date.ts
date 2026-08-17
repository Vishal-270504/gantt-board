export interface FormatDateOptions {
  dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY' | 'MMM DD, YYYY' | 'YYYY/MM/DD' | 'DD.MM.YYYY' | 'MM.MM.YYYY' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'DD/MM/YY' | 'MM/DD/YY' | 'MMM DD YYYY' | 'DD MMM, YYYY' | 'YYYY MMM DD' | 'DD MMMM YYYY' | 'MMMM DD, YYYY' | 'YYYYMMDD' | 'YYYY/DD/MM' | 'YYYY-DD-MM' | 'YYYY.MM.DD' | 'DD.MM.YY' | 'YY-MM-DD' | 'DD-MMMM-YYYY' | 'MMMM D, YYYY' | 'MMM D, YYYY' | 'DD MMMM' | 'MMMM YYYY' | 'MMM YYYY' | 'DD-MM-YY' | 'MM-DD-YY' | 'D MMM YYYY' | 'MMMM D YYYY';
  timeFormat?: '12-hour' | '24-hour';
  showTime?: boolean;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDatePart(date: Date, format: FormatDateOptions['dateFormat']): string {
  const day = pad(date.getDate());
  const d = date.getDate();
  const month = pad(date.getMonth() + 1);
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
  const monthLong = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const yearShort = String(year).slice(2);

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD MMM YYYY':
      return `${day} ${monthShort} ${year}`;
    case 'MMM DD, YYYY':
      return `${monthShort} ${day}, ${year}`;
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'DD.MM.YYYY':
      return `${day}.${month}.${year}`;
    case 'MM.MM.YYYY':
      return `${month}.${day}.${year}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'MM-DD-YYYY':
      return `${month}-${day}-${year}`;
    case 'DD/MM/YY':
      return `${day}/${month}/${yearShort}`;
    case 'MM/DD/YY':
      return `${month}/${day}/${yearShort}`;
    case 'MMM DD YYYY':
      return `${monthShort} ${day} ${year}`;
    case 'DD MMM, YYYY':
      return `${day} ${monthShort}, ${year}`;
    case 'YYYY MMM DD':
      return `${year} ${monthShort} ${day}`;
    case 'DD MMMM YYYY':
      return `${day} ${monthLong} ${year}`;
    case 'MMMM DD, YYYY':
      return `${monthLong} ${day}, ${year}`;
    case 'YYYYMMDD':
      return `${year}${month}${day}`;
    case 'YYYY/DD/MM':
      return `${year}/${day}/${month}`;
    case 'YYYY-DD-MM':
      return `${year}-${day}-${month}`;
    case 'YYYY.MM.DD':
      return `${year}.${month}.${day}`;
    case 'DD.MM.YY':
      return `${day}.${month}.${yearShort}`;
    case 'YY-MM-DD':
      return `${yearShort}-${month}-${day}`;
    case 'DD-MMMM-YYYY':
      return `${day}-${monthLong}-${year}`;
    case 'MMMM D, YYYY':
      return `${monthLong} ${d}, ${year}`;
    case 'MMM D, YYYY':
      return `${monthShort} ${d}, ${year}`;
    case 'DD MMMM':
      return `${day} ${monthLong}`;
    case 'MMMM YYYY':
      return `${monthLong} ${year}`;
    case 'MMM YYYY':
      return `${monthShort} ${year}`;
    case 'DD-MM-YY':
      return `${day}-${month}-${yearShort}`;
    case 'MM-DD-YY':
      return `${month}-${day}-${yearShort}`;
    case 'D MMM YYYY':
      return `${d} ${monthShort} ${year}`;
    case 'MMMM D YYYY':
      return `${monthLong} ${d} ${year}`;
    default:
      throw new Error('Invalid date format');
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