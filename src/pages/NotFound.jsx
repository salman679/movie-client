import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! The page you are looking for doesn&apos;t exist.
        </p>
        <Link to="/home" className="text-blue-400 hover:text-blue-600">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
