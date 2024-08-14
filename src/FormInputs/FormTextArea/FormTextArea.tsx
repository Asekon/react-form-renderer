import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormTextAreaProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  maxChars?: number;
  rules?: RegisterOptions;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  control,
  defaultValue = "",
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
        <div
          style={{
            position: "relative",
          }}
        >
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxChars}
            onChange={(e) => field.onChange(e.target.value)}
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "0.75rem",
              lineHeight: "1.5",
              border: "1px solid #ccc",
              borderRadius: "10px",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
              minHeight: "50px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-color)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#ccc";
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              right: "10px",
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
