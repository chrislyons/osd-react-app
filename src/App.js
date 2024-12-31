import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import EventForm from './components/EventForm';
import AdminPanel from './components/AdminPanel';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sortValue, setSortValue] = useState('date-asc');

    useEffect(() => {
        fetch('http://localhost:3000/api/events')
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data);
            });
    }, []);

    const handleSortChange = (sortValue) => {
        const sorted = [...filteredEvents].sort((a, b) => {
            if (sortValue === 'date-asc') {
                return new Date(a.event_date) - new Date(b.event_date);
            } else if (sortValue === 'date-desc') {
                return new Date(b.event_date) - new Date(a.event_date);
            } else if (sortValue === 'name-asc') {
                return a.event_name.localeCompare(b.event_name);
            } else if (sortValue === 'name-desc') {
                return b.event_name.localeCompare(a.event_name);
            }
            return 0;
        });
        setFilteredEvents(sorted);
        setSortValue(sortValue); // Update the current sort state
    };

    const handleFilterChange = (filterValue) => {
        const filtered = events.filter(event =>
            event.city.toLowerCase().includes(filterValue.toLowerCase()) ||
            event.venue.toLowerCase().includes(filterValue.toLowerCase())
        );
        
        // Apply the current sorting option after filtering
        const sorted = [...filtered].sort((a, b) => {
            if (sortValue === 'date-asc') {
                return new Date(a.event_date) - new Date(b.event_date);
            } else if (sortValue === 'date-desc') {
                return new Date(b.event_date) - new Date(a.event_date);
            } else if (sortValue === 'name-asc') {
                return a.event_name.localeCompare(b.event_name);
            } else if (sortValue === 'name-desc') {
                return b.event_name.localeCompare(a.event_name);
            }
            return 0;
        });

        setFilteredEvents(sorted);
    };

    const addEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    return (
        <div className="container">
            <div className="pane-left">
            <FilterBar
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />
            <div className="listings">
            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                        <div key={event.id} className="event">
                            <div className="details">
                                <p>
                                    {new Date(event.event_date).toISOString().split('T')[0]} - {event.venue} - {event.city}
                                </p>
                                <h3>{event.event_name || 'Untitled Event'}</h3>
                                <p>{event.description}</p>
                                {event.ticket_link && (
                                    <div className="tix">
                                        <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">
                                            Tickets
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No events found matching your search.</p>
                    </div>
                )}
            </div>
            </div>
            <div className="pane-right">
                <p id="calltosubmit">
                    <strong>Submit an Event</strong>
                </p>
                <EventForm onAddEvent={addEvent} />
            </div>
            <Routes>
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </div>
    );
};

export default App;
