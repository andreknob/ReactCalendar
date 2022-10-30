import { useSelector } from "react-redux";

import { MONTHS } from "../../constants";
import { selectCalendar } from "../../store/slices/calendarSlice";
import Button from "../Button";
import { Container, RoundedButton } from "./styles";

const CalendarHeader = () => {
  const { selectedMonthDate } = useSelector(selectCalendar);

  return (
    <Container>
      <Button color={"black"}>Today</Button>
      <RoundedButton margin="0 0 0 64px">{"<"}</RoundedButton>
      <RoundedButton margin="0 8px 0 0">{">"}</RoundedButton>
      <h1>
        {MONTHS[selectedMonthDate.getMonth()]},{" "}
        {selectedMonthDate.getFullYear()}
      </h1>
      <RoundedButton margin="0 0 0 8px">{"<"}</RoundedButton>
      <RoundedButton>{">"}</RoundedButton>
    </Container>
  );
};

export default CalendarHeader;
