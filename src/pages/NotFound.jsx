export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Oops! Page not found</p>
        <p className="text-gray-500 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => window.location.assign("/")}
          className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go to Homepage
        </button>
      </div>
      <div className="mt-10">
        <img
          src="https://i.ibb.co/4fYypmW/404-error.png"
          alt="Page not found illustration"
          className="w-72"
        />
      </div>
    </div>
  );
}
