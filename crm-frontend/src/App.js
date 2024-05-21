import React, { useState } from 'react';
import { TicketProvider } from './context/TicketContext';
import Dashboard from './components/Dashboard';
import CreateTicketPopup from './components/CreateTicketPopup';
import TicketDetailPage from './components/TicketDetailPage';
import Header from './components/Header';

const App = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false); // Define state and state setter

  return (
    <TicketProvider>
      <div className="app">
      <Header />
        <header>
        
          <h1></h1>
          <button className='save-status-button' onClick={() => setShowCreatePopup(true)}>Add Ticket</button>
        </header>
        <Dashboard />
        <TicketDetailPage />
        {showCreatePopup && <CreateTicketPopup closePopup={() => setShowCreatePopup(false)} />}
      </div>
    </TicketProvider>
  );
};

export default App;
