import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import "./FormText.css";

interface FormTextProps {
  name: string;
  control: Control<any>;
  defaultValue: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  styles?: React.CSSProperties;
}

const FormText = ({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  rules,
  styles,
}: FormTextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="form-text">
          {label && (
            <label htmlFor={name} className="form-text__label">
              {label}
            </label>
          )}
          <input
            {...field}
            id={name}
            type="text"
            placeholder={placeholder}
            className={`form-text__input ${
              error ? "form-text__input--error" : ""
            }`}
            style={styles}
          />
          {error && <span className="form-text__error">{error.message}</span>}
        </div>
      )}
    />
  );
};

export default FormText;
