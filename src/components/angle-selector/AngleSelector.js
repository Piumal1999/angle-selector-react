import React, { useState } from "react";

const AngleSelector = () => {
  const [angle, setAngle] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);

  const handleAngleChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    setInputValue(value);
    if (value < 0 || value >= 360) {
      setMessageVisible(true);
      setAngle(value % 360);
      setInputValue(value);
    } else {
      setMessageVisible(false);
      setAngle(value % 360);
    }
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setAngle(value);
    setInputValue(value);
    setMessageVisible(false);
  };

  const handleRadioChange = (e) => {
    const value = parseInt(e.target.value);
    setAngle(value);
    setInputValue(value);
    setMessageVisible(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const simplifiedValue = inputValue % 360;
      setAngle(simplifiedValue);
      setInputValue(simplifiedValue);
      setMessageVisible(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Angle Selector</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <label
            htmlFor="angle"
            className="block text-sm font-medium text-gray-700"
          >
            Angle:
          </label>
          <input
            type="number"
            id="angle"
            name="angle"
            value={inputValue}
            onChange={handleAngleChange}
            onKeyDown={handleKeyPress}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {messageVisible && (
            <p className="mt-2 text-xs text-gray-500" id="message">
              Press Enter to simplify the angle value.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="slider"
            className="block text-sm font-medium text-gray-700"
          >
            Angle Slider:
          </label>
          <input
            type="range"
            id="slider"
            name="slider"
            min="0"
            max="360"
            value={angle}
            onChange={handleSliderChange}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Common Angles:
          </label>
          <div className="flex flex-wrap gap-4">
            {[0, 45, 60, 90, 180].map((value) => (
              <div className="flex items-center" key={value}>
                <input
                  type="radio"
                  id={`angle${value}`}
                  name="mode"
                  value={value}
                  checked={angle === value}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`angle${value}`}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngleSelector;
