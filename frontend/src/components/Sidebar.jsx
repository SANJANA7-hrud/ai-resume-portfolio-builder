import { Link } from "react-router-dom";

export default function Sidebar() {
  const name =
    localStorage.getItem("name");

  return (
    <div className="w-64 bg-[#171717] text-white h-screen p-4 flex flex-col justify-between">

      <div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            AI Career Assistant
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome, {name}
          </p>
        </div>

        <div className="space-y-3">

          <Link to="/dashboard">
            <button className="w-full text-left p-3 rounded-lg bg-[#262626] hover:bg-[#333]">
              📄 Resume Builder
            </button>
          </Link>

          <Link to="/cover-letter">
            <button className="w-full text-left p-3 rounded-lg bg-[#262626] hover:bg-[#333]">
              ✉️ Cover Letter
            </button>
          </Link>

          <Link to="/portfolio">
            <button className="w-full text-left p-3 rounded-lg bg-[#262626] hover:bg-[#333]">
              🌐 Portfolio Builder
            </button>
          </Link>

          <Link to="/ats">
            <button className="w-full text-left p-3 rounded-lg bg-[#262626] hover:bg-[#333]">
              🤖 ATS Analyzer
            </button>
          </Link>

          <Link to="/profile">
            <button className="w-full text-left p-3 rounded-lg bg-[#262626] hover:bg-[#333]">
                👤 Profile
            </button>
         </Link>

        </div>

      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="w-full bg-red-600 p-3 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>

    </div>
  );
}
