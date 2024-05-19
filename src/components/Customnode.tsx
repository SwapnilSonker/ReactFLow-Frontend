// src/components/CustomNode.tsx
import { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const CustomNode = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmail = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, body }),
      });

      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the email');
    }
  };

  return (
    <div style={{ padding: 10, border: '1px solid black', borderRadius: 5, width: 200 }}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <br />
      <label>
        Body:
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <br />
      <button onClick={sendEmail}>Send Email</button>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

// export default CustomNode;
