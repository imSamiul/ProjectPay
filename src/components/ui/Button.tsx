import { HTMLProps } from "react";

interface ButtonProps {
  className?: HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ className, children }: ButtonProps) {
  return (
    <button
      className={`btn bg-mallard-500 outline-none border-none hover:bg-mallard-600 dark:text-black  ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
