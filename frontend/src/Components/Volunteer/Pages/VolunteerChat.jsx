// // VolunteerChat.jsx
// import React, { useEffect, useState } from "react";
// import ChatBox from "./ChatBox"; // You already have this
// import "./VolunteerChat.css"; // Optional: extra styling for this page

// const VolunteerChat = () => {
//   const [volunteerName, setVolunteerName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("volunteerName"); // set this on login
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
//         <p className="chat-error">Volunteer name not found. Please login again.</p>
//       )}
//     </div>
//   );
// };

// export default VolunteerChat;


import React from "react";
import ChatBox from "../../common/ChatBox";
import "./VolunteerChat.css";

const VolunteerChat = () => {
  const volunteerName = localStorage.getItem("volunteerName");

  if (!volunteerName) {
    return <p>Please login again.</p>;
  }

  return (
    <ChatBox
      currentUser={{ name: volunteerName, role: "volunteer" }}
      chatWith={{ name: "admin", role: "admin" }}
      title="Volunteer Chat with Admin"
    />
  );
};

export default VolunteerChat;
