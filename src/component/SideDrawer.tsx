import React, { useState } from "react";
import UploadModal from './UploadModal';
 
// 1️⃣ Props ka type define karo
interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// 2️⃣ Functional component me type lagao
const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [claverModalOpen, setClaverModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState('rider');
  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header" style={{ paddingTop: '80px' }}>
          <button onClick={onClose}>✕</button>
        </div>
        <ul className="drawer-list">
          {/* <li>History</li>
          <li>Rider</li> */}
          <li style={{ 
            cursor: 'pointer', 
            color: '#fff', 
            fontWeight: 'bold',
            padding: '12px 16px',
            margin: '4px 0',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #B15177 0%, #B15177 100%)',
          }} 
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.background = 'linear-gradient(135deg, #B15177 0%, #B15177 100%)';
            target.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.background = 'linear-gradient(135deg, #B15177 0%, #B15177 100%)';
            target.style.transform = 'translateX(0)';
          }}
          onClick={() => { 
            setUploadType('rider');
            setUploadModalOpen(true);
            onClose();
          }}>Upload Data</li>
          
          <li style={{ 
            cursor: 'pointer', 
            color: '#fff', 
            fontWeight: 'bold',
            padding: '12px 16px',
            margin: '4px 0',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #B15177 0%, #B15177 100%)',
          }} 
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.background = 'linear-gradient(135deg, #B15177 0%, #B15177 100%)';
            target.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.background = 'linear-gradient(135deg, #B15177 0%, #B15177 100%)';
            target.style.transform = 'translateX(0)';
          }}
          onClick={() => { 
            setUploadType('claver');
            setClaverModalOpen(true);
            onClose();
          }}>Upload Claver Tab Data</li>
        </ul>
      </div>
      
      {/* Upload Modals */}
      <UploadModal 
        isOpen={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
        title="Upload Rider & Picker Data"
        uploadType="rider"
      />
      
      <UploadModal 
        isOpen={claverModalOpen} 
        onClose={() => setClaverModalOpen(false)} 
        title="Upload Claver Tab Data (GZ)"
        uploadType="claver"
      />
    </>
  );
};

export default SideDrawer;
