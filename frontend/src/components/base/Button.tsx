type Props = React.PropsWithChildren & {
  type: "button" | "reset" | "submit";
};

const Button = ({ type = "button", children }: Props) => {
  return (
    <button
      type={type}
      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
    >
      {children}
    </button>
  );
};

export default Button;
