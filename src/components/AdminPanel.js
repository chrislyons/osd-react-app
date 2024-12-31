import React, { useState, useEffect } from 'react';
import '../App.css';

const AdminPanel = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  // Fetch pending events
  useEffect(() => {
    fetch('http://localhost:3000/api/events/pending')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch pending events');
        }
        const text = await res.text();
        console.log('Raw response:', text);  // Debugging
        const data = JSON.parse(text);
        console.log('Pending events:', data);  // Debugging
        setPendingEvents(data);
      })
      .catch((err) => console.error('Error fetching pending events:', err));
  }, []);

  // Approve or reject event
const updateEventStatus = async (id, status) => {
    try {
        const res = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (!res.ok) {
            throw new Error('Failed to update event status');
        }

        const updatedEvent = await res.json();

        setPendingEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== updatedEvent.id)
        );
    } catch (err) {
        console.error('Error updating event:', err);
    }
};

  return (
    <div className="admin-panel">
      <h2>Admin Event Moderation</h2>

      {pendingEvents.length > 0 ? (
        pendingEvents.map((event) => (
          <div key={event.id} className="event-card">
          <div className="pendingEvents">
                      <h3>{event.event_name}</h3>
            <p>
              {event.venue} – {event.city} – {event.event_date}
            </p>
            <p>{event.description}</p>
            <div className="buttons">
              <button onClick={() => updateEventStatus(event.id, 'approved')}>Approve</button>
              <button onClick={() => updateEventStatus(event.id, 'rejected')}>Reject</button>
          </div>
            </div>
          </div>

        ))
      ) : (
        <p>No pending events.</p>
      )}
    </div>
  );
};

export default AdminPanel;
