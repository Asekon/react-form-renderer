# React Form Renderer

Welcome to React Form Renderer! 🎉 This powerful and flexible library allows you to create dynamic, single/multi-step forms with ease. Whether you're building a simple contact form or a complex, multi-page survey, React Form Renderer has got you covered.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Props](#props)
- [Form Schema](#form-schema)
- [Styling](#styling)
- [Examples](#examples)
- [License](#license)

## Installation

To get started with React Form Renderer, simply install it using npm or yarn:

```bash
npm install react-form-renderer

# or

yarn add react-form-renderer
```

## Quick Start

Here's a simple example to get you up and running:

```jsx
import React from 'react';
import FormRenderer from 'react-form-renderer';

const MyForm = () => {
  const formSchema = [
    {
      title: "Personal Information",
      sections: [
        {
          title: "Basic Details",
          inputs: [
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              validation: { required: "Name is required" }
            },
            {
              name: "email",
              label: "Email",
              type: "text",
              validation: { required: "Email is required" }
            }
          ]
        }
      ]
    }
  ];

  const handleSubmit = (values) => {
    console.log(values);
  };

  return <FormRenderer schema={formSchema} onSubmit={handleSubmit} />;
};

export default MyForm;
```

## Features

- 📋 Multi-step form support
- 🎨 Highly customizable UI
- 📱 Responsive design
- ✅ Built-in validation
- 🔄 Dynamic form fields
- 🌈 Theming support
- ♿ Accessibility features

## Props

Here's a comprehensive list of props that you can use with the FormRenderer component:

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `schema` | `FormStep[]` | Required | The form schema that defines the structure and fields of your form. |
| `onSubmit` | `function` | Required | Callback function that receives the form values when the form is submitted. |
| `multiStep` | `boolean` | `false` | Enable multi-step form functionality. |
| `themeColor` | `string` | `"#1976d2"` | Primary color for theming the form. |
| `formContainerStyle` | `object` | `{}` | Custom styles for the form container. |
| `stepperStyle` | `object` | `{}` | Custom styles for the stepper component in multi-step forms. |
| `stepTitleStyle` | `object` | `{}` | Custom styles for step titles. |
| `sectionContainerStyle` | `object` | `{}` | Custom styles for section containers. |
| `sectionTitleStyle` | `object` | `{}` | Custom styles for section titles. |
| `inputContainerStyle` | `object` | `{}` | Custom styles for input containers. |
| `buttonContainerStyle` | `object` | `{}` | Custom styles for the button container. |
| `leftButtonStyle` | `object` | `{}` | Custom styles for the left (back) button. |
| `rightButtonStyle` | `object` | `{}` | Custom styles for the right (next/submit) button. |
| `validationMessageStyle` | `object` | `{}` | Custom styles for validation messages. |

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

interface FormInput {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'time' | 'radio' | 'file' | 'textArea';
  placeholder?: string;
  validation?: {
    required?: string;
    // Add other validation rules as needed
  };
  options?: { label: string; value: string }[]; // For select and radio inputs
  defaultValue?: any;
  pattern?: RegExp; // For text inputs
  patternMessage?: string;
  styles?: React.CSSProperties;
  accept?: string; // For file inputs
  buttonText?: string; // For file inputs
  maxChars?: number; // For textArea inputs
}
```

## Styling

React Form Renderer provides extensive styling options:

1. Use the `themeColor` prop to set the primary color for your form.
2. Override specific styles using the various style props (`formContainerStyle`, `stepperStyle`, etc.).
3. For more granular control, you can add custom styles to individual form elements using the `styles` property in the `FormInput` object.

## Examples

### Multi-step Form

```jsx
const multiStepSchema = [
  {
    title: "Personal Info",
    sections: [
      {
        title: "Basic Details",
        layout: { columns: 2 },
        inputs: [
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" }
        ]
      }
    ]
  },
  {
    title: "Contact Info",
    sections: [
      {
        title: "Contact Details",
        layout: { columns: 1 },
        inputs: [
          { name: "email", label: "Email", type: "text" },
          { name: "phone", label: "Phone", type: "text" }
        ]
      }
    ]
  }
];

<FormRenderer 
  schema={multiStepSchema} 
  onSubmit={handleSubmit} 
  multiStep={true} 
  themeColor="#4CAF50"
/>
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

React Form Renderer is MIT licensed. See [LICENSE](LICENSE) for more information.

---

We hope you enjoy using React Form Renderer! If you have any questions or run into any issues, please don't hesitate to [open an issue](https://github.com/your-username/react-form-renderer/issues) on our GitHub repository.

Happy coding! 🚀
