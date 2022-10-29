import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  selectCalendar,
} from "../../store/slices/calendarSlice";

function Calendar(props) {
  const { count } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>Calendar</h1>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
}

export default Calendar;
