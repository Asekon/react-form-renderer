import { Controller, Control, RegisterOptions } from "react-hook-form";
import { TextField, Typography, Box } from "@mui/material";

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
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            {...field}
            fullWidth
            multiline
            rows={rows}
            placeholder={placeholder}
            inputProps={{ maxLength: maxChars }}
            onChange={(e) => field.onChange(e.target.value)}
          />
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              color: "#757575",
            }}
          >
            {field.value.length}/{maxChars}
          </Typography>
        </Box>
      )}
    />
  );
};

export default FormTextArea;
