import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function CoverLetterBuilder() {

  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [company, setCompany] = useState("");

  const [letter, setLetter] = useState("");

  const generateLetter = async () => {

    try {

      const response =
        await API.post(
          "/generate-cover-letter",
          {
            name,
            job_role: jobRole,
            skills,
            company
          }
        );

      setLetter(
        response.data.cover_letter
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to generate cover letter"
      );

    }

  };

  return (

    <div className="flex min-h-screen bg-[#202123]">

      <Sidebar />

      <div className="flex-1 p-8 text-white">

        <h1 className="text-3xl font-bold mb-6">
          Cover Letter Generator
        </h1>

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-4"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-4"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) =>
            setJobRole(e.target.value)
          }
        />

        <input
          className="w-full p-3 rounded bg-[#2b2d31] mb-4"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        <textarea
          className="w-full p-3 rounded bg-[#2b2d31] mb-4"
          rows="4"
          placeholder="Skills"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />

        <button
          onClick={generateLetter}
          className="bg-green-600 px-6 py-3 rounded"
        >
          Generate Cover Letter
        </button>

        {letter && (

          <div className="mt-8 bg-[#2b2d31] p-6 rounded">

            <h2 className="text-2xl font-bold mb-4">
              Generated Cover Letter
            </h2>

            <pre className="whitespace-pre-wrap">
              {letter}
            </pre>

          </div>

        )}

      </div>

    </div>

  );

}