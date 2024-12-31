import React, { useState } from 'react';

const EventForm = ({ onAddEvent }) => {
    const [event_name, setEventName] = useState('');
    const [venue, setVenue] = useState('');
    const [city, setCity] = useState('');
    const [event_date, setEventDate] = useState('');
    const [description, setDescription] = useState('');
    const [ticket_link, setTicketLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { 
            event_name, 
            venue, 
            city, 
            event_date, 
            description, 
            ticket_link, 
            status: 'pending' 
        };
        console.log('Submitting event:', newEvent);  // Debugging
        onAddEvent(newEvent);
        resetForm();
    };

    const resetForm = () => {
        setEventName('');
        setVenue('');
        setCity('');
        setEventDate('');
        setDescription('');
        setTicketLink('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="date" 
                value={event_date} 
                onChange={(e) => setEventDate(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="Venue" 
                value={venue} 
                onChange={(e) => setVenue(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="Event Name" 
                value={event_name} 
                onChange={(e) => setEventName(e.target.value)} 
                required
            />
            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Ticket Link (optional)" 
                value={ticket_link} 
                onChange={(e) => setTicketLink(e.target.value)}
            />
            <button type="submit">Send for Approval</button>
        </form>
    );
};

export default EventForm;
