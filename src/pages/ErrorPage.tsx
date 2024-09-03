import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center mt-6">
      <h2 className="font-bold text-2xl">No page found</h2>
      <button className="bg-red-500 text-white px-4 py-2 my-4 rounded">
        <Link to="/">Go back</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
