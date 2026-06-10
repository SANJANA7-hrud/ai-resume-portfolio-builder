import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Dashboard() {

  const [name, setName] = useState("");
  const [education, setEducation] =
    useState("");
  const [skills, setSkills] =
    useState("");
  const [projects, setProjects] =
    useState("");

  const [resume, setResume] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState([]);

  const loadHistory = async () => {

    try {

      const user_id =
        localStorage.getItem(
          "user_id"
        );

      const response =
        await API.get(
          `/resumes/${user_id}`
        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadHistory();

  }, []);

  const generateResume = async () => {

    try {

      setLoading(true);

      const response =
        await API.post(
          "/generate-resume",
          {
            name,
            education,
            skills,
            projects,
          }
        );

      setResume(
        response.data.resume
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to generate resume"
      );

    } finally {

      setLoading(false);

    }

  };

  const saveResume = async () => {

    try {

      await API.post(
        "/save-resume",
        {
          user_id:
            localStorage.getItem(
              "user_id"
            ),

          title:
            "Generated Resume",

          content:
            resume,
        }
      );

      alert(
        "Resume Saved Successfully"
      );

      loadHistory();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to save resume"
      );

    }

  };

  const downloadResume = async () => {

    try {

      const response =
        await fetch(
          "http://127.0.0.1:5000/download-resume",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              resume,
            }),
          }
        );

      if (!response.ok) {

        alert(
          "Failed to generate PDF"
        );

        return;

      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "resume.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {

      console.log(error);

      alert(
        "PDF Download Failed"
      );

    }

  };

  return (

    <div className="flex min-h-screen bg-[#202123]">

      <Sidebar />

      <div className="flex-1 p-8 text-white">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            AI Resume Generator
          </h1>

          <div className="bg-[#2b2d31] px-4 py-2 rounded-lg">
            {
              localStorage.getItem(
                "name"
              )
            }
          </div>

        </div>

        <div className="bg-[#2b2d31] p-6 rounded-xl mb-8">

          <div className="grid grid-cols-2 gap-4 mb-4">

            <input
              className="p-3 rounded bg-[#202123]"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <input
              className="p-3 rounded bg-[#202123]"
              placeholder="Education"
              value={education}
              onChange={(e) =>
                setEducation(
                  e.target.value
                )
              }
            />

          </div>

          <textarea
            rows="3"
            className="w-full p-3 rounded bg-[#202123] mb-4"
            placeholder="Skills"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
          />

          <textarea
            rows="3"
            className="w-full p-3 rounded bg-[#202123] mb-4"
            placeholder="Projects"
            value={projects}
            onChange={(e) =>
              setProjects(
                e.target.value
              )
            }
          />

          <button
            onClick={
              generateResume
            }
            className="bg-green-600 px-6 py-3 rounded-lg"
          >
            {loading
              ? "Generating..."
              : "Generate Resume"}
          </button>

        </div>

        {resume && (

          <div className="bg-[#2b2d31] p-6 rounded-xl mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Generated Resume
            </h2>

            <pre className="whitespace-pre-wrap text-gray-200">
              {resume}
            </pre>

            <div className="flex gap-3 mt-6">

              <button
                onClick={
                  saveResume
                }
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Save Resume
              </button>

              <button
                onClick={
                  downloadResume
                }
                className="bg-purple-600 px-4 py-2 rounded"
              >
                Download PDF
              </button>

            </div>

          </div>

        )}

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Resume History
          </h2>

          {history.length === 0 ? (

            <div className="bg-[#2b2d31] p-4 rounded-xl">
              No resumes saved yet.
            </div>

          ) : (

            history.map(
              (item) => (

                <div
                  key={item.id}
                  className="bg-[#2b2d31] p-5 rounded-xl mb-4 border border-gray-700"
                >

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-400">
                    {item.created_at}
                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

}