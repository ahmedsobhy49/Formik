import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  textarea: "",
  select: "",
  phoneNumbers: [""],
};

function handleSubmit(values) {
  try {
    const res = axios.post("", values);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name field is required")
    .min(8, "name should be at least 8 characters")
    .matches(/^\S*$/, "name should not contain spaces"),
  email: Yup.string()
    .required("Email field is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  rePassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"), // Validate that repassword matches password
});

// field level validation
function validateTextarea(value) {
  let error;
  if (!value) {
    error = "This Field is Required";
  }
  return error;
}

export default function Form2() {
  const phoneWarningMessage = useRef(null);
  const handleMouseEnter = () => {
    if (phoneWarningMessage.current) {
      phoneWarningMessage.current.classList.remove("hidden");
    }
  };

  const handleMouseLeave = () => {
    if (phoneWarningMessage.current) {
      phoneWarningMessage.current.classList.add("hidden");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-1/2 bg-gray-100">
      <Formik
        validationSchema={validationSchema} // validation schema using Yup
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnChange={false}
        // validateOnBlur={false}
      >
        <Form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            With Formik Component
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <Field
              type="text"
              id="name2"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="name"
              className="text-red-500 text-sm mt-1"
              component="p"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Field
              type="email"
              id="email2"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="email">
              {(error) => <p className="text-red-500 text-sm mt-1"> {error}</p>}
            </ErrorMessage>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Field
              type="password"
              id="password2"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              className="text-red-500 text-sm mt-1"
              component="p"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="rePassword2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <Field name="rePassword">
              {({ form }) => {
                console.log(form.errors);
                return (
                  <input
                    id="rePassword2"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                );
              }}
            </Field>
            <ErrorMessage
              name="rePassword"
              className="text-red-500 text-sm mt-1"
              component="p"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="textarea"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Text Area
            </label>
            <Field
              id="textarea"
              validate={validateTextarea}
              name="textarea"
              as="textarea"
              className="w-full px-4 py-2 border resize-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="textarea"
              component={"p"}
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select
            </label>
            <Field
              id="select"
              name="select"
              as="select"
              className="w-full px-4 py-2 border resize-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="select"
              className="text-red-500 text-sm mt-1"
              component="p"
            />
          </div>

          <div className="mb-6">
            <FieldArray name="phoneNumbers">
              {({ remove, push, form }) => {
                // console.log(form.values);
                return (
                  <div className="space-y-4">
                    {form.values.phoneNumbers.map((phone, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex-1">
                            <label
                              htmlFor={`phone${index}`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone {index + 1}
                            </label>
                            <div className="flex items-center gap-2">
                              <Field
                                name={`phoneNumbers[${index}]`}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md transition duration-200"
                                >
                                  -
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="relative w-fit">
                      <button
                        type="button"
                        onClick={() => {
                          // Check if the all phone numbers field has a value before pushing a new one
                          const allFieldHasValue =
                            form.values.phoneNumbers.every((phone) => phone);
                          if (allFieldHasValue) {
                            push("");
                          }
                        }}
                        className={`text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition duration-200 ${
                          !form.values.phoneNumbers.every((phone) => phone)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        Add More Phone Number
                      </button>
                      {!form.values.phoneNumbers.every((phone) => phone) ? (
                        <p
                          ref={phoneWarningMessage}
                          className="text-xs absolute top-0  hidden left-full text-red-600 w-full p-[5px]"
                        >
                          Please fill the existing field before adding another
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
