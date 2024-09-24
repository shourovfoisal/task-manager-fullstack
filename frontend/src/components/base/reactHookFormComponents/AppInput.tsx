import { Controller } from "react-hook-form";

type Props = {
  name: string;
  // TODO - have to fix this typescript issue
  control: any;
  type?: "password";
  label: string;
  placeholder?: string;
};

function AppInput({ name, control, type, label, placeholder }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            <div>
              <div>
                <label htmlFor={name}>{label}</label>
              </div>
              <div>
                <input
                  {...(type ? { type } : {})}
                  {...field}
                  placeholder={placeholder}
                  id={name}
                />
              </div>
            </div>
            <div>
              <span>{error?.message}</span>
            </div>
          </div>
        );
      }}
    />
  );
}

export default AppInput;
