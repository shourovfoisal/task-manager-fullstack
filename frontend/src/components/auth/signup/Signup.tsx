import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "../../base";
import { AppInput } from "../../base/reactHookFormComponents";

const Signup = () => {
  const navigate = useNavigate();

  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  type SignupFormType = yup.InferType<typeof signupSchema>;

  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
    resolver: yupResolver(signupSchema),
  });

  async function registerUser(data: SignupFormType) {
    const result = await axios.post("/auth/register", data);
    if (result.status === 201) {
      navigate("/signin");
    }
  }

  function onSubmit(formData: SignupFormType) {
    registerUser(formData);
  }

  return (
    <section className="text-gray-600 body-font">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <AppInput
              control={control}
              label="Name"
              name="name"
              placeholder="Enter your full name"
            />
            <AppInput
              control={control}
              label="Email"
              name="email"
              placeholder="Enter your email address"
            />
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

export default Signup;
