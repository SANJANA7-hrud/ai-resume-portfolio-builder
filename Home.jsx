import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
      <Navbar />

      <div className="text-center text-white mt-20 px-6">
        <h1 className="text-6xl font-bold">
          Build Your Career With AI
        </h1>

        <p className="mt-6 text-xl">
          Create resumes, cover letters, portfolios,
          and ATS-ready applications in minutes.
        </p>

        <Link to="/dashboard">
          <button className="mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold">
            Get Started
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6 p-10 mt-20">
        <FeatureCard
          title="Resume Builder"
          description="Generate ATS-friendly resumes."
        />

        <FeatureCard
          title="Cover Letter"
          description="AI-powered personalized letters."
        />

        <FeatureCard
          title="Portfolio"
          description="Create personal websites instantly."
        />

        <FeatureCard
          title="ATS Analyzer"
          description="Improve your resume score."
        />
      </div>
    </div>
  );
}