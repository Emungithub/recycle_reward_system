import React from "react";
import "./Transaction.css";
  


function Transaction({ transactions }) {
  return (
    <div className="transaction-container">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-card">
          <img
            src={transaction.proofImage}
            alt="Recycled Proof"
            className="transaction-image"
          />
          <div className="transaction-details">
            <h2 className="transaction-title">Transaction Details</h2>
            <p>
              <strong>IC:</strong> {transaction.submitter}
            </p>
            <p>
              <strong>timeStamp:</strong> {transaction.timestamp}
            </p>
            <p>
              <strong>Material:</strong> {transaction.title}
            </p>
            <p>
              <strong>KG:</strong> {transaction.fileSize}
            </p>
            <p>
              <strong>Receipt No:</strong> {transaction.resolution}
            </p>
            <p>
              <strong>Location:</strong> 
              <a
                href={`https://www.google.com/maps?q=${transaction.location.latitude},${transaction.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="location-link"
              >
                {transaction.location.address}
              </a>
            </p>
          </div>
{/*           
          <div className="transaction-actions">
            <button className="action-button">分享</button>
            <button className="action-button">删除</button>
            <button className="action-button">编辑</button>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default Transaction;
