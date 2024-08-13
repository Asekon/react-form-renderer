import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import FormSelect from "../FormInputs/FormSelect/FormSelect";
import FormText from "../FormInputs/FormText/FormText";
import FormDate from "../FormInputs/FormDate/FormDate";
import FormTime from "../FormInputs/FormTime/FormTime";
import FormFile from "../FormInputs/FormFile/FormFile";
import FormRadio from "../FormInputs/FormRadio/FormRadio";
import FormTextArea from "../FormInputs/FormTextArea/FormTextArea";
import CustomStepper from "../CustomStepper/CustomStepper";
import { FormInput, FormRendererProps, FormStep } from "../types";

const defaultThemeColor = "#1976d2";
const getDefaultStyles = (themeColor: string) => ({
  formContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  stepper: {
    stepper: {
      marginBottom: "2rem",
    },
    indicator: {
      backgroundColor: "#bdc3c7",
      color: "#ffffff",
    },
    activeIndicator: {
      backgroundColor: themeColor,
    },
    label: {
      color: "#7f8c8d",
    },
    activeLabel: {
      color: "#2c3e50",
      fontWeight: "bold",
    },
    connector: {
      backgroundColor: "#bdc3c7",
    },
    activeConnector: {
      backgroundColor: themeColor,
    },
  },
  stepTitle: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  sectionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "16px",
    marginBottom: "24px",
  },
  sectionTitle: {
    color: "#34495e",
    borderBottom: `2px solid ${themeColor}`,
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  leftButton: {},
  rightButton: {
    backgroundColor: themeColor,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: themeColor,
      opacity: 0.9,
    },
  },
  validationMessage: {
    color: "grey",
    fontStyle: "italic",
    textAlign: "right",
    minHeight: "25px",
    marginTop: "20px",
  },
});

const FormRenderer: React.FC<FormRendererProps & { themeColor?: string }> = ({
  schema,
  onSubmit,
  multiStep = false,
  formContainerStyle,
  stepperStyle,
  stepTitleStyle,
  sectionContainerStyle,
  sectionTitleStyle,
  inputContainerStyle,
  buttonContainerStyle,
  leftButtonStyle,
  rightButtonStyle,
  validationMessageStyle,
  themeColor = defaultThemeColor,
}) => {
  const methods = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const defaultStyles = getDefaultStyles(themeColor);

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

  useEffect(() => {
    methods.trigger();
  }, [activeStep, methods]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderFormInputs = (input: FormInput, index: number) => {
    const isRequired = input.validation?.required !== undefined;

    return (
      <Box
        key={`input-wrapper-${index}`}
        sx={{
          ...defaultStyles.inputContainer,
          ...inputContainerStyle,
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
      <Typography
        variant="h4"
        mb={2}
        sx={{
          ...defaultStyles.stepTitle,
          ...stepTitleStyle,
          ...(step.stepTitleStyle || {}),
        }}
      >
        {step.title}
      </Typography>
      <Stack spacing={3}>
        {step.sections.map((section, sectionIndex) => (
          <Box
            key={`section-${sectionIndex}`}
            sx={{
              ...defaultStyles.sectionContainer,
              ...sectionContainerStyle,
              ...(section.sectionStyle || {}),
            }}
          >
            <Typography
              variant="h6"
              mb={2}
              sx={{
                ...defaultStyles.sectionTitle,
                ...sectionTitleStyle,
              }}
            >
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
          ...defaultStyles.formContainer,
          ...formContainerStyle,
        }}
      >
        {multiStep && (
          <CustomStepper
            steps={schema.map((step) => step.title)}
            activeStep={activeStep}
            customStyles={{
              ...defaultStyles.stepper,
              ...stepperStyle,
            }}
          />
        )}
        <Stack gap={5}>
          {multiStep
            ? renderStep(schema[activeStep], activeStep)
            : schema.map((step, index) => renderStep(step, index))}
        </Stack>
        <Typography
          sx={{
            ...defaultStyles.validationMessage,
            ...validationMessageStyle,
          }}
        >
          {!methods.formState.isValid && "Please fill all required fields"}
        </Typography>
        <Box
          key="button-box"
          sx={{
            ...defaultStyles.buttonContainer,
            ...buttonContainerStyle,
          }}
        >
          {multiStep && activeStep > 0 ? (
            <Button
              key="back-button"
              onClick={handleBack}
              variant="outlined"
              sx={{
                px: 7,
                width: 120,
                ...defaultStyles.leftButton,
                ...leftButtonStyle,
              }}
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
            sx={{
              px: 7,
              width: 120,
              ...defaultStyles.rightButton,
              ...rightButtonStyle,
            }}
            disabled={!methods.formState.isValid}
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
