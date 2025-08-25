import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ApproveMemberPage() {
  const { email } = useParams();
  const [status, setStatus] = useState('pending'); // pending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    async function approveMember() {
      setStatus('pending');
      setErrorMsg('');
      try {
        const response = await fetch(`http://localhost:8082/api/v1/admin/members/${encodeURIComponent(email)}/confirm`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Approval failed.');
        setStatus('success');
        
        // After a delay, navigate back or elsewhere
        setTimeout(() => {
          navigate('/dashboard/admin/review-members');
        }, 2000);
      } catch (err) {
        setErrorMsg(err.message);
        setStatus('error');
      }
    }
    approveMember();
  }, [email, accessToken, navigate]);

  if (status === 'pending') {
    return <p>Approving member {email}...</p>;
  }

  if (status === 'success') {
    return <p>Member {email} approved successfully! Redirecting...</p>;
  }

  return <p style={{ color: 'red' }}>Error approving member {email}: {errorMsg}</p>;
}

export default ApproveMemberPage;
