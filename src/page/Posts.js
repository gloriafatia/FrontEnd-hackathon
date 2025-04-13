import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import placeholderImage from '../assets/placeholder.png';
import { useAuth } from '../contexts/AuthContext';

const Posts = () => {
  const navigate = useNavigate();
  const { token, role } = useAuth();
  const [hasPermission, setHasPermission] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (!token || role !== 'ROLE_SELLER') {
      navigate('/login');
    } else {
      setHasPermission(true);
    }
  }, [token, role, navigate]);

  useEffect(() => {
    if (hasPermission) {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/posts/get/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              title: filter,
              page: currentPage - 1,
            },
          });
          setPosts(res.data.content || []);
          setTotalPages(res.data.totalPages || 0);
        } catch (err) {
          console.error(err);
          setPosts([]);
          setTotalPages(0);
        }
      };
      fetchPosts();
    }
  }, [hasPermission, filter, currentPage]);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (postId) => {
    navigate(`edit-post/${postId}`);
  };

  const fetchRequests = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/posts_request/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data || []);
      setSelectedPostId(postId);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts_request/approve/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
        await fetchRequests(selectedPostId);
        
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
  

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-green-700 mb-6">
        Postimet e tua
      </h1>

      <h2 className="text-2xl font-semibold mb-4 text-green-700">Filters</h2>
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:space-x-6 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Filter by title..."
            value={filter}
            onChange={(e) => {
              setCurrentPage(1);
              setFilter(e.target.value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-green-700">Posts</h2>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img
                  src={placeholderImage}
                  alt={post.title}
                  className="max-w-[250px] h-auto object-contain rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-lg font-bold text-green-500">{post.price} LEK</p>
              <p className="text-sm text-gray-500">{post.userName}</p>
              <p className="text-xs text-gray-400">{new Date(post.createdDate).toLocaleDateString()}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => fetchRequests(post.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  View Requests
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">No posts found.</div>
        )}
      </div>

      {totalPages > 0 && (
        <div className="mt-4 flex justify-center space-x-2 items-center">
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Previous
            </button>
          )}
          <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Next
            </button>
          )}
        </div>
      )}

{showModal && (
  <div
    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setShowModal(false)}
  >
    <div
      className="bg-white p-6 rounded-lg max-w-lg w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>
      <h3 className="text-2xl font-semibold text-green-700 mb-4">Requests for Post</h3>
      
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <div className="mb-2">
                <p className="text-lg font-semibold text-gray-800">{request.userName}</p>
                <p className="text-sm text-gray-600">Phone: {request.phoneNumber}</p>
              </div>

              <div className="mb-2">
                <p className="text-gray-700 italic">{request.description}</p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Requested on: {new Date(request.createdDate).toLocaleDateString()}</span>
                <span>
                  Status:{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${
                      request.approved ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {request.approved ? "Approved" : "Pending"}
                  </span>
                </span>
              </div>

              {!request.approved && (
                <button
                  onClick={() => handleApprove(request.id)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Approve
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No requests available.</p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Posts;
