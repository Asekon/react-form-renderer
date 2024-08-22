import "./App.css";
// import FormRenderer from "./FormRenderer/FormRenderer";
import { FormRenderer } from "@asekon/react-form-renderer";
import { FormStep } from "./types";

function App() {
  const formSchema: FormStep[] = [
    {
      title: "Main Info",
      // stepTitleStyle: { color: "blue", fontWeight: "bold" },
      sections: [
        {
          title: "Personal Details",
          layout: { columns: 2 },
          // sectionStyle: { backgroundColor: "#f0f0f0", padding: "10px" },
          inputs: [
            {
              name: "patientName",
              label: "Name",
              type: "text",
              placeholder: "Patient Name",
              validation: { required: "Name is required" },
              styles: {},
            },
            {
              name: "fileId",
              label: "File ID",
              type: "text",
              placeholder: "Patient File ID",
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
              validation: { required: "email is required" },
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              patternMessage: "Invalid email format",
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
              accept: "Image",
              // buttonText: "Upload Photo",
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
              validation: { required: "record1 is required" },
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
      <FormRenderer
        schema={formSchema}
        onSubmit={handleSubmit}
        multiStep
        themeColor="#1976d2"
        // formContainerStyle={{}}
        // stepperStyle={{
        //   stepper: {
        //     // marginBottom: "2rem",
        //   },
        //   step: {
        //     // Custom styles for each step
        //   },
        //   indicator: {
        //     backgroundColor: "#bdc3c7",
        //     color: "#ffffff",
        //   },
        //   activeIndicator: {
        //     backgroundColor: "#3498db",
        //   },
        //   label: {
        //     color: "#7f8c8d",
        //   },
        //   activeLabel: {
        //     color: "#2c3e50",
        //     fontWeight: "bold",
        //   },
        //   connector: {
        //     backgroundColor: "#bdc3c7",
        //   },
        //   activeConnector: {
        //     backgroundColor: "#3498db",
        //   },
        // }}
        // stepTitleStyle={{ textAlign: "left" }}
        // sectionContainerStyle={{ textAlign: "left" }}
        // sectionTitleStyle={{}}
        // inputContainerStyle={{}}
        // buttonContainerStyle={{}}
        // leftButtonStyle={{}}
        // rightButtonStyle={{}}
        // validationMessageStyle={{}}
      />
    </>
  );
}

export default App;
