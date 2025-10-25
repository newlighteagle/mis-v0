import { useEffect, useState } from "react";
import { fetchWPEvidence } from "../utils/api.js";
import DropdownFilter from "../components/DropdownFilter.jsx";

export default function WPEvidence() {
  const [data, setData] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [districtFilter, setDistrictFilter] = useState("");
  const [icsFilter, setIcsFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [districtOptions, setDistrictOptions] = useState([]);
  const [icsOptions, setIcsOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchWPEvidence();
      setData(res);

      // Set unique filter options
      setDistrictOptions([...new Set(res.map((d) => d.district))]);
      setIcsOptions([...new Set(res.map((d) => d.ics))]);
    };
    getData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
    (d) =>
      (districtFilter ? d.district === districtFilter : true) &&
      (icsFilter ? d.ics === icsFilter : true) &&
      (searchTerm
        ? d.activity_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.activity.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">WP - Evidence</h1>

      <div className="flex gap-4 mb-4">
        <DropdownFilter
          label="District"
          options={districtOptions}
          value={districtFilter}
          onChange={setDistrictFilter}
        />
        <DropdownFilter
          label="ICS"
          options={icsOptions}
          value={icsFilter}
          onChange={setIcsFilter}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium">Search Activity</label>
          <input
            type="text"
            placeholder="Search code or activity"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2"
          />
        </div>
      </div>

      <div className="border rounded">
        {filteredData.map((item) => (
          <div key={item.id} className="border-b">
            <div
              className="flex justify-between p-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleExpand(item.id)}
            >
              <span>
                {item.activity_code} - {item.activity}
              </span>
              <span>{expandedIds.includes(item.id) ? "-" : "+"}</span>
            </div>
            {expandedIds.includes(item.id) && (
              <div className="p-2 bg-white">
                <p>
                  <strong>District:</strong> {item.district}
                </p>
                <p>
                  <strong>ICS:</strong> {item.ics}
                </p>
                <p>
                  <strong>Evidence Note:</strong> {item.evidence_note}
                </p>
                <p>
                  <strong>Evidence Date:</strong> {item.evidence_date}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
