import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl font-semibold">Oh no, an error has occurred!</h1>
      <p className="text-lg my-4">404 - Page not found</p>
      <Link to="/" className="text-blue-600 mt-4">
        Return Home
      </Link>
    </div>
  );
};

export default ErrorPage;
