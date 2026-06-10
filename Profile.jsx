import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Profile() {

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {

    const loadProfile =
      async () => {

        const user_id =
          localStorage.getItem(
            "user_id"
          );

        const response =
          await API.get(
            `/profile/${user_id}`
          );

        setProfile(
          response.data
        );

      };

    loadProfile();

  }, []);

  if (!profile) {

    return (
      <div className="text-white p-8">
        Loading...
      </div>
    );

  }

  return (

    <div className="flex min-h-screen bg-[#202123]">

      <Sidebar />

      <div className="flex-1 p-8 text-white">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-[#2b2d31] p-6 rounded-xl">

          <h2 className="text-xl font-bold mb-4">
            Account Information
          </h2>

          <p className="mb-3">
            <strong>Name:</strong>
            {" "}
            {profile.name}
          </p>

          <p className="mb-3">
            <strong>Email:</strong>
            {" "}
            {profile.email}
          </p>

          <p>
            <strong>Total Resumes:</strong>
            {" "}
            {profile.resume_count}
          </p>

        </div>

      </div>

    </div>

  );

}