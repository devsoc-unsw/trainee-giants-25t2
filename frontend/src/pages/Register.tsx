import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../hooks/useAuth";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    setErr(null);

    if (!email || !password) {
      setErr("Please Fill in email and password");
    }

    setLoading(true);

    try {
      await registerUser({ email, password });
      navigate("/");
    } catch (e: any) {
      const message = e?.response?.data?.error || e?.message || "Registration Failed. Please try again.";
      setErr(message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border">
        <div className="text-center mb-8">
          <h1 className="text-orange-500 text-2xl font-bold ml-3 self-center">When2Eat</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Register an account</h2>
        </div>

        <div className="space-y-6">
          {err && (
            <div className="p-3 rounded bg-red-50 border border-red-200 test-red-700 text-sm">
              {err}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-500 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            className="text-white font-medium"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
