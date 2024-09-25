type Props = React.PropsWithChildren & {
  link: string;
};

const Button = ({ link, children }: Props) => {
  return (
    <a
      href={link}
      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
    >
      {children}
    </a>
  );
};

export default Button;
