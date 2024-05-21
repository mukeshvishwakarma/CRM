import React, { useState, useContext } from 'react';
import { TicketContext } from '../context/TicketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import './CreateTicketPopup.css';

const CreateTicketPopup = ({ closePopup }) => {
  const { addTicket } = useContext(TicketContext);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [restaurant_branch, setrestaurant_branch] = useState('');
  const [description, setdescription] = useState('');

  const handleSubmit = () => {
    addTicket({ title, name, platform, restaurant_branch, description });
    closePopup();
  };

  return (
    <div className="popup">
      <div className="popup-header">
      <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closePopup} />
        <h2>Create Ticket</h2>
        
      </div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="">Select Platform</option>
        <option value="zomato">Zomato</option>
        <option value="swiggy">Swiggy</option>
        <option value="google">Google</option>
      </select>
      <select value={restaurant_branch} onChange={(e) => setrestaurant_branch(e.target.value)}>
        <option value="">Select Branch</option>
        <option value="BORIVALI">BORIVALI</option>
        <option value="MALAD">MALAD</option>
        <option value="ANDHERI">ANDHERI</option>
      </select>
      <button onClick={handleSubmit}>Create</button>
      <button onClick={closePopup}>Cancel</button>
    </div>
  );
};

export default CreateTicketPopup;
