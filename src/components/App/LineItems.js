import React from "react";
import { Form, Button, Input, ButtonGroup } from "@fluentui/react-northstar";

const fields = [
  {
    label: "First name",
    name: "firstName",
    id: "first-name-shorthand",
    key: "first-name",
    required: true,
    control: {
      as: Input,
      showSuccessIndicator: false
    }
  },
  {
    label: "Last name",
    name: "lastName",
    id: "last-name-shorthand",
    key: "last-name",
    required: true,
    control: {
      as: Input,
      showSuccessIndicator: false
    }
  },
  {
    label: "I agree to the Terms and Conditions",
    control: {
      as: "input"
    },
    type: "checkbox",
    id: "conditions-shorthand",
    key: "conditions"
  },
  {
    control: {
      as: Button,
      content: ["submit", "   cancel"]
    },
    type: "ButtonGroup"
  }
];

const LineItems = () => (
  <Form
    onSubmit={() => {
      alert("Form submitted");
    }}
    fields={fields}
  />
);

export default LineItems;
