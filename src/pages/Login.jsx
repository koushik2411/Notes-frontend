import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className=" w-full min-h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition">
      <div className=" flex flex-col gap-6 items-center">
        <div><FaUserShield className=" text-9xl"/></div>
        <form onSubmit={handleLogin} className=" flex flex-col gap-7 ">
          <div className=" flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="e.g., opprime@autobots.com"
              onChange={(e) => setEmail(e.target.value)}
              className=" px-3 py-2 border rounded-lg w-[70vw] max-w-175 placeholder:text-slate-500"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className=" px-3 py-2 border rounded-lg w-[70vw] max-w-175 placeholder:text-slate-500"
            />
          </div>
          <button type="submit" className=" bg-linear-to-b from-slate-800 to-slate-900 text-slate-100 dark:bg-linear-to-b  dark:from-blue-500 dark:to-blue-600 rounded-lg p-3 my-2 mb-8 font-semibold">
            LOGIN
          </button>
        </form>

        <p>
            New user? <Link to="/signup" className=" text-blue-600 border-b">Register</Link>
        </p>

        <p className=" text-blue-600">
          <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
}
