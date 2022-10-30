import { useDispatch } from "react-redux";

import { openModal } from "../../store/slices/calendarSlice";
import Day from "./components/Day/Day";
import useBackgroundColor from "./hooks/useBackgroundColor";
import { IDayCellProps } from "./interfaces";
import { Cell } from "./styles";

const DayCell = ({ date }: IDayCellProps) => {
  const backgroundColor = useBackgroundColor(date);
  const dispatch = useDispatch();

  return (
    <Cell
      backgroundColor={backgroundColor}
      onClick={() => dispatch(openModal(date.toJSON()))}
    >
      <Day date={date} />
    </Cell>
  );
};

export default DayCell;
