import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../context/TicketContext';
import axios from 'axios';
import './TicketCard.css'; // Ensure you have necessary CSS imports

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TicketCard = ({ ticket }) => {
  const { selectTicket, updateTicketStatus } = useContext(TicketContext);
  const [localStatus, setLocalStatus] = useState(ticket.status);

  useEffect(() => {
    setLocalStatus(ticket.status);
  }, [ticket.status]);

  const handleChangeStatus = async (newStatus) => {
    setLocalStatus(newStatus);
    try {
      await axios.patch(`${API_BASE_URL}tickets/${ticket.id}/`, {
        status: newStatus
      });
      updateTicketStatus(ticket.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'unassigned':
        return 'orange';
      case 'on hold':
        return '#FFD700';
      case 'open':
        return 'blue';
      case 'closed':
        return 'green';
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div className="ticket-card" onClick={() => selectTicket(ticket.id)}>
      <h3>{ticket.title.toUpperCase()}</h3>
      <select 
        value={localStatus}
        onChange={(e) => handleChangeStatus(e.target.value)}
        style={{ color: getStatusTextColor(localStatus), borderRadius: '5px' }}
      >
        <option value="unassigned" style={{ color: getStatusTextColor('unassigned'), borderRadius: '10px' }}>Unassigned</option>
        <option value="on hold" style={{ color: getStatusTextColor('on hold'), borderRadius: '10px' }}>On Hold</option>
        <option value="open" style={{ color: getStatusTextColor('open'), borderRadius: '10px' }}>Open</option>
        <option value="closed" style={{ color: getStatusTextColor('closed'), borderRadius: '20px' }}>Closed</option>
      </select>
      <p><strong>Datetime:</strong> {new Date(ticket.created_at).toISOString().replace('T', ' ').slice(0, 19)}</p>
      <p><strong>Platform:</strong> {ticket.platform.charAt(0).toUpperCase() + ticket.platform.slice(1)}</p>
      <p><strong>Branch:</strong> {ticket.restaurant_branch}</p>
    </div>
  );
};

export default TicketCard;
