import { Controller, Control, RegisterOptions } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

import { FormControl, FormControlProps } from "@mui/material";

interface FormDateProps {
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: any;
  formControlProps?: FormControlProps;
  rules?: RegisterOptions;
}

const FormDate: React.FC<FormDateProps> = ({
  name,
  control,
  label,
  defaultValue,
  formControlProps,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <FormControl {...formControlProps}>
          <DatePicker
            label={label}
            value={field.value || null}
            onChange={(newValue) => field.onChange(newValue)}
          />
        </FormControl>
      )}
    />
  );
};

export default FormDate;
