import { HTMLProps } from "react";

interface ButtonProps {
  title: string;
  className?: HTMLProps<HTMLElement>["className"];
}

function Button({ title, className }: ButtonProps) {
  return <button className={`btn ${className}`}>{title}</button>;
}

export default Button;
