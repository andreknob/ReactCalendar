import { render, fireEvent, screen } from "@testing-library/react";

import { MockSearchCity } from "../__mocks__/index";
import { ReminderModal } from "../ReminderModal";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => ({
    reminderModal: { date: "2022-11-09T03:00:00.000Z", editingId: "" },
  }),
  useDispatch: () => mockDispatch,
}));

jest.mock("@reduxjs/toolkit", () => ({
  ...jest.requireActual("@reduxjs/toolkit"),
  nanoid: () => "123456",
}));

const mockCloseAllModals = jest.fn();
const mockUpdateRemindersReference = jest.fn();

jest.doMock("../../../../store/slices/calendarSlice", () => ({
  closeAllModals: () => mockCloseAllModals(),
  selectCalendar: jest.fn(),
  updateRemindersReference: () => mockUpdateRemindersReference(),
}));

const mockSaveReminderToStorage = jest.fn();

jest.mock("../../../../services/storageApi", () => ({
  deleteReminderFromStorage: jest.fn(),
  getReminderFromStorage: jest.fn(),
  saveReminderToStorage: (arg: any) => mockSaveReminderToStorage(arg),
}));

jest.mock("../../../../services/weatherApi", () => ({
  searchCity: jest.fn(),
}));

jest.mock("../../../../components/SearchCity", () => ({
  __esModule: true,
  default: MockSearchCity,
}));

describe("#ReminderModal", () => {
  describe("when filling the form correctly", () => {
    beforeEach(() => {
      const tree = render(<ReminderModal />);

      fireEvent.change(tree.getByPlaceholderText("Add a title"), {
        target: { value: "new reminder" },
      });

      fireEvent.change(tree.getByPlaceholderText("Start time"), {
        target: { value: "12:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("End time"), {
        target: { value: "01:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("Search for a city"), {
        target: { value: "cascavel" },
      });

      fireEvent.click(screen.getByText("Cascavel, PR, Brazil"));

      fireEvent.click(screen.getByText("Save"));
    });

    it("saves the reminder to storage", () => {
      expect(mockSaveReminderToStorage).toHaveBeenCalledWith({
        date: "2022-11-09T03:00:00.000Z",
        endTime: "01:00pm",
        id: "123456",
        location: {
          cityKey: "34730",
          cityName: "Cascavel",
          countryName: "Brazil",
          stateName: "PR",
        },
        reminderName: "new reminder",
        startTime: "12:00pm",
      });
    });
  });

  describe("when title is missing", () => {
    beforeEach(() => {
      const tree = render(<ReminderModal />);

      fireEvent.change(tree.getByPlaceholderText("Add a title"), {
        target: { value: "" },
      });

      fireEvent.change(tree.getByPlaceholderText("Start time"), {
        target: { value: "12:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("End time"), {
        target: { value: "01:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("Search for a city"), {
        target: { value: "cascavel" },
      });

      fireEvent.click(screen.getByText("Cascavel, PR, Brazil"));

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not call save", () => {
      expect(mockSaveReminderToStorage).not.toHaveBeenCalled();
    });

    it("shows error message", () => {
      expect(
        screen.getByText("There are missing and/or invalid fields!")
      ).toBeDefined();
    });
  });

  describe("when start time in a wrong format", () => {
    beforeEach(() => {
      const tree = render(<ReminderModal />);

      fireEvent.change(tree.getByPlaceholderText("Add a title"), {
        target: { value: "title" },
      });

      fireEvent.change(tree.getByPlaceholderText("Start time"), {
        target: { value: "1200" },
      });

      fireEvent.change(tree.getByPlaceholderText("End time"), {
        target: { value: "01:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("Search for a city"), {
        target: { value: "cascavel" },
      });

      fireEvent.click(screen.getByText("Cascavel, PR, Brazil"));

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not call save", () => {
      expect(mockSaveReminderToStorage).not.toHaveBeenCalled();
    });

    it("shows error message", () => {
      expect(
        screen.getByText("There are missing and/or invalid fields!")
      ).toBeDefined();
    });
  });

  describe("when end time in a wrong format", () => {
    beforeEach(() => {
      const tree = render(<ReminderModal />);

      fireEvent.change(tree.getByPlaceholderText("Add a title"), {
        target: { value: "title" },
      });

      fireEvent.change(tree.getByPlaceholderText("Start time"), {
        target: { value: "12:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("End time"), {
        target: { value: "0100" },
      });

      fireEvent.change(tree.getByPlaceholderText("Search for a city"), {
        target: { value: "cascavel" },
      });

      fireEvent.click(screen.getByText("Cascavel, PR, Brazil"));

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not call save", () => {
      expect(mockSaveReminderToStorage).not.toHaveBeenCalled();
    });

    it("shows error message", () => {
      expect(
        screen.getByText("There are missing and/or invalid fields!")
      ).toBeDefined();
    });
  });

  describe("when a city is not selected", () => {
    beforeEach(() => {
      const tree = render(<ReminderModal />);

      fireEvent.change(tree.getByPlaceholderText("Add a title"), {
        target: { value: "title" },
      });

      fireEvent.change(tree.getByPlaceholderText("Start time"), {
        target: { value: "12:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("End time"), {
        target: { value: "01:00pm" },
      });

      fireEvent.change(tree.getByPlaceholderText("Search for a city"), {
        target: { value: "cascavel" },
      });

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not call save", () => {
      expect(mockSaveReminderToStorage).not.toHaveBeenCalled();
    });

    it("shows error message", () => {
      expect(
        screen.getByText("There are missing and/or invalid fields!")
      ).toBeDefined();
    });
  });
});
