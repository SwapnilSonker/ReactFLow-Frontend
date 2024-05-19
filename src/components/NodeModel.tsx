// src/components/NodeModal.tsx
import React, { useState } from 'react';
import './NodeModal.css'; 

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
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (nodeType === 'Cold Email') {
      
      if (!email || !subject || !body) {
        setError('All fields are required.');
        return;
      }

      const response = await fetch('https://reactflow-backend-nnav.onrender.com/schedule-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, body }),
      });

      if (response.ok) {
        setMessage('Email scheduled successfully');
        setTimeout(() => {
          onSave(nodeType, { email, subject, body });
          setEmail(''); 
          setSubject(''); 
          setBody(''); 
          setError(null); 
          setMessage(null); 
          onClose();
        }, 2000); 
      } else {
        console.error('Failed to send email');
      }
    } else {
      if (!email || !subject || !body) {
        setError('All fields are required.');
        return;
      }
      onSave(nodeType, { email, subject, body });
      setEmail(''); 
      setSubject(''); 
      setBody(''); 
      setError(null); 
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Node</h2>
        {message && <p className="confirmation-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
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
