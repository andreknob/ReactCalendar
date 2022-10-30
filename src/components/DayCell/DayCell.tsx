// import { selectCalendar } from "../../store/slices/calendarSlice";
import Day from "./components/Day/Day";
import useBackgroundColor from "./hooks/useBackgroundColor";
import { IDayCellProps } from "./interfaces";
import { Cell } from "./styles";

function DayCell({ date }: IDayCellProps) {
  // const { selectedMonthDate } = useSelector(selectCalendar);
  const backgroundColor = useBackgroundColor(date);

  return (
    <Cell backgroundColor={backgroundColor} onClick={() => {}}>
      <Day date={date} />
    </Cell>
  );
}

export default DayCell;
