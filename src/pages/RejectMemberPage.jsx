import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RejectMemberPage() {
  const { email } = useParams();
  const [status, setStatus] = useState('pending'); // pending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    async function rejectMember() {
      setStatus('pending');
      setErrorMsg('');
      try {
        const response = await fetch(`http://localhost:8082/api/v1/admin/members/${encodeURIComponent(email)}/reject`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Rejection failed.');
        setStatus('success');
        
        // After a delay, redirect
        setTimeout(() => {
          navigate('/dashboard/admin/review-members');
        }, 2000);
      } catch (err) {
        setErrorMsg(err.message);
        setStatus('error');
      }
    }
    rejectMember();
  }, [email, accessToken, navigate]);

  if (status === 'pending') {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p className="text-xl font-semibold text-blue-700">Approving member <span className="font-mono">{email}</span>...</p>
    </div>
  );
}

if (status === 'success') {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <svg className="h-8 w-8 text-green-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
      </svg>
      <p className="text-xl font-semibold text-green-700 mb-2">
        Member <span className="font-mono">{email}</span> approved successfully!
      </p>
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}

return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <svg className="h-8 w-8 text-red-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    <p className="text-xl font-semibold text-red-700 mb-2">
      Error approving member <span className="font-mono">{email}</span>
    </p>
    <p className="text-red-600">{errorMsg}</p>
  </div>
);
}

export default RejectMemberPage;
