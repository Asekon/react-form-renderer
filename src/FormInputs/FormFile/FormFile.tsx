import { Controller, Control, RegisterOptions } from "react-hook-form";
import {
  FormControl,
  TextField,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { inputDividerStyles } from "../../../constants/CustomStyles";

interface FormFileProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: RegisterOptions;
}

const FormFile: React.FC<FormFileProps> = ({ name, control, rules }) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="text"
            variant="outlined"
            value={field.value?.name || ""}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Divider
                    // sx={{ ...inputDividerStyles }}
                    orientation="vertical"
                  />
                  <Button
                    variant="text"
                    component="label"
                    // startIcon={<CloudUploadIcon />}
                  >
                    Choose File
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default FormFile;
