import { useMemo, useState } from "react";

const WEEK_DAY_COLOR = "white";
const WEEKEND_DAY_COLOR = "#eaeaea";

const useBackgroundColor = (date: Date) => {
  const initialColor = useMemo(
    () => (date.getDay() % 6 === 0 ? WEEKEND_DAY_COLOR : WEEK_DAY_COLOR),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [backgroundColor] = useState(initialColor);

  return backgroundColor;
};

export default useBackgroundColor;
