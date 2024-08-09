import { Controller, Control, RegisterOptions } from "react-hook-form";
import { Chip, FormControl, FormGroup, FormControlProps } from "@mui/material";

interface FormRadioProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label: string;
  options: { label: string; value: string }[];
  formControlProps?: FormControlProps;
  chipProps?: any;
  rules?: RegisterOptions;
}

const FormRadio: React.FC<FormRadioProps> = ({
  name,
  control,
  defaultValue,
  options,
  formControlProps,
  chipProps,
  rules,
}) => {
  return (
    <FormControl {...formControlProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <FormGroup row {...formControlProps} sx={{ gap: 3 }}>
            {options.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() => onChange(option.value)}
                variant={value === option.value ? "filled" : "outlined"}
                color={value === option.value ? "primary" : "default"}
                sx={{
                  ...chipProps,
                  fontSize: 20,
                  p: 3,
                }}
              />
            ))}
          </FormGroup>
        )}
      />
    </FormControl>
  );
};

export default FormRadio;
