import React from 'react';
import './WelcomeCard.css';

function WelcomeCard({ userName, profileImage, totalRecycled, nftEarned, ftEarned }) {
  return (
    <div className="card-container">
      {/* First Card */}
      <div className="welcome-card">
        <div className="profile-section">
          <img src={profileImage} alt={`${userName}'s profile`} className="profile-image" />
          <div className="welcome-text">
            <h2>Welcome Back, {userName}</h2>
            <p>We're so glad to have you on Recycle Reward</p>
          </div>
        </div>
        <div className="stats-section">
          <div className="stat">
            <h3>{totalRecycled} kg</h3>
            <p>Total Recycled</p>
          </div>
          <div className="stat">
            <h3>{nftEarned}</h3>
            <p>NFTs Earned</p>
          </div>
          <div className="stat">
            <h3>{ftEarned}</h3>
            <p>FTs Earned</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default WelcomeCard;
