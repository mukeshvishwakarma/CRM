import React from 'react';
import './Header.css'; // Import the CSS file for animations

const Header = () => {
  // Sample user data. Replace this with actual data from context or props.
  const user = {
    name: "MUKESH V.",
  };

  return (
    <header className="header">
      <div className="header-content">
        <h2>CRM Dashboard</h2>
        <div className="user-info">
          <p>Logged in as: <strong>{user.name}</strong></p>
        </div>
      </div>
    </header>
  );
};

export default Header;
