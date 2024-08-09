import "./App.css";
import FormRenderer from "./FormRenderer/FormRenderer";

function App() {
  interface FormSection {
    title: string;
    layout: { columns: number };
    inputs: FormInputField[];
  }

  interface FormStep {
    title: string;
    sections: FormSection[];
  }
  interface FormInputField {
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
  const formSchema: FormStep[] = [
    {
      title: "Main Info",
      sections: [
        {
          title: "Personal Details",
          layout: { columns: 2 },
          inputs: [
            {
              name: "patientName",
              label: "Name",
              type: "text",
              placeholder: "Patient Name",
              validation: { required: "Name is required" },
            },
            {
              name: "fileId",
              label: "File ID",
              type: "text",
              placeholder: "Patient File ID",
              validation: { required: "File ID is required" },
            },
            {
              name: "patientType",
              label: "Patient Type",
              type: "select",
              options: [
                { label: "Individual", value: "individual" },
                { label: "Corporate", value: "corporate" },
              ],
              defaultValue: "individual",
            },
            {
              name: "time",
              label: "Test Time",
              type: "time",
            },
          ],
        },
        {
          title: "Contact Details",
          layout: { columns: 1 },
          inputs: [
            {
              name: "mobileNumber",
              label: "Mobile Number",
              type: "text",
              placeholder: "Patient Mobile Number",
            },
            {
              name: "email",
              label: "Email",
              type: "text",
              placeholder: "Patient Email",
            },
          ],
        },
        {
          title: "Other Details",
          layout: { columns: 2 },
          inputs: [
            {
              name: "gender",
              label: "Gender",
              type: "radio",
              options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ],
            },
            {
              name: "birthdate",
              label: "Birthdate",
              type: "date",
            },
            {
              name: "occupation",
              label: "Occupation",
              type: "text",
              placeholder: "Patient Occupation",
            },
            {
              name: "photo",
              label: "Photo",
              type: "file",
            },
            {
              name: "textarea",
              label: "Textarea",
              type: "textArea",
              maxChars: 60,
            },
          ],
        },
      ],
    },
    {
      title: "Medical Record",
      sections: [
        {
          title: "Records",
          layout: { columns: 2 },
          inputs: [
            {
              name: "record1",
              label: "Record 1",
              type: "text",
              placeholder: "Record Info",
            },
            {
              name: "record2",
              label: "Record 2",
              type: "text",
              placeholder: "Record Info",
            },
          ],
        },
      ],
    },
    {
      title: "Appointments",
      sections: [
        {
          title: "Scheduled Appointments",
          layout: { columns: 1 },
          inputs: [
            {
              name: "appointment1",
              label: "Appointment 1",
              type: "text",
              placeholder: "Appointment Info",
            },
            {
              name: "appointment2",
              label: "Appointment 2",
              type: "text",
              placeholder: "Appointment Info",
            },
          ],
        },
      ],
    },
  ];
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <FormRenderer schema={formSchema} onSubmit={handleSubmit} />
    </>
  );
}

export default App;
