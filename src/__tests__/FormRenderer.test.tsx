import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FormStep } from "../types";
import FormRenderer from "../FormRenderer/FormRenderer";

const mockSchema: FormStep[] = [
  {
    title: "Test Form",
    sections: [
      {
        title: "Personal Info",
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

const mockSubmit = vi.fn();

describe("FormRenderer", () => {
  it("renders form with correct title and inputs", async () => {
    await act(async () => {
      render(<FormRenderer schema={mockSchema} onSubmit={mockSubmit} />);
    });

    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("displays validation errors when submitting empty form", async () => {
    await act(async () => {
      render(<FormRenderer schema={mockSchema} onSubmit={mockSubmit} />);
      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    await act(async () => {
      render(<FormRenderer schema={mockSchema} onSubmit={mockSubmit} />);
      await userEvent.type(screen.getByLabelText("Full Name"), "John Doe");
      await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        fullName: "John Doe",
        email: "john@example.com",
      });
    });
  });
});
