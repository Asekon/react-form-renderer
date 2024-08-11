import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormDateProps {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: any;
  rules?: RegisterOptions;
}

const FormDate: React.FC<FormDateProps> = ({
  name,
  control,
  label,
  defaultValue,
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
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          {label && (
            <label
              htmlFor={name}
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {label}
            </label>
          )}
          <input
            type="date"
            id={name}
            {...field}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>
      )}
    />
  );
};

export default FormDate;
