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
    setSearchTerm(selected ? renderLocationName(selected) : "");
  }, [selected]);

  const handleSearch = (term: string) => {
    if (!term || selected !== null) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //@ts-ignore
    timeoutRef.current = setTimeout(async () => {
      const results = await searchCity(term);

      setSearchResults(results);
    }, 200);
  };

  const handleInputChange = (term: string) => {
    setSearchTerm(term);

    handleSearch(term);
  };

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
        name="search_city"
        placeholder="Search for a city"
        icon={<MdSearch />}
        value={searchTerm}
        setValue={handleInputChange}
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
