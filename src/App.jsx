import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import KPI from "./pages/KPI.jsx";
import KpiV2 from "./pages/KpiV2.jsx";
import Login from "./pages/Login.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {user ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-gray-50 min-h-screen p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kpi" element={<KPI />} />
              <Route path="/kpi-v2" element={<KpiV2 />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
