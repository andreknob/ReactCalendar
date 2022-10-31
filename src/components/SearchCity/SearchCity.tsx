import { useEffect, useState, useRef } from "react";
import { MdSearch } from "react-icons/md";

import { ILocation, searchCity } from "../../services/weatherApi";
import Input from "../Input";
import { Container, Results, Result } from "./styles";

const SearchCity = ({
  selected,
  onSelectedChange,
}: {
  selected: ILocation | null;
  onSelectedChange: (selected: ILocation) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ILocation[] | []>([]);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!searchTerm || selected !== null) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //@ts-ignore
    timeoutRef.current = setTimeout(async () => {
      const results = await searchCity(searchTerm);

      setSearchResults(results);
    }, 200);
  }, [searchTerm, selected]);

  useEffect(() => {
    if (selected) {
      setSearchTerm(renderLocationName(selected));
    }
  }, [selected]);

  const renderLocationName = (item: ILocation) => {
    return `${item.cityName}, ${item.stateName}, ${item.countryName}`;
  };

  const handleSelectedChange = (item: ILocation) => {
    onSelectedChange(item);

    setSearchResults([]);
  };

  return (
    <Container>
      <Input
        name="search_term"
        placeholder="Search for a city"
        icon={<MdSearch />}
        value={searchTerm}
        setValue={setSearchTerm}
      />
      <Results>
        {searchResults.map((item) => (
          <Result key={item.cityKey} onClick={() => handleSelectedChange(item)}>
            {renderLocationName(item)}
          </Result>
        ))}
      </Results>
    </Container>
  );
};

export default SearchCity;
