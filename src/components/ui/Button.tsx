import { HTMLProps } from "react";

interface ButtonProps {
  className?: HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  className,
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn outline-none border-none   ${className}  btn-sm md:btn-md`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
