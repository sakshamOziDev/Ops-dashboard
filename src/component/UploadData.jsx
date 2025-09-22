import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadCSV ,uploadRiderCSV} from '../apis/apis';

const UploadData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const file1 = e.target.file1.files[0];
    const file2 = e.target.file2.files[0];
    try {
      if (file1) await uploadRiderCSV(file1);
      // if (file2) await uploadCSV(file2);
      setMessage('Files uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed. Please try again.',err);
    }
    setLoading(false);
  };

  return (
    <div className="upload-data-container" style={{ position: 'relative' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 10,
        }}
        aria-label="Go back"
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M20 8l-8 8 8 8" stroke="#0077b6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h2 className="upload-data-title">Upload Data</h2>
  <form className="upload-data-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file1" className="upload-data-label">Select Rider file to upload:</label>
          <input type="file" id="file1" name="file1" className="upload-data-input" />
        </div>
        <div>
          <label htmlFor="file2" className="upload-data-label">Select Picker file to upload:</label>
          <input type="file" id="file2" name="file2" className="upload-data-input" />
        </div>
        <button type="submit" className="upload-data-btn" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <div style={{ marginTop: 16, color: message.includes('success') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</div>}
      </form>
    </div>
  );
};

export default UploadData;
