export const padDigits = (number, digits = 2) => {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
};

export const secondsToTime = secs => {
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
};
