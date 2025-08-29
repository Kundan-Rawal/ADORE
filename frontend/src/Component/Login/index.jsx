import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
const Login = () => {
  const [logindet, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    const { email, password } = logindet;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const payload = {
        email: logindet.email,
        password: logindet.password,
      };

      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        // Save token in cookies
        Cookies.set("token", data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        setFormData({ email: "", password: "" });

        // ✅ Redirect to home page
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-yellow-100 w-[100%] h-[100vh] flex  justify-around items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-950 font-serif">
          Login to ADORE
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your username"
              onChange={(e) =>
                setFormData({ ...logindet, email: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...logindet, password: e.target.value })
              }
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
