// src/components/Donor/HistoryExport.jsx

import React from "react";
import "./HistoryExport.css"; // optional CSS styling
import API_BASE_URL from "../../../config/api"; 

const HistoryExport = () => {
  const handleExportHistory = () => {
    const donorName = localStorage.getItem("donorName");
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}/api/donations/history/export/${donorName}`;
    link.setAttribute("download", `${donorName}-donation-history.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="history-export-container">
      <h2>📜 Export Donation History</h2>
      <p>Click the button below to download your donation history as a PDF.</p>
      <button className="history-btn" onClick={handleExportHistory}>Download PDF</button>
    </div>
  );
};

export default HistoryExport;
