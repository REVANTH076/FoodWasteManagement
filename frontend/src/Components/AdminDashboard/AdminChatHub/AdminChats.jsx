import './AdminChats.css';
import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import API_BASE_URL from "../../../config/api"; 


// A configuration array Used to render buttons dynamically Avoids hardcoding buttons in JSX
const chatTypes = [
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Donor', value: 'donor' },
  { label: 'Partner', value: 'partnership' }
];

const AdminChats = () => {
  const [selectedChatType, setSelectedChatType] = useState('volunteer');
  const [usersList, setUsersList] = useState([]); //Stores users fetched from the backend for the selected <role></role>
  const [selectedUser, setSelectedUser] = useState(null); //Stores the currently selected user for chatting

  // Fetch users when role changes
  useEffect(() => {
    setSelectedUser(null); // Reset selected user
    fetch(`${API_BASE_URL}/api/users/role/${selectedChatType}`)
      .then((res) => res.json())
      .then((data) => setUsersList(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [selectedChatType]);

  return (
    <div className="admin-chat-container">
      {/* Sidebar: Chat types and user list */}
      <div className="chat-sidebar">
        {chatTypes.map((chat) => (
          <button
            key={chat.value}
            className={selectedChatType === chat.value ? 'active' : ''} //“If the selected chat type equals this button’s value, apply the active CSS class. Otherwise, apply nothing.”
            onClick={() => setSelectedChatType(chat.value)}
          >
            {chat.label}
          </button>
        ))} 
        {/* { ... } → Curly braces in JSX mean JavaScript expression inside JSX. */}

        <div className="user-list">
          {usersList.map((user) => (
            <button
              key={user._id}
              className={selectedUser?.name === user.name ? 'selected-user' : ''} //selectedUser === null Without ?., React would crash:

              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        {selectedUser ? (
          <ChatBox currentUser="admin" chatWith={selectedUser.name} />
        ) : (
          <p className="placeholder">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminChats;