import React from "react";

type InputFieldPropsType = {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string; // Optional, defaults to 'text'
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  ...props
}: InputFieldPropsType) {
  return (
    <div className="form-control">
      <label className="label md:text-lg font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered"
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
    </div>
  );
}

export default InputField;
