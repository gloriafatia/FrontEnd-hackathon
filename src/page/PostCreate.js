import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';  // Make sure to import the auth context

const PostCreate = () => {
  const navigate = useNavigate();
  const { token, role } = useAuth();  // Get token and role from Auth context
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    if (!token || role !== 'ROLE_SELLER') {
      navigate('/login');  // Or any other page you want to redirect to
    }
  }, [token, role, navigate]);  // This effect will re-run if token or role changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDataToSend = {
      title: postData.title,
      description: postData.description,
      price: postData.price,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/posts/post', postDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Add JWT token here
        },
      });

      if (response.status === 201) {
        toast.success('Post created successfully!');
        //navigate('/postime'); // Redirect to a page after post creation
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      toast.error('An error occurred while creating the post');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Post</h2>
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
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
