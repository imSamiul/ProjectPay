import { Link } from "@tanstack/react-router";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-base-100 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 mt-2">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
