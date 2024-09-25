import { Controller } from "react-hook-form";

type Props = {
  name: string;
  // TODO - have to fix this typescript issue
  control: any;
  label: string;
};

function AppDateInput({ name, control, label }: Readonly<Props>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="relative mb-4">
            <div>
              <label htmlFor={name} className="leading-7 text-sm text-gray-600">
                {label}
              </label>
              <input
                {...field}
                type="date"
                id={name}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div>
              <span className="text-red-700 text-sm">{error?.message}</span>
            </div>
          </div>
        );
      }}
    />
  );
}

export default AppDateInput;
