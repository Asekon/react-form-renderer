import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormTextAreaProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxChars?: number;
  rules?: RegisterOptions;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  control,
  defaultValue = "",
  label,
  placeholder,
  rows = 4,
  maxChars = 60,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div style={{ position: "relative" }}>
          {/* {label && (
            <label
              htmlFor={name}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {label}
            </label>
          )} */}
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxChars}
            onChange={(e) => field.onChange(e.target.value)}
            style={{
              width: "97%",
              padding: "0.75rem",
              fontSize: "1rem",
              lineHeight: "1.5",
              border: "1px solid #ccc",
              borderRadius: "10px",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "5px",
              fontSize: "0.75rem",
              color: "#757575",
              backgroundColor: "white",
              padding: "0 4px",
            }}
          >
            {field.value.length} / {maxChars}
          </div>
        </div>
      )}
    />
  );
};

export default FormTextArea;
