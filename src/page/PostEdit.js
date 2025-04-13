import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const PostEdit = () => {
  const { postId } = useParams();  // Get postId from URL params
  const navigate = useNavigate();
  const { token, role, username } = useAuth();  // Get token, role, and username from Auth context
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch post details when the component loads
  useEffect(() => {
    if (!token || role !== 'ROLE_SELLER') {
      navigate('/login');  // Redirect to login if not a seller
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/get/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const post = response.data;
          // Check if the logged-in user owns the post
          if (post.username !== username) {
            navigate('/login');  // Redirect to login if the user doesn't own the post
            return;
          }
          setPostData(post);  // Set form fields with current post data
        }
      } catch (error) {
        toast.error('Failed to fetch post data');
        console.error(error);
        navigate('/login');  // Redirect to login on error
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchPost();
  }, [postId, token, username, role, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDataToSend = {
      title: postData.title,
      description: postData.description,
      price: postData.price,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/posts/put/${postId}`,
        postDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Post updated successfully!');
        navigate(`/postime`);  // Navigate to the post detail page
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      toast.error('An error occurred while updating the post');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching the post
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={postData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (LEK)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={postData.price}
            onChange={handleChange}
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
