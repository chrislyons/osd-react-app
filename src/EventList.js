import React from 'react';

const EventList = ({ events }) => {
    return (
        <div>
            {events.length > 0 ? (
                events.map((event) => (
                    <div className="event" key={event.id}>
                        <h3>{event.event_name}</h3>
                        <p><strong>{event.venue}</strong> – {event.city} ({event.event_date})</p>
                        <p>{event.description}</p>
                        {event.ticket_link && (
                            <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">Tickets</a>
                        )}
                    </div>
                ))
            ) : (
                <p>No events to display.</p>
            )}
        </div>
    );
};

export default EventList;
