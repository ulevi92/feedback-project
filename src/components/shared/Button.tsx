import { FC } from "react";

interface ButtonProps {
  version?: string;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, version, type, isDisabled }) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};
export default Button;
