import React, { useState } from "react";

import { ILocation } from "../../../../services/weatherApi";

export const MockSearchCity = ({
  selected,
  onSelectedChange,
}: {
  selected: ILocation | null;
  onSelectedChange: (selected: ILocation) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClick = () => {
    onSelectedChange({
      cityKey: "34730",
      cityName: "Cascavel",
      stateName: "PR",
      countryName: "Brazil",
    });
  };

  return (
    <>
      <input
        placeholder="Search for a city"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div onClick={handleClick}>Cascavel, PR, Brazil</div>
    </>
  );
};
