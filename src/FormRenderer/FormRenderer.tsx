import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormSelect from "../FormInputs/FormSelect/FormSelect";
import FormText from "../FormInputs/FormText/FormText";
import FormDate from "../FormInputs/FormDate/FormDate";
import FormTime from "../FormInputs/FormTime/FormTime";
import FormFile from "../FormInputs/FormFile/FormFile";
import FormRadio from "../FormInputs/FormRadio/FormRadio";
import FormTextArea from "../FormInputs/FormTextArea/FormTextArea";
import CustomStepper from "../CustomStepper/CustomStepper";
import { FormInput, FormRendererProps, FormStep } from "../types";
import "./FormRenderer.css";

const FormRenderer: React.FC<FormRendererProps> = ({
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
  themeColor = "#1976d2",
}) => {
  const methods = useForm({ mode: "onChange" });
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

    return (
      <div
        key={`input-wrapper-${index}`}
        className="input-container"
        style={inputContainerStyle}
      >
        <label className="input-label">
          {isRequired && <span className="input-required">*</span>}
          {input.label}
        </label>
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
                  pattern={input.pattern}
                  patternMessage={input.patternMessage}
                  styles={input.styles}
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
                  accept={input.accept}
                  rules={input.validation}
                  buttonText={input.buttonText}
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
      </div>
    );
  };

  const renderStep = (step: FormStep, stepIndex: number) => (
    <div key={`step-${stepIndex}`}>
      <div
        className="step-title"
        style={{ ...stepTitleStyle, ...step.stepTitleStyle }}
      >
        {step.title}
      </div>
      <div className="step-content">
        {step.sections.map((section, sectionIndex) => (
          <div
            key={`section-${sectionIndex}`}
            className="section-container"
            style={{ ...sectionContainerStyle, ...section.sectionStyle }}
          >
            <div className="section-title" style={sectionTitleStyle}>
              {section.title}
            </div>
            <div
              className={`grid-container grid-cols-${section.layout.columns}`}
            >
              {section.inputs.map((input, inputIndex) => (
                <div key={`input-${inputIndex}`} className="grid-item">
                  {renderFormInputs(input, inputIndex)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    methods.trigger();
  }, [activeStep, methods]);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  return (
    <FormProvider {...methods}>
      <div className="form-container" style={formContainerStyle}>
        {multiStep && (
          <CustomStepper
            steps={schema.map((step) => step.title)}
            activeStep={activeStep}
            customStyles={stepperStyle}
          />
        )}
        <div className="form-content">
          {multiStep
            ? renderStep(schema[activeStep], activeStep)
            : schema.map((step, index) => renderStep(step, index))}
        </div>
        <p className="validation-message" style={validationMessageStyle}>
          {!methods.formState.isValid && "Please fill all required fields"}
        </p>
        <div className="button-container" style={buttonContainerStyle}>
          {multiStep && activeStep > 0 ? (
            <button
              className="button button-left"
              onClick={handleBack}
              style={leftButtonStyle}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            className="button button-right"
            onClick={
              multiStep
                ? activeStep === schema.length - 1
                  ? handleSubmit
                  : handleNext
                : handleSubmit
            }
            style={rightButtonStyle}
            disabled={!methods.formState.isValid}
          >
            {multiStep
              ? activeStep === schema.length - 1
                ? "Submit"
                : "Next"
              : "Submit"}
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default FormRenderer;
