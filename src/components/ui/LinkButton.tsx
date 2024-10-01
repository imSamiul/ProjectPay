import { Link, LinkOptions, ToOptions } from "@tanstack/react-router";

type LinkButtonProps = {
  title: string;
  to: LinkOptions["to"];
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
