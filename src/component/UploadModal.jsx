import React, { useState } from 'react';
import { uploadClaverTabCSV, uploadCSV, uploadRiderCSV } from '../apis/apis';

const UploadModal = ({ isOpen, onClose, title, uploadType }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    
    try {
      if (uploadType === 'rider') {

        if(e.target.file1.files[0]) await uploadRiderCSV(e.target.file1.files[0]);
        if(e.target.file2.files[0]) await uploadCSV(e.target.file2.files[0]);

        // const file1 = e.target.file1.files[0];
        // const file2 = e.target.file2.files[0];
        // // Upload both Rider and Picker files
        // // if (file1) await uploadRiderCSV(file1);
        // // if (file2) await uploadCSV(file2);

        // if(file1) await uploadRiderCSV(file1);
        // if(file2) await uploadCSV(file2);

        setMessage('Files uploaded successfully!');
      } else if (uploadType === 'claver') {
        const file1 = e.target.file1.files[0];
        // Upload Claver Tab file
        if (file1) await uploadClaverTabCSV(file1);
        setMessage('File uploaded successfully!');
      }
    } catch (err) {
      setMessage('Upload failed. Please try again.');
    }
    setLoading(false);
  };

  const handleClose = () => {
    setMessage('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(102,126,234,0.1)',
        position: 'relative',
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            margin: 0,
            lineHeight: 1,
            boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 16px rgba(102,126,234,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(102,126,234,0.3)';
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '24px',
          color: '#374151',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {title}
        </h2>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{paddingRight: '30px'}}>
            <label htmlFor="file1" style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#374151',
            }}>
              Select {uploadType === 'rider' ? 'Rider' : 'Claver Tab'} file to upload:
            </label>
            <input 
              type="file" 
              id="file1" 
              name="file1" 
              accept=".csv,.gz"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid rgba(102,126,234,0.2)',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102,126,234,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {uploadType === 'rider' && (
            <div style={{paddingRight: '30px'}}>
              <label htmlFor="file2" style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#374151',
              }}>
                Select Picker file to upload:
              </label>
              <input 
                type="file" 
                id="file2" 
                name="file2" 
                accept=".csv"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(102,126,234,0.2)',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.8)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(102,126,234,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '14px 28px',
              background: loading 
                ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
              transform: loading ? 'none' : 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(102,126,234,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(102,126,234,0.3)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #fff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}></div>
                Uploading...
              </div>
            ) : uploadType === 'rider' ? 'Upload Files' : 'Upload File'}
          </button>

          {message && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'center',
              background: message.includes('success') 
                ? 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.1) 100%)',
              color: message.includes('success') ? '#059669' : '#dc2626',
              border: `1px solid ${message.includes('success') ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
            }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
