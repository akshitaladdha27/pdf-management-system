import React, { useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [sessionId, setSessionId] = useState("session_001");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to generate a report.");
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/reports/generate-report?session_id=${sessionId}`,
        config
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Session ID"
        />
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </div>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700 bg-gray-200 p-3 rounded-md">
          {message}
        </p>
      )}
    </div>
  );
};
