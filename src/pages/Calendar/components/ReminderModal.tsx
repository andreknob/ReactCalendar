import { useState, useCallback, useEffect } from "react";
import { MdTextFields } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "@reduxjs/toolkit";

import DateInput from "../../../components/DateInput";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import SearchCity from "../../../components/SearchCity";
import TimeInput from "../../../components/TimeInput";
import {
  deleteReminderFromStorage,
  getReminderFromStorage,
  saveReminderToStorage,
} from "../../../services/storageApi";
import { ILocation } from "../../../services/weatherApi";
import {
  closeAllModals,
  selectCalendar,
  updateRemindersReference,
} from "../../../store/slices/calendarSlice";
import { ErrorMessage, Footer, StyledButton } from "./styles";

export const ReminderModal = () => {
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

    finishAction();
  };

  const handleDelete = () => {
    deleteReminderFromStorage(editingId);

    finishAction();
  };

  const finishAction = () => {
    setReminderName("");

    dispatch(closeAllModals());
    dispatch(updateRemindersReference());
  };

  const title = editingId ? "Edit reminder" : "Add new reminder";

  return (
    <Modal title={title} open={!!date || !!editingId}>
      <Input
        name="reminder_name"
        placeholder="Add a title"
        icon={<MdTextFields />}
        margin="0 0 16px 0"
        value={reminderName}
        setValue={handleReminderNameChange}
      />
      <DateInput />
      <TimeInput
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
      />
      <SearchCity
        selected={selectedLocation}
        onSelectedChange={handleSelectedLocation}
      />
      <Footer>
        <ErrorMessage>There are missing and/or invalid fields!</ErrorMessage>
        {!!editingId ? (
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
        ) : null}
        <StyledButton onClick={handleSave}>Save</StyledButton>
      </Footer>
    </Modal>
  );
};
