import React, { HTMLProps } from "react";

type InputFieldPropsType = {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string; // Optional, defaults to 'text'
  name: string;
  className?: HTMLProps<HTMLElement>["className"];
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  className,
  ...props
}: InputFieldPropsType) {
  return (
    <div className="form-control w-full">
      <label className="label md:text-lg font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered ${className}`}
        value={value ?? ""}
        onChange={onChange}
        name={name}
        {...props}
      />
    </div>
  );
}

export default InputField;
