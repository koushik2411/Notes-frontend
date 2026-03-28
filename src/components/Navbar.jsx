import { useNavigate } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function Navbar({ dark, setDark }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const hideLogout = ["/login", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className=" flex items-center gap-3 md:gap-5 p-2">
      {/* Theme button */}
      <button onClick={() => setDark((prev) => !prev)} className="">
        {dark ? <FaSun /> : <FaMoon />}
      </button>

      {/* Logout button */}
      {token && !hideLogout && (
        <button
          onClick={handleLogout}
          className=" flex items-center gap-1 font-semibold text-red-500"
        >
          Logout
          <MdLogout />
        </button>
      )}
    </nav>
  );
}
