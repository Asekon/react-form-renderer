# @asekon/react-form-renderer

Welcome to @asekon/react-form-renderer! 🎉 This powerful and flexible React library allows you to create dynamic, single-step or multi-step forms with ease. Whether you're building a simple contact form or a complex, multi-page survey, @asekon/react-form-renderer has got you covered.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Props](#props)
- [Form Schema](#form-schema)
- [Input Types and Props](#input-types-and-props)
- [Styling](#styling)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
- [License](#license)

## Installation

To get started with @asekon/react-form-renderer, simply install it using npm or yarn:

```bash
npm install @asekon/react-form-renderer

# or

yarn add @asekon/react-form-renderer
```

## Quick Start

Here's a simple example to get you up and running:

```jsx
import React from "react";
import { FormRenderer, FormStep } from "@asekon/react-form-renderer";

function App() {
  const formSchema: FormStep[] = [
    {
      title: "Personal Information",
      sections: [
        {
          title: "Basic Details",
          layout: { columns: 2 },
          inputs: [
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              validation: { required: "Name is required" },
            },
            {
              name: "email",
              label: "Email",
              type: "text",
              validation: { required: "Email is required" },
            },
          ],
        },
      ],
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
  };

  return <FormRenderer schema={formSchema} onSubmit={handleSubmit} />;
}

export default App;
```

Here's how this example would look:
![Alt text](https://github.com/user-attachments/assets/b58ad01c-9e00-4730-b7c5-92303a824f39)

## Features

- 📋 Single and multi-step form support
- 🎨 Highly customizable UI with theming
- 📱 Responsive design with dynamic column layout
- ✅ Built-in validation
- 🔄 Various input types (text, select, date, time, radio, file, textarea)
- 🌈 Custom styling for each component
- ♿ Accessibility-friendly

## Props

Here's a comprehensive list of props that you can use with the FormRenderer component:

| Prop Name                | Type         | Default     | Description                                                                 |
| ------------------------ | ------------ | ----------- | --------------------------------------------------------------------------- |
| `schema`                 | `FormStep[]` | Required    | The form schema that defines the structure and fields of your form.         |
| `onSubmit`               | `function`   | Required    | Callback function that receives the form values when the form is submitted. |
| `multiStep`              | `boolean`    | `false`     | Enable multi-step form functionality.                                       |
| `themeColor`             | `string`     | `"#1976d2"` | Primary color for theming the form.                                         |
| `formContainerStyle`     | `object`     | `{}`        | Custom styles for the form container.                                       |
| `stepperStyle`           | `object`     | `{}`        | Custom styles for the stepper component in multi-step forms.                |
| `stepTitleStyle`         | `object`     | `{}`        | Custom styles for step titles.                                              |
| `sectionContainerStyle`  | `object`     | `{}`        | Custom styles for section containers.                                       |
| `sectionTitleStyle`      | `object`     | `{}`        | Custom styles for section titles.                                           |
| `inputContainerStyle`    | `object`     | `{}`        | Custom styles for input containers.                                         |
| `buttonContainerStyle`   | `object`     | `{}`        | Custom styles for the button container.                                     |
| `leftButtonStyle`        | `object`     | `{}`        | Custom styles for the left (back) button.                                   |
| `rightButtonStyle`       | `object`     | `{}`        | Custom styles for the right (next/submit) button.                           |
| `validationMessageStyle` | `object`     | `{}`        | Custom styles for validation messages.                                      |

## Form Schema

The `schema` prop is an array of `FormStep` objects. Each `FormStep` has the following structure:

```typescript
interface FormStep {
  title: string;
  stepTitleStyle?: React.CSSProperties;
  sections: FormSection[];
}

interface FormSection {
  title: string;
  layout: { columns: number };
  sectionStyle?: React.CSSProperties;
  inputs: FormInput[];
}
```

## Input Types and Props

Each input in the form is defined by a `FormInput` object. Here's a detailed breakdown of the available input types and their specific props:

| Input Type | Description           | Specific Props                                                |
| ---------- | --------------------- | ------------------------------------------------------------- |
| `text`     | Standard text input   | `placeholder`, `pattern`, `patternMessage`                    |
| `select`   | Dropdown select input | `options` (array of `{label, value}` objects), `defaultValue` |
| `date`     | Date picker input     | `defaultValue`                                                |
| `time`     | Time picker input     | `defaultValue`                                                |
| `radio`    | Radio button group    | `options` (array of `{label, value}` objects), `defaultValue` |
| `file`     | File upload input     | `accept`, `buttonText`                                        |
| `textArea` | Multi-line text input | `placeholder`, `maxChars`                                     |

Common props for all input types:

- `name` (string, required): Unique identifier for the input field
- `label` (string): Label text for the input field
- `type` (string, required): Type of the input field (one of the above types)
- `validation` (object): Validation rules (e.g., `{ required: "This field is required" }`)
- `styles` (object): Custom CSS styles for the input

Example of a text input with all possible props:

```jsx
{
  name: "username",
  label: "Username",
  type: "text",
  placeholder: "Enter your username",
  validation: {
    required: "Username is required",
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "Username must be alphanumeric"
    }
  },
  styles: { border: "1px solid #ccc", borderRadius: "4px" }
}
```

## Styling

@asekon/react-form-renderer provides extensive styling options:

1. Use the `themeColor` prop to set the primary color for your form.
2. Override specific styles using the various style props (`formContainerStyle`, `stepperStyle`, etc.).
3. For more granular control, you can add custom styles to individual form elements using the `styles` property in the `FormInput` object.
4. The library uses a responsive grid system. You can control the number of columns in each section using the `layout.columns` property in the `FormSection` object.

## Advanced Usage

### Dynamic Column Layout

You can control the number of columns for inputs within a section using the `layout.columns` property:

```jsx
{
  title: "Personal Details",
  layout: { columns: 2 },
  inputs: [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Phone", type: "text" }
  ]
}
```

This will create a 2-column layout for the inputs, automatically wrapping to the next row when needed.

### Custom Validation

You can add custom validation rules to your inputs:

```jsx
{
  name: "email",
  label: "Email",
  type: "text",
  validation: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  }
}
```

### File Upload

For file inputs, you can specify accepted file types and custom button text:

```jsx
{
  name: "photo",
  label: "Photo",
  type: "file",
  accept: "image/*",
  buttonText: "Upload Photo"
}
```

### Text Area with Character Limit

For textarea inputs, you can set a maximum character limit:

```jsx
{
  name: "description",
  label: "Description",
  type: "textArea",
  maxChars: 200
}
```

## Examples

### Multi-step Form

```jsx
const multiStepSchema: FormStep[] = [
  {
    title: "Personal Info",
    sections: [
      {
        title: "Basic Details",
        layout: { columns: 2 },
        inputs: [
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
        ],
      },
    ],
  },
  {
    title: "Contact Info",
    sections: [
      {
        title: "Contact Details",
        layout: { columns: 1 },
        inputs: [
          { name: "email", label: "Email", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
        ],
      },
    ],
  },
];

<FormRenderer
  schema={multiStepSchema}
  onSubmit={handleSubmit}
  multiStep={true}
  themeColor="#4CAF50"
/>;
```

### Custom Styled Form

```jsx
<FormRenderer
  schema={formSchema}
  onSubmit={handleSubmit}
  formContainerStyle={{ backgroundColor: "#f0f0f0", padding: "2rem" }}
  stepTitleStyle={{ color: "#333", fontSize: "2rem" }}
  sectionTitleStyle={{ color: "#666", fontStyle: "italic" }}
  buttonContainerStyle={{ justifyContent: "flex-end" }}
  rightButtonStyle={{ backgroundColor: "#4CAF50", color: "white" }}
/>
```

## License

@asekon/react-form-renderer is MIT licensed.

---

We hope you enjoy using @asekon/react-form-renderer! If you have any questions or run into any issues, please don't hesitate to [open an issue](https://github.com/asekon/react-form-renderer/issues) on our GitHub repository.

Happy coding! 🚀
