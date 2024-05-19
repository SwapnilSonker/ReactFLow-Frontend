// src/components/NodeModal.tsx
import React, { useState } from 'react';
// import './NodeModal.css'; // Import the CSS file

interface NodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: string, data: { email: string; subject: string; body: string }) => void;
}

const NodeModal: React.FC<NodeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [nodeType, setNodeType] = useState('Cold Email');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSave = () => {
    onSave(nodeType, { email, subject, body });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Node</h2>
        <label>
          Type:
          <select value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
            <option value="Cold Email">Cold Email</option>
            <option value="Wait/Delay">Wait/Delay</option>
            <option value="Lead Source">Lead Source</option>
          </select>
        </label>
        {nodeType === 'Cold Email' && (
          <>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Subject:
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <label>
              Body:
              <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
          </>
        )}
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NodeModal;
