import { useState } from "react";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // TODO
    console.log("Registering:", { email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 rounded-lg p-3 flex items-center justify-center w-16 h-16">
              <div className="text-white font-bold text-xl">🍴</div>
            </div>
            <h1 className="text-orange-500 text-2xl font-bold ml-3 self-center">When2Eat</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Register an account</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Register
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
