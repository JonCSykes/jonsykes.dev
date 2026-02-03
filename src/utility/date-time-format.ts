export const dateTimeFormat = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const localeDate = new Date(date);
  const fixedLocaleDate = new Date(
    localeDate.getTime() + localeDate.getTimezoneOffset() * 60 * 1000,
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "America/New_York",
    ...options,
  }).format(fixedLocaleDate);

  return formatter;
};
