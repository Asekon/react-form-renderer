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
  pattern?: RegExp;
  patternMessage?: string;
  styles?: React.CSSProperties;
}

const FormText = ({
  name,
  control,
  defaultValue,
  placeholder,
  rules,
  pattern,
  patternMessage,
  styles,
}: FormTextProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        ...rules,
        pattern:
          pattern && patternMessage
            ? {
                value: pattern,
                message: patternMessage,
              }
            : undefined,
      }}
      render={({ field, fieldState: { invalid, isTouched } }) => (
        <div className="form-text">
          <input
            {...field}
            id={name}
            type="text"
            placeholder={placeholder}
            className={`form-text__input ${
              invalid && isTouched ? "form-text__input--error" : ""
            }`}
            style={styles || {}}
            onBlur={() => {
              field.onBlur();
            }}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
          {invalid && isTouched && (
            <div className="patternMessage">{patternMessage}</div>
          )}
        </div>
      )}
    />
  );
};

export default FormText;
