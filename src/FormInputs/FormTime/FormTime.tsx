import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormTimeProps {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: string;
  rules?: RegisterOptions;
}

const FormTime: React.FC<FormTimeProps> = ({
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
        <div style={{ display: "flex", marginBottom: "1rem" }}>
          {/* {label && (
            <label
              htmlFor={name}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              {label}
            </label>
          )} */}
          <input
            {...field}
            type="time"
            id={name}
            style={{
              width: "100%",
              padding: "0.7rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              outline: "none",
            }}
          />
        </div>
      )}
    />
  );
};

export default FormTime;
