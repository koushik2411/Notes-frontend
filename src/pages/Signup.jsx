import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", {
            name,
            email,
            password
        });

        console.log(res.data);
        navigate("/login");
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    return (
        <div className=" w-full min-h-screen flex flex-col gap-3 items-center justify-center bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <div><GiArchiveRegister className=" text-9xl"/></div>
            <form onSubmit={handleSignup} className=" flex flex-col gap-7">
                <div className=" flex flex-col gap-1">
                    <label>Full Name</label>
                    <input 
                        type="text"
                        placeholder="e.g., Ninja Hattori"
                        onChange={e => setName(e.target.value)}
                        className=" px-3 py-2 border rounded-lg w-[70vw] max-w-175 placeholder:text-slate-500"
                    />
                </div>
                <div className=" flex flex-col gap-1">
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder="e.g., ninjahattori@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                        className=" px-3 py-2 border rounded-lg w-[70vw] max-w-175 placeholder:text-slate-500"
                    />
                </div>
                <div className=" flex flex-col gap-1">
                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder="********"
                        onChange={e => setPassword(e.target.value)}
                        className=" px-3 py-2 border rounded-lg w-[70vw] max-w-175 placeholder:text-slate-500"
                    />
                </div>
                <button
                type="submit"
                className=" bg-linear-to-b from-slate-800 to-slate-900 text-slate-100 dark:bg-linear-to-b  dark:from-blue-500 dark:to-blue-600 rounded-lg p-3 my-2 mb-8 font-semibold">
                    SIGNUP
                </button>
            </form>
            <p>
                Already registered? <Link to="/login" className=" text-blue-600 border-b">Login</Link>
            </p>
        </div>
    )
}