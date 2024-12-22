import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import './ReportAnalyzer.css';
import image from '../../assets/image.jpg';
import axios from 'axios'; // Import axios for handling file upload

const ReportAnalyzer = () => {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [fileName, setFileName] = useState(''); // State to store the file name
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle file change event
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file from input
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name to display
    }
  };

  // Handle the file upload and send it to the backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a lab report first.");
      return;
    }

    const formData = new FormData();
    formData.append('report', file); // Append the file to the form data

    try {
      // Send the file to the backend using Axios
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully', response.data);
      alert('File uploaded successfully');
      // You can handle the response here, like showing analysis result

    } catch (error) {
      console.error('Error uploading file', error);
      alert('Error uploading file');
    }
  };

  // Programmatically click the hidden file input when the upload button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="card-container">
      {/* First Card: Upload Lab Report */}
      <div className="card1">
        <h2 className="title">Upload Lab Report</h2>
        <p className="subtitle">Please attach a lab report to proceed</p>

        <div className="upload-section">
          {/* File Input for uploading */}
          <input
            type="file"
            accept="application/pdf"
            id="fileInput"
            style={{ display: 'none' }} // Hide the input
            ref={fileInputRef} // Attach the ref to the input
            onChange={handleFileChange}
          />
          <button className="upload-button" onClick={handleButtonClick}>
            <FaCloudUploadAlt />
            <span>Upload Lab Report</span>
          </button>
        </div>


        <div className="divider"></div>

        <div className="attached-section">
          <p className="attached-title">Attached Lab Report</p>
          <p className="attached-placeholder">
            {fileName ? fileName : 'Uploaded lab report will be shown here'}
          </p>
        </div>

        <button className="continue-button" onClick={handleUpload}>
            Continue
        </button>
      </div>

      {/* Second Card: Guide to upload a lab report */}
      <div className="card2">
        <h2 className="card-title">Guide to upload a lab report</h2>
        <div className="card-content">
          <img
            src={image}
            className="card-image"
            alt="Guide to upload lab report"
          />
          <ul className="card-instructions">
            <li>Don't crop out any part of the image</li>
            <li>Avoid blurred image</li>
            <li>Supported files type: jpeg, jpg, png, pdf</li>
            <li>Maximum allowed file size: 2MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyzer;
