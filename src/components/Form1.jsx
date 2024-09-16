import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
};

function handleSubmit(values) {
  try {
    const res = axios.post("", values);
  } catch (error) {}
}

function validateEmail(email) {
  if (!email) {
    return "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid email address";
  }
}

function validatePassword(password) {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.includes(" ")) {
    errors.name = "name should not contain spaces";
  } else if (values.name.length < 8) {
    errors.name = "name should be at least 8 characters";
  }

  errors.email = validateEmail(values.email);

  // validate password
  errors.password = validatePassword(values.password);

  if (!values.rePassword) {
    errors.rePassword = "Confirm Password is required";
  } else if (values.password !== values.rePassword) {
    errors.rePassword = "Passwords do not match";
  }
  return errors;
}

export default function Form1() {
  const formik = useFormik({
    initialValues,
    validate, // custom validation function
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  return (
    <div className="flex justify-center items-center min-h-screen w-1/2 bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          With useFormik Hook
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="rePassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.rePassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
