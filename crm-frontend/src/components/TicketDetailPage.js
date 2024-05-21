import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../context/TicketContext';
import axios from 'axios';
import './TicketDetailPage.css';  // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TicketDetailPage = () => {
  const { selectedTicket, updateTicketStatus } = useContext(TicketContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [localStatus, setLocalStatus] = useState(selectedTicket ? selectedTicket.status : '');

  useEffect(() => {
    if (selectedTicket) {
      fetchComments(selectedTicket.id);
      setLocalStatus(selectedTicket.status);
    }
  }, [selectedTicket]);

  const fetchComments = async (ticketId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}comments/?ticket=${ticketId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!selectedTicket) return;
      const response = await axios.post(`${API_BASE_URL}comments/`, {
        ticket: selectedTicket.id,
        comment: comment
      });
      setComments([...comments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSaveStatus = () => {
    if (selectedTicket) {
      updateTicketStatus(selectedTicket.id, localStatus);
    }
  };

  if (!selectedTicket) return <div>Select a ticket to view details</div>;

  return (
    <div className="ticket-detail">

      <h3>{selectedTicket.title.toUpperCase()}</h3>
      <p><strong>Status:</strong> {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}</p>
      <p><strong>Datetime:</strong> {new Date(selectedTicket.created_at).toISOString().replace('T', ' ').slice(0, 19)}</p>
      <p><strong>Platform:</strong> {selectedTicket.platform.charAt(0).toUpperCase() + selectedTicket.platform.slice(1)}</p>
      <p><strong>Branch:</strong> {selectedTicket.restaurant_branch}</p>

      <select value={localStatus} onChange={(e) => setLocalStatus(e.target.value)}>
        <option value="unassigned">Unassigned</option>
        <option value="on hold">On Hold</option>
        <option value="open">Open</option>
        <option value="closed">Close</option>
      </select>
      <button className="save-status-button" onClick={handleSaveStatus}>Save Status</button>
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</p>
            <small>Created at: {new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
      {selectedTicket.status !== 'closed' && (
        <div className="comment-box">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}
      {selectedTicket.status === 'closed' && (
        <button className="save-status-button" onClick={() => updateTicketStatus(selectedTicket.id, 'open')}>Reopen Ticket</button>
      )}
    </div>
  );
};

export default TicketDetailPage;
