const getFirstDateOfMonth = (baseDate: Date) => {
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
};

const getLastDateOfMonth = (baseDate: Date) => {
  return new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
};

const getNumOfDaysInMonth = (baseDate: Date) => {
  return getLastDateOfMonth(baseDate).getDate();
};

const getDatesToFillFirstWeek = (baseDate: Date) => {
  const firstWeekDayOfMonth = getFirstDateOfMonth(baseDate).getDay();

  const previousMonthDate = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() - 1
  );

  const previousMonthDays = new Array(getNumOfDaysInMonth(previousMonthDate))
    .fill(null)
    .map((item, index) => index + 1);

  return previousMonthDays
    .slice(previousMonthDays.length - firstWeekDayOfMonth)
    .map(
      (day) => new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, day)
    );
};

const getFullMonthFromBaseDate = (baseDate: Date) => {
  const numOfDaysInMonth = getNumOfDaysInMonth(baseDate);
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();

  return new Array(numOfDaysInMonth)
    .fill(null)
    .map((item, index) => new Date(baseYear, baseMonth, index + 1));
};

const getDatesToFillLastWeek = (baseDate: Date) => {
  const lastWeekDayOfMonth = getLastDateOfMonth(baseDate).getDay();

  return new Array(6 - lastWeekDayOfMonth)
    .fill(null)
    .map(
      (item, index) =>
        new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, index + 1)
    );
};

export const getCalendarDates = (baseDate: Date) => {
  return [
    ...getDatesToFillFirstWeek(baseDate),
    ...getFullMonthFromBaseDate(baseDate),
    ...getDatesToFillLastWeek(baseDate),
  ];
};

export const compareCalendarDates = (firstDate: Date, secondDate: Date) => {
  return firstDate.toDateString() === secondDate.toDateString();
};

export const sliceYearMonthDay = (date: string) => {
  return date.match(/^[2-9]\d{3}-\d{2}-\d{2}/)?.[0];
};

export const hourFormatConversor24hTo12h = (hour: number) => {
  if (hour < 12) {
    return {
      format: "am",
      hour,
    };
  }

  return {
    format: "pm",
    hour: hour % 12,
  };
};

const DIGITS_IN_HOUR_REGEX = /(\d{1,2}):(\d{2}).{2}/;
const getDigitsInHour = (startTime: string) => {
  return Number(
    startTime.replace(DIGITS_IN_HOUR_REGEX, (_, $1, $2) => `${$1}${$2}`)
  );
};

export const compareStartTimes = (
  firstStartTime: string,
  secondStartTime: string
) => {
  if (firstStartTime.includes("am") && secondStartTime.includes("pm")) {
    return -1;
  } else if (firstStartTime.includes("pm") && secondStartTime.includes("am")) {
    return 1;
  }

  return getDigitsInHour(firstStartTime) - getDigitsInHour(secondStartTime);
};
