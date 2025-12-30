import React, { useEffect, useState } from 'react';
import './AdminContacts.css';
import API_BASE_URL from "../../../config/api"; 

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/contacts`)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error fetching contacts:", err));
  }, []);
  // The empty dependency array [] means this effect runs only once when the component first loads

  return (
    <div className="contact-list">
  {contacts.map((contact, index) => (
    <div className="contact-card" key={index}>
      <h3>{contact.name}</h3>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Message:</strong> {contact.message}</p>
      <span><strong>Received:</strong> {new Date(contact.createdAt).toLocaleString()}</span>
    </div>
  ))}
</div>

  );
};

export default AdminContacts;
