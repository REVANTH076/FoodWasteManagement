// // VolunteerChat.jsx
// import React, { useEffect, useState } from "react";
// // import ChatBox from "./ChatBox"; // You already have this
// import ChatBox from "../../common/ChatBox";
// import "./DonorChat.css"; // Optional: extra styling for this page

// const DonorChat = () => {
//   const [volunteerName, setVolunteerName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("donorName"); // set this on login
//     if (storedName) {
//       setVolunteerName(storedName);
//     }
//   }, []);

//   return (
//     <div className="volunteer-chat-page">
//       {volunteerName ? (
//         <>
//           <h2 className="chat-welcome">Welcome, {volunteerName} 👋</h2>
//           <ChatBox currentUser={volunteerName} chatWith="admin" />
//         </>
//       ) : (
//         <p className="chat-error">Donor name not found. Please login again.</p>
//       )}
//     </div>
//   );
// };

// export default DonorChat;



import React from "react";
import ChatBox from "../../common/ChatBox";
import "./DonorChat.css";

const DonorChat = () => {
  const donorName = localStorage.getItem("donorName");

  if (!donorName) {
    return <p>Please login again.</p>;
  }

  return (
    <ChatBox
      currentUser={{ name: donorName, role: "donor" }}
      chatWith={{ name: "admin", role: "admin" }}
      title="Donor Chat with Admin"
    />
  );
};

export default DonorChat;
