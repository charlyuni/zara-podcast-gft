const MILLISECONDS_IN_SECOND = 1000;
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const slicer = (value: number): string => ("0" + value).slice(-2);

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-ES");
};

export const formatMilliseconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / MILLISECONDS_IN_SECOND);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${slicer(minutes)}:${slicer(seconds)}`;
};

