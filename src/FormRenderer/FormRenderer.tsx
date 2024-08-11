import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Stack,
} from "@mui/material";
import FormSelect from "../FormInputs/FormSelect/FormSelect";
import FormText from "../FormInputs/FormText/FormText";
import FormDate from "../FormInputs/FormDate/FormDate";
import FormTime from "../FormInputs/FormTime/FormTime";
import FormFile from "../FormInputs/FormFile/FormFile";
import FormRadio from "../FormInputs/FormRadio/FormRadio";
import FormTextArea from "../FormInputs/FormTextArea/FormTextArea";
import CustomStepper from "../CustomStepper/CustomStepper";

interface FormInput {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  validation?: { required: string };
  maxChars?: number;
}

interface FormSection {
  title: string;
  layout: { columns: number };
  inputs: FormInput[];
}

interface FormStep {
  title: string;
  sections: FormSection[];
}

interface FormRendererProps {
  schema: FormStep[];
  onSubmit: (data: any) => void;
  multiStep?: boolean;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  onSubmit,
  multiStep = false,
}) => {
  const methods = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      onSubmit(methods.getValues());
    }
  };

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const renderFormInputs = (input: FormInput, index: number) => {
    const isRequired = input.validation?.required !== undefined;
    const error = methods.formState.errors[input.name];

    return (
      <Box
        key={`input-wrapper-${index}`}
        sx={{
          backgroundColor: error ? "rgba(255, 0, 0, 0.05)" : "transparent",
          padding: 1,
          borderRadius: 5,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography sx={{ color: "grey" }}>
            {isRequired && (
              <span style={{ color: "red", marginRight: "4px" }}>*</span>
            )}
            {input.label}
          </Typography>
          {error && (
            <Typography color="error" variant="caption">
              {error.message as string}
            </Typography>
          )}
        </Box>
        {(() => {
          switch (input.type) {
            case "text":
              return (
                <FormText
                  key={`text-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue={input.defaultValue || ""}
                  placeholder={input.placeholder}
                  rules={input.validation}
                />
              );
            case "select":
              return (
                <FormSelect
                  key={`select-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue=""
                  label={input.label}
                  options={input.options || []}
                  rules={input.validation}
                />
              );
            case "date":
              return (
                <FormDate
                  key={`date-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue={input.defaultValue}
                  rules={input.validation}
                />
              );
            case "time":
              return (
                <FormTime
                  key={`time-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue={input.defaultValue}
                  rules={input.validation}
                />
              );
            case "radio":
              return (
                <FormRadio
                  key={`radio-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue={input.defaultValue}
                  label={input.label}
                  options={input.options || []}
                  rules={input.validation}
                />
              );
            case "file":
              return (
                <FormFile
                  key={`file-${index}`}
                  name={input.name}
                  control={methods.control}
                  label={input.label}
                  rules={input.validation}
                />
              );
            case "textArea":
              return (
                <FormTextArea
                  key={`textArea-${index}`}
                  name={input.name}
                  control={methods.control}
                  defaultValue={input.defaultValue || ""}
                  placeholder={input.placeholder}
                  rules={input.validation}
                  maxChars={input.maxChars}
                />
              );
            default:
              return null;
          }
        })()}
      </Box>
    );
  };

  const renderStep = (step: FormStep, stepIndex: number) => (
    <Box key={`step-${stepIndex}`}>
      <Typography variant="h4" mb={2} sx={{ textAlign: "left" }}>
        {step.title}
      </Typography>
      <Stack spacing={3}>
        {step.sections.map((section, sectionIndex) => (
          <Box
            key={`section-${sectionIndex}`}
            sx={{
              bgcolor: "white",
              backgroundColor: "white",
              borderRadius: 3,
              padding: 3,
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" mb={2} sx={{ textAlign: "left" }}>
              {section.title}
            </Typography>
            <Grid container columnSpacing={5}>
              {section.inputs.map((input, inputIndex) => (
                <Grid
                  key={`input-${inputIndex}`}
                  item
                  xs={12}
                  sm={12 / section.layout.columns}
                >
                  {renderFormInputs(input, inputIndex)}
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <FormProvider {...methods}>
      <Stack
        sx={{
          mb: 3,
          bgcolor: "white",
          backgroundColor: "white",
          borderRadius: 3,
          padding: 3,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CustomStepper
          steps={schema.map((step) => step.title)}
          activeStep={activeStep}
        />
        <Stack gap={5}>
          {multiStep
            ? renderStep(schema[activeStep], activeStep)
            : schema.map((step, index) => renderStep(step, index))}
        </Stack>
        <Box
          key="button-box"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            px: 2,
          }}
        >
          {multiStep && activeStep > 0 ? (
            <Button
              key="back-button"
              onClick={handleBack}
              variant="outlined"
              sx={{ px: 7 }}
            >
              Back
            </Button>
          ) : (
            <Box key="empty-box" />
          )}
          <Button
            key="next-or-submit-button"
            onClick={
              multiStep
                ? activeStep === schema.length - 1
                  ? handleSubmit
                  : handleNext
                : handleSubmit
            }
            variant="contained"
            color="primary"
            sx={{ px: 7 }}
          >
            {multiStep
              ? activeStep === schema.length - 1
                ? "Submit"
                : "Next"
              : "Submit"}
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default FormRenderer;
