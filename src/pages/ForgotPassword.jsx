import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

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
        <div className=" w-full min-h-screen flex flex-col gap-5 items-center justify-center">
            <form className=" flex flex-col gap-4">
                <div className=" flex flex-col gap-1">
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder="e.g., ninjahattori@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                        className=" px-3 py-2 border rounded"
                    />
                </div>
                <div className=" flex flex-col gap-1">
                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder="********"
                        onChange={e => setNewPassword(e.target.value)}
                        className=" px-3 py-2 border rounded"
                    />
                </div>
                <button
                onClick={handleReset}>
                    Set new password
                </button>
            </form>
            <p>
                Remember password? <Link to="/login" className=" text-blue-600 border-b">Login</Link>
            </p>
        </div>
    )
}