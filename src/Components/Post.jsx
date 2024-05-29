import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const Post = () => {
  const [formData, setFormData] = useState({
    content: '',
    postFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'postFile') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('postFile', formData.postFile);
    data.append('content', formData.content);

    try {
      const response = await api.post('/api/v1/post/uploadPost', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post uploaded Successfully!');
      navigate('/myprofile');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Post upload failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Content</label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Post</label>
            <input
              type="file"
              accept="image/*"
              name="postFile"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
