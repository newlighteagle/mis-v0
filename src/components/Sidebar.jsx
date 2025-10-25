import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const BASE_URL = import.meta.env.VITE_EXPRESS_BASE_URL;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/menu`);
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Failed to load menu", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <aside className="w-64 bg-white p-4 border-r min-h-screen">
      <div className="mb-6 font-bold text-lg">SmallholderHUB</div>
      {user && <div className="mb-4">Hello, {user.name || user.email}</div>}
      <nav className="flex flex-col gap-2">
        {menu
          .filter((m) => m.is_active)
          .sort((a, b) => a.order_index - b.order_index)
          .map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`p-2 rounded hover:bg-gray-200 ${
                location.pathname === item.path ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
      </nav>
      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}
