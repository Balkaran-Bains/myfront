import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const { data } = await axios.get('/api/v1/post/getAllPosts');
        setPosts(data.data);
      } catch (error) {
        console.error('Error fetching all posts:', error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className=' '>
   <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white flex flex-col items-center p-6">
  <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-md">All Posts</h1>
  <div className="w-full max-w-lg space-y-6">
    {posts.map(post => (
      <div key={post._id} className="bg-sky-500 p-6 rounded-xl shadow-xl transform transition-transform duration-400 hover:scale-105 hover:bg-sky-700 group">
        <p className="mb-4 text-lg text-white transition-colors transition-font-weight duration-300  ">{post.content}</p>
        {post.postFile && <img src={post.postFile} alt="Post" className="w-full h-auot  max-h-96 object-cover rounded-md mb-4 border-2 border-white" />}
        <div className="mt-4 flex items-center space-x-4">
        <img className="rounded-full w-20 h-20 transition-all duration-300 group-hover:w-20 group-hover:h-20 border-2 border-white" src={post.user.avatar} alt="" />
          <div>
          <p className="text-sm text-white transition-colors transition-font-weight duration-300">
                    Posted by: <Link to={`/user/${post.user.username}`} className="text-white underline"><strong>{post.user.username}</strong></Link>
                  </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>





    </div>
  );
};

export default Home;
