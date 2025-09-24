import React from 'react';
import './App.css';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          PDF-management-system
        </h1>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* Authentication Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">1. User Authentication</h2>
          <p className="text-center text-gray-600 mb-6">First, sign up with a new account. Then, use the same credentials to log in.</p>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <Signup />
            <Login />
          </div>
        </div>

        {/* Report Generation Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
           <h2 className="text-2xl font-semibold text-center mb-4">2. PDF Report Generation</h2>
           <p className="text-center text-gray-600 mb-6">After logging in, use a valid `session_id` (e.g., `session_001` or `session_002`) to generate a report.</p>
           <Dashboard />
        </div>
      </main>
    </div>
  );
}

export default App;