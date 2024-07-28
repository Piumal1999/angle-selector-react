// src/AngleSelector.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AngleSelector from "./AngleSelector";

describe("AngleSelector Component", () => {
  test("renders correctly", () => {
    render(<AngleSelector />);
    expect(screen.getByText("Angle Selector")).toBeInTheDocument();
  });

  test("initial angle is 0", () => {
    render(<AngleSelector />);
    const input = screen.getByLabelText(/Angle:/i);
    expect(input.value).toBe("0");
    const slider = screen.getByLabelText(/Angle Slider:/i);
    expect(slider.value).toBe("0");
  });

  test("updates angle on input change", () => {
    render(<AngleSelector />);
    const input = screen.getByLabelText(/Angle:/i);
    fireEvent.change(input, { target: { value: "45" } });
    expect(input.value).toBe("45");
    const slider = screen.getByLabelText(/Angle Slider:/i);
    expect(slider.value).toBe("45");
  });

  test("shows message for invalid angle", () => {
    render(<AngleSelector />);
    const input = screen.getByLabelText(/Angle:/i);
    fireEvent.change(input, { target: { value: "400" } });
    expect(
      screen.getByText(/Press Enter to simplify the angle value./i)
    ).toBeInTheDocument();
  });

  test("simplifies angle on Enter key press", () => {
    render(<AngleSelector />);
    const input = screen.getByLabelText(/Angle:/i);
    fireEvent.change(input, { target: { value: "400" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(input.value).toBe("40");
    const slider = screen.getByLabelText(/Angle Slider:/i);
    expect(slider.value).toBe("40");
  });

  test("updates angle on slider change", () => {
    render(<AngleSelector />);
    const slider = screen.getByLabelText(/Angle Slider:/i);
    fireEvent.change(slider, { target: { value: "90" } });
    const input = screen.getByLabelText(/Angle:/i);
    expect(input.value).toBe("90");
    expect(slider.value).toBe("90");
  });

  test("updates angle on radio button change", () => {
    render(<AngleSelector />);
    const radio = screen.getByLabelText(/90/i);
    fireEvent.click(radio);
    const input = screen.getByLabelText(/Angle:/i);
    expect(input.value).toBe("90");
    const slider = screen.getByLabelText(/Angle Slider:/i);
    expect(slider.value).toBe("90");
  });
});
