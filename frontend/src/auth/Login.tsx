import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AppInput } from "../components/base/reactHookFormComponents";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  type LoginFormType = yup.InferType<typeof loginSchema>;

  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  function onSubmit(formData: LoginFormType) {
    setUser({
      // TODO - have to handle name and the other properties
      name: "Anonymous User",
      email: formData?.email,
    });
  }

  useEffect(() => {
    if (user?.email) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        control={control}
        name="email"
        label="Email"
        placeholder="Please enter email address"
      />
      <AppInput
        control={control}
        name="password"
        type="password"
        label="Password"
        placeholder="Please enter email address"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
