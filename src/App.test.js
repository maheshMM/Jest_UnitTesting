import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Notes from "./Components/Notes";

// Mock the Notes component
jest.mock("./Components/Notes", () =>
  jest.fn(() => <div data-testid="notes-component">Mock Notes Component</div>)
);

describe("App Component", () => {
  test("renders the App component correctly", () => {
    render(<App />);
    
    expect(screen.getByText("Hello StackBlitz!")).toBeInTheDocument();
    expect(screen.getByText("Start editing to see some magic happen :)")).toBeInTheDocument();
    expect(screen.getByTestId("notes-component")).toBeInTheDocument();
  });

  test("renders dropdown with correct options", () => {
    render(<App />);
    
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(4);
    
    expect(options[0]).toHaveTextContent("No Caller 1");
    expect(options[1]).toHaveTextContent("No Caller 2");
    expect(options[2]).toHaveTextContent("No Caller 3");
    expect(options[3]).toHaveTextContent("No Caller 4");
  });

  test("updates selected value when dropdown option is changed", () => {
    render(<App />);
    
    const dropdown = screen.getByRole("combobox");
    
    fireEvent.change(dropdown, { target: { value: "No Caller 3" } });
    expect(dropdown.value).toBe("No Caller 3");

    fireEvent.change(dropdown, { target: { value: "No Caller 4" } });
    expect(dropdown.value).toBe("No Caller 4");
  });

  test('shows a warning message when "No Caller 2" is selected', () => {
    render(<App />);
    
    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "No Caller 2" } });

    expect(screen.getByText("No Caller 2 is not authorized in CA")).toBeInTheDocument();
  });

  test("renders Notes component with correct initial props", () => {
    render(<App />);

    expect(Notes).toHaveBeenCalledWith(
      {
        selected: "No Caller 1",
        inputValues: [
          { id: "No Caller 1", name: "vishu", age: 30, review: "abusive" },
          { id: "No Caller 2", name: "sainath", age: 35 },
          { id: "No Caller 3", name: "vani", age: 33 },
          { id: "No Caller 4", name: "vijaya", age: 32 },
        ],
      },
      expect.anything()
    );
  });

  test("updates Notes component when dropdown value changes", () => {
    render(<App />);

    const dropdown = screen.getByRole("combobox");

    fireEvent.change(dropdown, { target: { value: "No Caller 3" } });

    expect(Notes).toHaveBeenCalledWith(
      expect.objectContaining({
        selected: "No Caller 3",
      }),
      expect.anything()
    );

    fireEvent.change(dropdown, { target: { value: "No Caller 4" } });

    expect(Notes).toHaveBeenCalledWith(
      expect.objectContaining({
        selected: "No Caller 4",
      }),
      expect.anything()
    );
  });
});
