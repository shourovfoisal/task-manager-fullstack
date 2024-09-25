import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export type SignupFormType = yup.InferType<typeof signupSchema>;

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;

export const taskFormSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, "Should not exceed 50 characters")
    .required("Task title is required"),
  description: yup
    .string()
    .max(2000, "Should not exceed 2000 characters")
    .required("Task description is required"),
  dueDate: yup.string().required("Task due date is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high", ""])
    .required("Task priority is required"),
  status: yup
    .string()
    .oneOf(["pending", "in_progress", "completed", ""])
    .required("Task status is required"),
});

export type TaskFormType = yup.InferType<typeof taskFormSchema>;
