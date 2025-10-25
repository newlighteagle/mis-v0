import { useEffect, useState } from "react";
import axios from "axios";

export default function WPEvidence() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtFilter, setDistrictFilter] = useState("");
  const [icsFilter, setIcsFilter] = useState("");

  const baseURL = import.meta.env.VITE_EXPRESS_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/wp-evidence`, {
        params: {
          district: districtFilter || undefined,
          ics: icsFilter || undefined,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch WP Evidence:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [districtFilter, icsFilter]);

  // group by district > ICS
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.district]) acc[item.district] = {};
    if (!acc[item.district][item.ics]) acc[item.district][item.ics] = [];
    acc[item.district][item.ics].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">WP - Evidence</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Filter by district"
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Filter by ICS"
          value={icsFilter}
          onChange={(e) => setIcsFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          {Object.entries(groupedData).map(([district, icsGroup]) => (
            <div key={district} className="p-2 border-b">
              <p className="font-bold text-lg">{district}</p>
              {Object.entries(icsGroup).map(([ics, items]) => (
                <div key={ics} className="pl-4 border-l mt-2">
                  <p className="font-semibold">{ics}</p>
                  <table className="w-full text-left mt-1 border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Activity Code</th>
                        <th className="p-2 border">Activity</th>
                        <th className="p-2 border">Note</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-2 border">{item.activity_code}</td>
                          <td className="p-2 border">{item.activity}</td>
                          <td className="p-2 border">{item.evidence_note}</td>
                          <td className="p-2 border">{item.evidence_date}</td>
                          <td className="p-2 border">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
