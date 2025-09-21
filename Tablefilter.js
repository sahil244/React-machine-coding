import React from "react";
import "./style.css";
import React, { useState, useMemo } from "react";

const initialData = [
  { id: 1, name: "Alice", date: "2025-09-18", age: 28 },
  { id: 2, name: "Bob", date: "2025-09-20", age: 35 },
  { id: 3, name: "Charlie", date: "2025-09-19", age: 30 },
  { id: 4, name: "Diana", date: "2025-09-20", age: 25 }
];

export default function SortFilterTable() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterDate, setFilterDate] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle asc/desc
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Compute final data with useMemo (performance-friendly)
  const processedData = useMemo(() => {
    let filtered = initialData;

    if (searchDate) {
      filtered = filtered.filter((row) => row.date === searchDate);
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [sortConfig, searchDate]);

  return (
    <div>
      <h2>📊 Sort & Filter Table</h2>

      {/* Filter */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={() => setSearchDate(filterDate)}>Search</button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("date")}>Date</th>
          </tr>
        </thead>
        <tbody>
          {processedData.length > 0 ? (
            processedData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
