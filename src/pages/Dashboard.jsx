import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.name || "Guest"}</p>
    </div>
  );
}
