import { useState } from "react";

export default function Accordion({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-3 font-medium bg-gray-100 hover:bg-gray-200"
      >
        {title}
      </button>
      {open && (
        <div className="p-3 space-y-2">
          {items.map((ev, idx) => (
            <div key={idx}>
              <a
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                📎 {ev.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
