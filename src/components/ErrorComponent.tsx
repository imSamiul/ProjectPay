import { FaExclamationCircle } from "react-icons/fa";

interface ErrorComponentProps {
  errorMessage: string;
  onRetry: () => void;
}

function ErrorComponent({ errorMessage, onRetry }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6  text-red-600  rounded-lg max-w-md mx-auto">
      <p className="text-4xl  text-red-500 mb-4 flex items-center justify-center">
        <FaExclamationCircle />
      </p>

      <h2 className="text-2xl font-semibold mb-2">Error Occurred</h2>
      <p className="text-center mb-4">
        {errorMessage || "An unexpected error occurred."}
      </p>
      <button onClick={onRetry} className="btn btn-error btn-outline w-32">
        Retry
      </button>
    </div>
  );
}

export default ErrorComponent;
