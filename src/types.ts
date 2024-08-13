import React from "react";

export interface FormInput {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  validation?: { required: string };
  maxChars?: number;
}

export interface FormInputField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "radio" | "file" | "time" | "textArea";
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  validation?: { required: string };
  maxChars?: number;
  rows?: number;
}

export interface FormSection {
  title: string;
  layout: { columns: number };
  inputs: FormInput[];
  sectionStyle?: React.CSSProperties;
}

export interface FormStep {
  title: string;
  sections: FormSection[];
  stepTitleStyle?: React.CSSProperties;
}

export interface FormRendererProps {
  schema: FormStep[];
  onSubmit: (data: any) => void;
  multiStep?: boolean;
  formContainerStyle?: React.CSSProperties;
  stepTitleStyle?: React.CSSProperties;
  sectionContainerStyle?: React.CSSProperties;
  sectionTitleStyle?: React.CSSProperties;
  inputContainerStyle?: React.CSSProperties;
  buttonContainerStyle?: React.CSSProperties;
  leftButtonStyle?: React.CSSProperties;
  rightButtonStyle?: React.CSSProperties;
  validationMessageStyle?: React.CSSProperties;
  stepperStyle?: StepperStyle;
}
export interface StepperStyle {
  stepper?: React.CSSProperties;
  step?: React.CSSProperties;
  indicator?: React.CSSProperties;
  activeIndicator?: React.CSSProperties;
  label?: React.CSSProperties;
  activeLabel?: React.CSSProperties;
  connector?: React.CSSProperties;
  activeConnector?: React.CSSProperties;
}
