import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPendingMembers() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:8082/api/v1/admin/members/pending', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data.content || []);
      } catch (err) {
        setError('Could not fetch pending members.');
      } finally {
        setLoading(false);
      }
    }
    fetchPendingMembers();
  }, [accessToken]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Pending Members</h1>
        {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
        {loading ? (
          <div className="text-center py-6 text-lg text-gray-700">Loading...</div>
        ) : (members.length === 0 && !error)  ? (
          <div className="text-center py-6 text-lg text-gray-700">
            No pending members found.
            </div>
        ) : (
          <ul>
            {members.map(member => (
              <li
                key={member.email}
                className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200 flex items-center"
              >
                <img
                  src={
                    member.profilePictureUrl ||
                    'https://ui-avatars.com/api/?name=' + member.firstName + '+' + member.lastName
                  }
                  alt={member.firstName}
                  className="w-16 h-16 rounded-full object-cover mr-6 border"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-gray-900">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-gray-700">{member.email}</div>
                  <div className="text-gray-600">Occupation: {member.occupation || 'N/A'}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    State: {member.addresses
                      ?.find(addr => addr.type?.toLowerCase() === "local")
                      ?.state || "N/A"}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">Status: Pending</div>
                </div>
                <div className="ml-8 flex flex-col gap-2">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                    onClick={() => navigate(`/dashboard/admin/members/${member.email}/approve`)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                    onClick={() => navigate(`/dashboard/admin/members/${member.email}/reject`)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReviewMembersPage;
