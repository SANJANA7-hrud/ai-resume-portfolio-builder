import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      await API.post("/register", form);

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#202123] flex items-center justify-center">
      <div className="bg-[#2b2d31] p-8 rounded-xl w-[400px]">
        <h1 className="text-white text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          className="w-full p-3 rounded mb-3"
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full p-3 rounded mb-3"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          className="w-full p-3 rounded mb-4"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={registerUser}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

        <p className="text-gray-300 mt-4">
          Already have an account?{" "}
          <Link
            className="text-green-400"
            to="/"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}