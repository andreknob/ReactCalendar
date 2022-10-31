import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import HourPicker from "../../../components/HourPicker";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import SearchCity from "../../../components/SearchCity";
import {
  getReminderFromStorage,
  saveReminderToStorage,
} from "../../../services/storageApi";
import { ILocation } from "../../../services/weatherApi";
import {
  closeModal,
  selectCalendar,
} from "../../../store/slices/calendarSlice";
import { StyledButton } from "./styles";

export const RemiderModal = () => {
  const [reminderName, setReminderName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const {
    reminderModal: { date, editingId },
  } = useSelector(selectCalendar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!editingId) {
      return;
    }

    const editingReminder = getReminderFromStorage(editingId);
    if (!editingReminder) {
      return;
    }

    setReminderName(editingReminder.reminderName);
    setSelectedLocation(editingReminder.location);
    setStartTime(editingReminder.startTime);
    setEndTime(editingReminder.endTime);
  }, [editingId]);

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
      id: editingId || nanoid(12),
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

  const title = editingId ? "Edit reminder" : "Add new reminder";

  return (
    <Modal title={title} open={!!date || !!editingId}>
      <Input
        name="reminder_name"
        placeholder="Add a title"
        margin="0 0 16px 0"
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
