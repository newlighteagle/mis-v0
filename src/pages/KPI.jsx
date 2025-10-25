import { useState, useEffect } from "react";
import Accordion from "../components/Accordion";
import data from "../data/kpiData.json";

export default function KPI() {
  const [district, setDistrict] = useState("");
  const [ics, setIcs] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let result = data;
    if (district) result = result.filter((d) => d.district === district);
    if (ics) result = result.filter((d) => d.ics === ics);
    setFiltered(result);
  }, [district, ics]);

  const districts = [...new Set(data.map((d) => d.district))];
  const icsList = [...new Set(data.map((d) => d.ics))];

  return (
    <div className="p-6 flex-1">
      <h1 className="text-2xl font-bold mb-4">KPI Evidence Catalog</h1>

      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">All Districts</option>
          {districts.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={ics}
          onChange={(e) => setIcs(e.target.value)}
        >
          <option value="">All ICS</option>
          {icsList.map((i, idx) => (
            <option key={idx} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      {filtered.map((item, idx) => (
        <Accordion
          key={idx}
          title={`${item.indicator} (${item.actual}/${item.target})`}
          items={item.evidence}
        />
      ))}
    </div>
  );
}
