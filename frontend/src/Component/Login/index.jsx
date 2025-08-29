import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  return (
    <div className="bg-yellow-100 w-[100%] h-[100vh] flex  justify-around items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-950 font-serif">
          Login to ADORE
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have account ?{" "}
            <span className="text-amber-400 font-semibold">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
