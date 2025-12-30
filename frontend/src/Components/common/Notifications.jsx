import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";
import API_BASE_URL from "../../config/api"; 

const Notifications = ({ role, userName, title = "My Notifications" }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!role || !userName) return;

    fetchNotifications();
  }, [role, userName]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/notifications/${role}/${userName}`
      );
      setNotifications(res.data || []);
      setUnreadCount(res.data.filter((n) => !n.read).length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/notifications/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((c) => Math.max(c - 1, 0));
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  return (
    <div className="notifications-container">
      <h2>{title}</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`notification-item ${
                notif.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notif._id)}
            >
              <p>{notif.message}</p>
              <small>{new Date(notif.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      {unreadCount > 0 && (
        <div className="unread-count">
          You have {unreadCount} unread notifications
        </div>
      )}
    </div>
  );
};

export default Notifications;
