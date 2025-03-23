export function dateExtractor(dateString) {
  // Regex to capture YYYY, MM, and DD
  const pattern = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}$/;
  const match = dateString.match(pattern);
  if (match) {
    const [, year, month, day] = match; // Destructure the capture groups
    return `${year}/${month}/${day}`;
  }
  return null;
}
