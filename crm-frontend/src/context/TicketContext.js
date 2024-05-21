import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}tickets/`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const addTicket = async (ticket) => {
    try {
      const response = await axios.post(`${API_BASE_URL}tickets/`, ticket);
      setTickets([...tickets, response.data]);
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const updateTicketStatus = async (id, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}tickets/${id}/`, { status });
      setTickets(tickets.map(ticket => ticket.id === id ? response.data : ticket));
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const selectTicket = (id) => {
    setSelectedTicket(tickets.find(ticket => ticket.id === id));
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, selectTicket, selectedTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, TicketContext };
