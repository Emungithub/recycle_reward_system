import React, { useState } from "react";
import "./RewardCard.css";
import UploadImg from "../../public/upload.png";

function RewardCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isHidden, setHidden] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileList = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
    }));
    setUploadedFiles([...uploadedFiles, ...fileList]);
    setHidden(true);
  };

  const handleRemoveFile = (indexToRemove) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };
  

  return (
    
    <div className="reward-card-container">
        
      {/* Main Reward Card */}
      <div className="reward-card">
        <div className="card-content">
          <div className="text-section">
            <h2>Get Rewards to Recycle and Join the Hero Recycle Board Today!</h2>
            <p>See where you stand amongst the Recycle Reward's top contributors</p>
          </div>
        </div>
        <button className="recycle-now-btn" onClick={handleButtonClick}>
          Recycle Now!
        </button>
      </div>

      {/* Second Card */}
      <div className="total-recycled-card">
        <h2>50,000</h2>
        <p>Total KG Recycled</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="recycle-submit-title">Recycle Submission</h2>
            <form>
              <div className="form-group">
                <label htmlFor="material-type">Material Type:</label>
                <select id="material-type">
                  <option value="plastic">Plastic</option>
                  <option value="glass">Glass</option>
                  <option value="paper">Paper</option>
                  <option value="gadget">Gadget</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity (kg):</label>
                <input type="number" id="quantity" placeholder="Enter kg" />
              </div>
              <div className="form-group">
                <label htmlFor="receipt-no">Receipt No:</label>
                <input type="text" id="receipt-no" placeholder="Enter receipt no" />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location of Recycle Center:??? enable user to choose from google map access the latitude etc?</label>
                <input type="text" id="location" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label htmlFor="location">Anything Else?</label>
                <input type="text" id="anything" placeholder="Add info or description" />
              </div>
              <div className="form-group file-upload">
                <label htmlFor="recycled-proof">Recycled Item Proof:</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="recycled-proof"
                    className="file-input"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="file-upload-overlay">
                    <img src={UploadImg} alt="Upload" />
                    <p hidden={isHidden}>Attachment: Item Photo or List of Items (required)*</p>
                  </div>
                  {uploadedFiles.length > 0 && (
                  <ul className="file-list">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="file-item">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{file.size}</span>
                        <button
                            className="remove-file-btn"
                            onClick={(event) => {
                                event.stopPropagation(); // Prevent the event from reaching the file input
                                handleRemoveFile(index);
                            }}
                            >
                          🗑️
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                
                </div>                
              </div>
              <div className="form-group">
                <label htmlFor="wallet-address">Your ICP Wallet Address:</label>
                <input
                  type="text"
                  id="wallet-address"
                  placeholder="ICP Wallet Address"
                />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardCard;
