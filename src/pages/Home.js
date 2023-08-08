import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth-store/AuthContext';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && authCtx.profileComplete ? (
        <p>Your profile is complete. You can start using the app now.</p>
      ) : (
        <p>
          Your profile is incomplete. To complete your profile{' '}
          <Link to="/profile-update">click here</Link>.
        </p>
      )}
    </div>
  );
};

export default Home;
