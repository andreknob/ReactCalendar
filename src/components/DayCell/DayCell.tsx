// import { selectCalendar } from "../../store/slices/calendarSlice";
import useBackgroundColor from "./hooks/useBackgroundColor";
import useDayColor from "./hooks/useDayColor";
import { IDayCellProps } from "./interfaces";
import { Cell } from "./styles";

function DayCell(props: IDayCellProps) {
  // const { currentDate } = useSelector(selectCalendar);
  const { date } = props;
  const dayColor = useDayColor(date);
  const backgroundColor = useBackgroundColor(date);

  return (
    <Cell
      dayColor={dayColor}
      backgroundColor={backgroundColor}
      onClick={() => {}}
    >
      {date.getDate()}
    </Cell>
  );
}

export default DayCell;
