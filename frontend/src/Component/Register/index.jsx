import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, phone } = formData;

    if (!name || name.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        id: uuidv4(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      const res = await axios.post("https://adore-upde.onrender.com/register", payload);
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Server not reachable. Check backend & CORS setup.");
      }
    }
  };

  return (
    <>
      <div className="bg-yellow-100 w-[100%] h-[100vh] flex justify-around items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-950 font-serif">
            Register to ADORE
          </h2>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          {message && <p className="text-green-600 mb-3">{message}</p>}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your username"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="number"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 transition"
            >
              Register
            </button>
          </form>
          <p className="text-gray-700 text-center mt-2">
            Already Registered ?
            <Link to="/login">
              <span className="text-amber-600  font-bold"> Login In</span>
            </Link>
          </p>
        </div>
      </div>
      <footer className="bg-amber-400 text-white py-6">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} ADORE. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Register;
