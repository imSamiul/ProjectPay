type ButtonProps = {
  title: string;
  classNames: string;
};

function Button({ title, classNames }: ButtonProps) {
  return <button className={`btn ${classNames}`}>{title}</button>;
}

export default Button;
