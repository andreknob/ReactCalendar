import { useState } from "react";
import { useSelector } from "react-redux";

import HourPicker from "../../../components/HourPicker";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import SearchCity from "../../../components/SearchCity";
import { ISearchResult as ISearchCityResult } from "../../../services/weatherApi";
import { selectCalendar } from "../../../store/slices/calendarSlice";

export const NewRemiderModal = () => {
  const [reminderName, setReminderName] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISearchCityResult | null>(
    null
  );
  const { dateInReminderModal } = useSelector(selectCalendar);

  const handleReminderNameChange = (value: string) => {
    setReminderName(value.substring(0, 30));
  };

  const handleSelectedCity = (selectedCity: ISearchCityResult) => {
    setSelectedCity(selectedCity);
  };

  return (
    <Modal title="Add new reminder" open={!!dateInReminderModal}>
      <Input
        name="reminder_name"
        placeholder="Add a title"
        value={reminderName}
        setValue={handleReminderNameChange}
      />
      <HourPicker />
      <SearchCity
        selected={selectedCity}
        onSelectedChange={handleSelectedCity}
      />
    </Modal>
  );
};
