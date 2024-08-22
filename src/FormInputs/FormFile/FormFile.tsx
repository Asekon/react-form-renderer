import { Controller, Control, RegisterOptions } from "react-hook-form";
import { fileTypeMappings } from "../../util";

interface FormFileProps {
  name: string;
  control: Control<any>;
  accept?: string;
  rules?: RegisterOptions;
  buttonText?: string;
}

const FormFile: React.FC<FormFileProps> = ({
  name,
  control,
  rules,
  accept,
  buttonText,
}) => {
  const handleFileChange =
    (onChange: (file: File | null) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onChange(file);
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div style={{ width: "100%" }}>
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
                backgroundColor: "var(--theme-color)",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {buttonText || "Choose File"}
              <input
                accept={accept && fileTypeMappings[accept]}
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
