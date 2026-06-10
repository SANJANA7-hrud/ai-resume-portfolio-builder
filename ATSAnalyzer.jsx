import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ATSAnalyzer() {

  const [resume, setResume] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const analyzeResume = async () => {

    try {

      setLoading(true);

      const response =
        await API.post(
          "/analyze-ats",
          {
            resume,
            job_description:
              jobDescription
          }
        );

      setAnalysis(
        response.data.analysis
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to analyze resume"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen bg-[#202123]">

      <Sidebar />

      <div className="flex-1 p-8 text-white">

        <h1 className="text-3xl font-bold mb-6">
          AI ATS Analyzer
        </h1>

        <div className="bg-[#2b2d31] p-6 rounded-xl">

          <h2 className="text-xl font-semibold mb-3">
            Resume
          </h2>

          <textarea
            rows="10"
            className="w-full p-4 rounded bg-[#202123] mb-6"
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) =>
              setResume(
                e.target.value
              )
            }
          />

          <h2 className="text-xl font-semibold mb-3">
            Job Description (Optional)
          </h2>

          <textarea
            rows="8"
            className="w-full p-4 rounded bg-[#202123] mb-6"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
          />

          <button
            onClick={
              analyzeResume
            }
            className="bg-green-600 px-6 py-3 rounded-lg"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>

        </div>

        {analysis && (

          <div className="mt-8 bg-[#2b2d31] p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
              ATS Analysis Report
            </h2>

            <pre className="whitespace-pre-wrap text-gray-200">
              {analysis}
            </pre>

          </div>

        )}

      </div>

    </div>

  );

}