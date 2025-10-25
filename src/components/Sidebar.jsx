import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        Catalog Evidence
      </h2>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/" className="hover:bg-gray-700 rounded p-2">
          Dashboard
        </Link>
        <Link to="/kpi" className="hover:bg-gray-700 rounded p-2">
          KPI
        </Link>
      </nav>
    </aside>
  );
}
