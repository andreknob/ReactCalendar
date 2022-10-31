import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import HourPicker from "../../../components/HourPicker";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import SearchCity from "../../../components/SearchCity";
import { saveReminderToStorage } from "../../../services/storageApi";
import { ILocation } from "../../../services/weatherApi";
import {
  closeModal,
  selectCalendar,
} from "../../../store/slices/calendarSlice";
import { StyledButton } from "./styles";

export const NewRemiderModal = () => {
  const [reminderName, setReminderName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { dateInReminderModal: date } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  const handleReminderNameChange = (value: string) => {
    setReminderName(value.substring(0, 30));
  };

  const handleStartTimeChange = useCallback((value: string) => {
    setStartTime(value);
  }, []);

  const handleEndTimeChange = useCallback((value: string) => {
    setEndTime(value);
  }, []);

  const handleSelectedLocation = (selected: ILocation) => {
    setSelectedLocation(selected);
  };

  const validateForm = () => {
    return (
      reminderName && selectedLocation !== null && date && startTime && endTime
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const reminder = {
      id: nanoid(12),
      reminderName,
      date: date,
      startTime,
      endTime,
      location: selectedLocation as ILocation,
    };

    saveReminderToStorage(reminder);

    setReminderName("");

    dispatch(closeModal());
  };

  return (
    <Modal title="Add new reminder" open={!!date}>
      <Input
        name="reminder_name"
        placeholder="Add a title"
        value={reminderName}
        setValue={handleReminderNameChange}
      />
      <HourPicker
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
      />
      <SearchCity
        selected={selectedLocation}
        onSelectedChange={handleSelectedLocation}
      />
      <StyledButton onClick={handleSave}>Save</StyledButton>
    </Modal>
  );
};
