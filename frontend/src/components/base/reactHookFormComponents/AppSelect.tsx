import { Controller } from "react-hook-form";

type SelectOptionType = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  // TODO - have to fix this typescript issue
  control: any;
  label: string;
  options: SelectOptionType[];
};

function AppSelect({ name, control, label, options }: Readonly<Props>) {
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
              <select
                {...field}
                id={name}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select an option</option>
                {options?.map((eachOption) => (
                  <option key={eachOption?.value} value={eachOption?.value}>
                    {eachOption?.label}
                  </option>
                ))}
              </select>
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

export default AppSelect;
