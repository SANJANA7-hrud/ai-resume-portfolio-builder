import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const loginUser = async () => {
    try {
      const res = await API.post(
        "/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user_id",
        res.data.user_id
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#202123] flex items-center justify-center">
      <div className="bg-[#2b2d31] p-8 rounded-xl w-[400px]">
        <h1 className="text-white text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          className="w-full p-3 rounded mb-3"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-3 rounded mb-4"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={loginUser}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="text-gray-300 mt-4">
          New user?{" "}
          <Link
            className="text-green-400"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}