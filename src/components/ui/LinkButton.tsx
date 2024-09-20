import { Link } from "react-router-dom";

type LinkButtonProps = {
  title: string;
  to: string;
  classNames: string;
};

function LinkButton({ title, to, classNames }: LinkButtonProps) {
  return (
    <Link to={to} className={classNames}>
      {title}
    </Link>
  );
}

export default LinkButton;
