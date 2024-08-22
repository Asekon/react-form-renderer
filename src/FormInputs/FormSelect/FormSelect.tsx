import React, { useState, useRef, useEffect } from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import "./FormSelect.css";

interface FormSelectProps {
  name: string;
  control: Control<any>;
  defaultValue: string;
  label?: string;
  options: { label: string; value: string }[];
  rules?: RegisterOptions;
  styles?: React.CSSProperties;
}

const FormSelect = ({
  name,
  control,
  defaultValue,
  options,
  rules,
  styles,
}: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="form-select" ref={dropdownRef}>
          <div
            className={`form-select__input ${isOpen ? "open" : ""} ${
              error ? "form-select__input--error" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
            style={styles}
          >
            <span>
              {options.find((opt) => opt.value === selectedOption)?.label ||
                "Select an option"}
            </span>
            <span className={`form-select__arrow ${isOpen ? "open" : ""}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
              </svg>
            </span>
          </div>
          {isOpen && (
            <div className="form-select__dropdown">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`form-select__option ${
                    option.value === selectedOption ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedOption(option.value);
                    field.onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
          {error && <span className="form-select__error">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default FormSelect;
