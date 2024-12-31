import React from 'react';

const EventList = ({ events }) => {
    return (
        <div>
            {events.map((event) => (
                <div key={event.id} className="event">
                    <h3>{event.event_name}</h3>
                    <p>
                        <strong>{event.venue}</strong> - {event.city} (
                        {new Date(event.event_date).toLocaleDateString()})
                    </p>
                    <p>{event.description}</p>
                    {event.ticket_link && (
                        <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">
                            Tickets
                        </a>
                    )}
                </div>
            ))}
            useEffect(() => {
    fetch('http://localhost:3000/api/events')
        .then(res => res.json())
        .then(data => {
            setEvents(data);
        })
        .catch(err => console.error('Error fetching events:', err));
}, []);
        </div>


    );
};



export default EventList;
