import React from 'react';
import { Link } from 'react-router-dom'; 

const Home = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <h2>Your profile is incomplete. To complete your profile <Link to="/profile-update">click here</Link>.</h2>
    </div>
  );
};

export default Home;
