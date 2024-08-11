import React from "react";
import "./CustomStepper.css";

interface CustomStepperProps {
  steps: string[];
  activeStep: number;
  customStyles?: {
    stepper?: React.CSSProperties;
    step?: React.CSSProperties;
    indicator?: React.CSSProperties;
    activeIndicator?: React.CSSProperties;
    label?: React.CSSProperties;
    activeLabel?: React.CSSProperties;
    connector?: React.CSSProperties;
    activeConnector?: React.CSSProperties;
  };
}

const CustomStepper: React.FC<CustomStepperProps> = ({
  steps,
  activeStep,
  customStyles = {},
}) => {
  return (
    <div className="custom-stepper" style={customStyles.stepper}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="step" style={customStyles.step}>
            <div
              className={`indicator ${index <= activeStep ? "active" : ""}`}
              style={{
                ...customStyles.indicator,
                ...(index <= activeStep && customStyles.activeIndicator),
              }}
            >
              {index + 1}
            </div>
            <div
              className={`label ${index <= activeStep ? "active" : ""}`}
              style={{
                ...customStyles.label,
                ...(index <= activeStep && customStyles.activeLabel),
              }}
            >
              {step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`connector ${index < activeStep ? "active" : ""}`}
              style={{
                ...customStyles.connector,
                ...(index < activeStep && customStyles.activeConnector),
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomStepper;
