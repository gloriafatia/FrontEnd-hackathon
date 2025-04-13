import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostRequests = () => {
  const { token, role } = useAuth();
  const [groupedRequests, setGroupedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!token || role !== 'ROLE_SELLER') {
      navigate('/login');
    } else {
      const fetchGroupedRequests = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/posts_request/get/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Ensure the response data is an array
          setGroupedRequests(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Failed to fetch grouped requests:', error);
          setGroupedRequests([]);
        } finally {
          setLoading(false);
        }
      };

      fetchGroupedRequests();
    }
  }, [token, role, navigate]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-green-700 mb-6">
        Të gjitha kërkesat
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : groupedRequests.length === 0 ? (
        <p className="text-center text-gray-500">Nuk keni bere oferta per postime!</p>
      ) : (
        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
          {groupedRequests.map((group) => (
            <div key={group.postId} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">{group.postTitle}</h2>

              {group.requests.length > 0 ? (
                group.requests.map((req) => (
                  <div
                    key={req.id}
                    className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">{req.userName}</p>
                        <p className="text-sm text-gray-600">Phone: {req.phoneNumber}</p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${
                          req.approved ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        {req.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="italic text-gray-700 my-2">{req.description}</p>
                    <p className="text-sm text-gray-400">
                      Kërkuar më: {new Date(req.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">Nuk ka kërkesa për këtë postim.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostRequests;
