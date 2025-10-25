export default function DropdownFilter({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <select
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
