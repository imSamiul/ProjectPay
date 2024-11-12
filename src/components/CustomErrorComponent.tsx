import { FaExclamationCircle } from "react-icons/fa";

interface ErrorProps {
  error: { message: string };
  reset: () => void;
}

function CustomErrorComponent({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-red-600 rounded-lg max-w-md mx-auto">
      <p className="text-4xl text-red-500 mb-4 flex items-center justify-center">
        <FaExclamationCircle />
      </p>
      <h2 className="text-2xl font-semibold mb-2">An error occurred!</h2>
      <p className="text-center mb-4">
        {error.message || "An unexpected error occurred."}
      </p>
      <button onClick={reset} className="btn btn-error btn-outline w-32">
        Retry
      </button>
    </div>
  );
}

export default CustomErrorComponent;
