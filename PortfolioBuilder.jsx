import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function PortfolioBuilder() {

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [portfolio, setPortfolio] =
    useState("");

  const generatePortfolio = async () => {

    try {

      const response =
        await API.post(
          "/generate-portfolio",
          {
            name,
            bio,
            skills,
            projects,
            linkedin,
            github
          }
        );

      setPortfolio(
        response.data.portfolio
      );

    } catch (error) {

      alert(
        "Failed to generate portfolio"
      );

    }

  };

  return (

    <div className="flex min-h-screen bg-[#202123]">

      <Sidebar />

      <div className="flex-1 p-8 text-white">

        <h1 className="text-3xl font-bold mb-6">
          Portfolio Builder
        </h1>

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          placeholder="Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          rows="3"
          placeholder="Bio"
          onChange={(e) =>
            setBio(e.target.value)
          }
        />

        <textarea
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          rows="3"
          placeholder="Skills"
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />

        <textarea
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          rows="3"
          placeholder="Projects"
          onChange={(e) =>
            setProjects(e.target.value)
          }
        />

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          placeholder="LinkedIn URL"
          onChange={(e) =>
            setLinkedin(e.target.value)
          }
        />

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-3"
          placeholder="GitHub URL"
          onChange={(e) =>
            setGithub(e.target.value)
          }
        />

        <button
          onClick={generatePortfolio}
          className="bg-green-600 px-6 py-3 rounded"
        >
          Generate Portfolio
        </button>

        {portfolio && (

          <div className="mt-8 bg-[#2b2d31] p-6 rounded">

            <h2 className="text-2xl font-bold mb-4">
              Portfolio Content
            </h2>

            <pre className="whitespace-pre-wrap">
              {portfolio}
            </pre>

          </div>

        )}

      </div>

    </div>

  );

}