import { DAYS_OF_WEEK } from "../../constants";
import { WeekDayCell } from "./styles";

function WeekDaysHeader() {
  return (
    <>
      {DAYS_OF_WEEK.map((WEEK_DAY, index) => (
        <WeekDayCell key={WEEK_DAY} index={index}>
          {WEEK_DAY}
        </WeekDayCell>
      ))}
    </>
  );
}

export default WeekDaysHeader;
