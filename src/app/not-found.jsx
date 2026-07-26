import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-5">
      <h1 className="text-8xl font-bold text-red-500">404</h1>

      <h2 className="text-3xl font-semibold mt-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}