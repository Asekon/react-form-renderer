import { Controller, Control, RegisterOptions } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";
import { FormControl, FormControlProps } from "@mui/material";

interface FormTimeProps {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: any;
  formControlProps?: FormControlProps;
  rules?: RegisterOptions;
}

const FormTime = ({
  name,
  control,
  label,
  defaultValue,
  formControlProps,
  rules,
}: FormTimeProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <FormControl {...formControlProps}>
          <TimePicker
            label={label}
            value={field.value || null}
            onChange={(newValue) => field.onChange(newValue)}
          />
        </FormControl>
      )}
    />
  );
};

export default FormTime;
