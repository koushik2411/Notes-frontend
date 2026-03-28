import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleReset = async () => {
        try {
            await API.post("/auth/forgot-password", {
                email,
                newPassword
            });

            alert("Password updated!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };

    return (
        <div className=" w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <div><FaUserEdit className=" text-9xl"/></div>
            <form className=" flex flex-col gap-4">
                <div className=" flex flex-col gap-1">
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder="e.g., ninjahattori@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                        className=" px-3 py-2 border rounded-lg placeholder:text-slate-500 w-[70vw] max-w-175"
                    />
                </div>
                <div className=" flex flex-col gap-1">
                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder="********"
                        onChange={e => setNewPassword(e.target.value)}
                        className=" px-3 py-2 border rounded-lg placeholder:text-slate-500 w-[70vw] max-w-175"
                    />
                </div>
                <button
                onClick={handleReset}
                className=" bg-linear-to-b from-slate-800 to-slate-900 text-slate-100 dark:bg-linear-to-b  dark:from-blue-500 dark:to-blue-600 rounded-lg p-3 my-2 mb-8 font-semibold">
                    Set new password
                </button>
            </form>
            <p>
                Remember password? <Link to="/login" className=" text-blue-600 border-b">Login</Link>
            </p>
        </div>
    )
}