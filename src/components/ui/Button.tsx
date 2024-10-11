import { HTMLProps } from "react";

interface ButtonProps {
  className?: HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ className, children }: ButtonProps) {
  return (
    <button
      className={`btn bg-martinique-500 outline-none border-none hover:bg-martinique-600   ${className} text-white  btn-sm md:btn-md`}
    >
      {children}
    </button>
  );
}

export default Button;
