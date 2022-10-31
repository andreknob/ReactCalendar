import { useEffect, useState, useRef } from "react";

import { ISearchResult, searchCity } from "../../services/weatherApi";
import Input from "../Input";
import { Container, Results, Result } from "./styles";

const SearchCity = ({
  selected,
  onSelectedChange,
}: {
  selected: ISearchResult | null;
  onSelectedChange: (selected: ISearchResult) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);
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

  const renderLocationName = (item: ISearchResult) => {
    return `${item.cityName}, ${item.stateName}, ${item.countryName}`;
  };

  const handleSelectedChange = (item: ISearchResult) => {
    onSelectedChange(item);

    setSearchTerm(renderLocationName(item));
    setSearchResults([]);
  };

  return (
    <Container>
      <Input
        name="search_term"
        placeholder="Search for a city"
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
