import { Link } from "react-router-dom";
import { FaGooglePlus } from "react-icons/fa";

const SignupPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-orange-100 p-8 rounded-lg shadow-md flex items-center ">
        <img className="w-1/2 " src="./src/assets/dog-img.jpg" alt="ảnh chó" />
        <div className="w-1/2 ml-8">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <form>
            {/* Your login form goes here */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Retype password:
              </label>
              <input
                type="password"
                id="retypepassword"
                name="retypepassword"
                placeholder=" Retype Password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto hover:bg-orange-500"
            >
              Create account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <p>
              Already. <Link to={"/login"}>Login</Link>
            </p>
            <div className="flex flex-row justify-around ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>

              <p className="my-2 font-bold">or</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
          </form>
          <Link
            to={"/googlelogin"}
            className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
          >
            <span className="mx-2">Login with GOOGLE</span>
            <FaGooglePlus className=" w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
