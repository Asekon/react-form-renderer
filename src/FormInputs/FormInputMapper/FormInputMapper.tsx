import { Control } from "react-hook-form";
import { FormInputField } from "../../../Types";
import FormText from "../FormText/FormText";
import FormSelect from "../FormSelect/FormSelect";
import FormDate from "../FormDate/FormDate";
import FormTime from "../FormTime/FormTime";
import FormRadio from "../FormRadio/FormRadio";
import FormFile from "../FormFile/FormFile";
import FormTextArea from "../FormTextArea/FormTextArea";

const FormInputMapper = ({
  input,
  control,
}: {
  input: FormInputField;
  control: Control<any>;
}) => {
  switch (input.type) {
    case "text":
      return (
        <FormText
          name={input.name}
          control={control}
          defaultValue={input.defaultValue || ""}
          placeholder={input.placeholder}
          rules={input.validation}
        />
      );
    case "select":
      return (
        <FormSelect
          name={input.name}
          control={control}
          defaultValue={input.defaultValue}
          label={input.label}
          options={input.options || []}
          formControlProps={{
            sx: { minWidth: "100%" },
          }}
          rules={input.validation}
        />
      );
    case "date":
      return (
        <FormDate
          name={input.name}
          control={control}
          formControlProps={{
            sx: { minWidth: "100%" },
          }}
          rules={input.validation}
        />
      );
    case "time":
      return (
        <FormTime
          name={input.name}
          control={control}
          formControlProps={{
            sx: { minWidth: "100%" },
          }}
          rules={input.validation}
        />
      );
    case "radio":
      return (
        <FormRadio
          name={input.name}
          control={control}
          defaultValue={input.defaultValue || ""}
          label={input.label}
          options={input.options || []}
          formControlProps={{
            sx: { width: "100%" },
          }}
          chipProps={{
            flex: 1,
            height: "40px",
          }}
          rules={input.validation}
        />
      );
    case "file":
      return (
        <FormFile
          name={input.name}
          control={control}
          label={input.label}
          rules={input.validation}
        />
      );
    case "textArea":
      return (
        <FormTextArea
          name={input.name}
          control={control}
          defaultValue={input.defaultValue || ""}
          placeholder={input.placeholder}
          rows={input.rows}
          maxChars={input.maxChars}
          rules={input.validation}
        />
      );
    default:
      return null;
  }
};

export default FormInputMapper;
