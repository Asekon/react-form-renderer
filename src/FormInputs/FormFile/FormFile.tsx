import React, { useState } from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormFileProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: RegisterOptions;
}

const FormFile: React.FC<FormFileProps> = ({ name, control, label, rules }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange =
    (onChange: (file: File | null) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onChange(file);
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div style={{ width: "100%" }}>
          {/* {label && (
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              {label}
            </label>
          )} */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "0.3rem",
              backgroundColor: "#f8f8f8",
            }}
          >
            <input
              type="text"
              readOnly
              value={value?.name || ""}
              placeholder="No file chosen"
              style={{
                flex: 1,
                border: "none",
                backgroundColor: "transparent",
                marginRight: "1rem",
              }}
            />
            <label
              style={{
                padding: "0.3rem 1rem",
                backgroundColor: "#4a90e2",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Choose File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange(onChange)}
              />
            </label>
          </div>
        </div>
      )}
    />
  );
};

export default FormFile;
