import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUserContext } from "../../../hooks/useUserContext";
import { handleSetToken } from "../../../utils/handleJwtLocalstorage";
import { Button } from "../../base";
import { AppInput } from "../../base/reactHookFormComponents";

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  type LoginFormType = yup.InferType<typeof loginSchema>;

  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  async function loginUser(data: LoginFormType) {
    const result = await axios.post("/auth/login", data);
    if (result.status === 200) {
      setUser({
        name: result.data?.name,
        email: result.data?.email,
      });
      const jwtToken = result.headers.get("Authorization");

      if (jwtToken) {
        handleSetToken(jwtToken);
      }

      navigate("/dashboard");
    }
  }

  function onSubmit(formData: LoginFormType) {
    loginUser(formData);
  }

  useEffect(() => {
    if (user?.email) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <section className="text-gray-600 body-font">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign In
            </h2>
            <AppInput
              control={control}
              label="Username"
              name="username"
              placeholder="Enter your username"
            />
            <AppInput
              type="password"
              control={control}
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <Button type="submit">Submit</Button>
            <p className="text-xs text-gray-500 mt-3">
              *All the fields are mandatory
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signin;
