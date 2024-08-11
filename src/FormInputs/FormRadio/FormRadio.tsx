import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormRadioProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label: string;
  options: { label: string; value: string }[];
  rules?: RegisterOptions;
}

const FormRadio: React.FC<FormRadioProps> = ({
  name,
  control,
  defaultValue,
  options,
  rules,
}) => {
  return (
    <div style={{ marginBottom: "1rem", width: "100%" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem",
              width: "100%",
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                style={{
                  flex: "1 0 0",
                  minWidth: "calc(33.333% - 0.5rem)",
                  padding: "0.6rem 0.5rem",
                  fontSize: "1.25rem",
                  border: `2px solid ${
                    value === option.value ? "#1976d2" : "#ccc"
                  }`,
                  borderRadius: "2rem",
                  background:
                    value === option.value ? "#1976d2" : "transparent",
                  color: value === option.value ? "white" : "#333",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  outline: "none",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default FormRadio;
