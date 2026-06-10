import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold text-white">
        AI Builder
      </h1>

      <div className="space-x-4">
        <button className="text-white">Login</button>

        <button className="bg-white text-black px-4 py-2 rounded-lg">
          Register
        </button>
      </div>
    </nav>
  );
}