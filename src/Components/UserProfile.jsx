import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/users/${username}`);
        setUser(data.data.user);
        setPosts(data.data.posts);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <div>Loading...</div>; // Display loading message

  if (error) return <div>Error: {error.message}</div>; // Display error message

  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-md">{user.username}'s Profile</h1>
      <img src={user.avatar} alt={`${user.username}'s avatar`} className="w-40 h-40 rounded-full mb-4" />
      
      <div className="w-full max-w-lg space-y-6">
        {posts.map(post => (
          <div key={post._id} className="bg-sky-500 p-6 rounded-xl shadow-xl">
            <p className="mb-4 text-lg text-white">{post.content}</p>
            {post.postFile && <img src={post.postFile} alt="Post" className="w-full max-h-96 object-cover rounded-md mb-4" />}
          </div>
        ))}
      </div>
      <div className="w-full max-w-md space-y-4 mt-8">
        <div className="bg-rose-500 p-4 rounded-lg shadow-lg">
          <p className="mb-2 font-bold">My Profile Photo</p>
          {user.avatar && (
            <img src={user.avatar} alt="User Avatar" className="" />
          )}
        </div>
      </div>
      <Link to="/">
        <button className="mt-7 mb-4 bg-cyan-800 p-3 rounded-xl">
          Go Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default UserProfile;
