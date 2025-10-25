import { useEffect, useState } from "react";

export default function KpiV2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5050/api/kpi-v2");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">KPI V2 (Tree Table)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
