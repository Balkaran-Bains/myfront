
// import React, { useEffect, useState } from 'react';
// import axios from '../axios';
// import { useNavigate } from 'react-router-dom';


// const MyProfile = () => {
//   const [user, setUser] = useState({
//     username: '',
//     fullname: '',
//     email: '',
//     avatar: '',
//     postFile: '',
//     content : ''
//   });

//   const navigate = useNavigate();  

//   useEffect(() => {
//     const fetchProtected = async () => {
//       try {
//         const { data } = await axios.get('/api/v1/users/protected');
//         setUser({
//           username: data.user.username,
//           fullname: data.user.fullname,
//           email: data.user.email,
//           avatar: data.user.avatar,
//           postFile: data.user.postFile,
//           content: data.user.content
//         });
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           try {
//             await axios.post('/auth/refresh-token');
//             const { data } = await axios.get('/api/v1/users/protected');
//             setUser({
//               username: data.user.username,
//               fullname: data.user.fullname,
//               email: data.user.email,
//               avatar: data.user.avatar,
//               postFile: data.user.postFile,
//               content: data.user.content
//             });
//           } catch (refreshError) {
//             console.error('Error refreshing token', refreshError);
//             alert('Session expired. Please log in again.');
//           }
//         } else {
//           console.error('Error fetching protected resource', error);
//         }
//       }
//     };

//     fetchProtected();
//   }, []);

//   return (
//     <div className="w-full h-full bg-cyan-900 text-stone-50 flex flex-col items-center p-6">
      
      
//       <div className="flex items-center space-x-6 mb-6">
//         {user.avatar && (
//           <img
//             src={user.avatar}
//             alt="User Avatar"
//             className="rounded-full w-32 h-32 object-cover border-4 border-stone-50"
//           />
//         )}
//         <div className="text-center">
//           <h1 className="text-4xl font-semibold mb-2">{user.username}</h1>
//           <h2 className="text-xl">{user.email}</h2>
//         </div>
//       </div>


//       <div className="bg-violet-600 p-4 rounded-lg shadow-lg  max-w-md text-center mb-6">
//         <h2 className="text-2xl mb-2">Name: {user.fullname}</h2>
//       </div>

//           <div className='mt-3 mb-2'>
//             <h1 className=' text-2xl font-mono tracking-tight'> {user.fullname}'s Posts 👇</h1>
//           </div>

//       <div className="w-full max-w-md space-y-4 mb-10 ">
//         <div className="bg-rose-500 p-4 rounded-lg shadow-lg">
//         <p className="mb-2 font-bold "> My Profile Photo</p>
//         {user.avatar && (
//           <img src={user.avatar} alt="User Avatar"
//             className=""
//           />
//         )}
//         </div>
      
//       </div>

//       <div className="w-full max-w-md space-y-4 mb-10 ">
//         <div className="bg-rose-500 p-4 rounded-lg shadow-lg">
//         <p className="mb-2 font-bold "> {user.content}</p>
//         {user.postFile && (
//           <img src={user.postFile} alt=""
//             className=""
//           />
//         )}
//         </div>
      
//       </div>

//       <div
//         className="mt-6 p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
//         onClick={() => navigate('/post')}
//       >
//         Post a Photo
//       </div>

//     </div>
//   );
// };

// export default MyProfile;




import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const MyProfile = () => {
  const handleDeletePost = async (postId) => {
    try {
        const response = await axios.delete(`/api/v1/post/deletePost/${postId}`);

        if (response.status === 200) {
            console.log('Post deleted successfully');
            setPostData(posts.filter(post => post._id !== postId));
        } else {
            console.error('Failed to delete the post');
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
};

  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    avatar: '',
  });

  const [posts, setPostData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const { data } = await axios.get('/api/v1/users/protected');
        setUser({
          username: data.user.username,
          fullname: data.user.fullname,
          email: data.user.email,
          avatar: data.user.avatar,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            await axios.post('/auth/refresh-token');
            const { data } = await axios.get('/api/v1/users/protected');
            setUser({
              username: data.user.username,
              fullname: data.user.fullname,
              email: data.user.email,
              avatar: data.user.avatar,
            });
          } catch (refreshError) {
            console.error('Error refreshing token', refreshError);
            alert('Session expired. Please log in again.');
            navigate('/login');
          }
        } else {
          console.error('Error fetching protected resource', error);
        }
      }
    };
    fetchProtected();
  }, [navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get('/api/v1/post/getPostsByUserId');
        console.log(data);
        if (data && data.data) {
          setPostData(data.data);
        } else {
          console.error('No post data available');
        }
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="w-full h-full bg-cyan-900 text-stone-50 flex flex-col items-center p-6">
      <div className="flex items-center space-x-6 mb-6">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-full w-32 h-32 object-cover border-4 border-stone-50"
          />
        )}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">{user.username}</h1>
          <h2 className="text-xl">{user.email}</h2>
        </div>
      </div>

      <div className="bg-violet-600 p-4 rounded-lg shadow-lg max-w-md text-center mb-6">
        <h2 className="text-2xl mb-2">Name: {user.fullname}</h2>
      </div>

      <div className='mt-3 mb-3'>
        <h1 className='text-2xl font-mono tracking-tight'>{user.fullname}'s Posts 👇</h1>
      </div>

      <div className="w-full max-w-md space-y-4 mb-10">
        <div className="bg-rose-500 p-4 rounded-lg shadow-lg">
          <p className="mb-2 font-bold">My Profile Photo</p>
          {user.avatar && (
            <img src={user.avatar} alt="User Avatar" className="" />
          )}
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 mb-10">
      {posts.map((post) => (
    <div key={post._id} className="bg-rose-500 p-4 rounded-lg shadow-lg">
        <p className="mb-2 ">{post.content}</p>
        {post.postFile && (
            <img src={post.postFile} alt="Post" className="" />
        )}
        <button 
            className='mt-2 bg-red-700 p-2 rounded-lg text-xs tracking-tighter' 
            onClick={() => handleDeletePost(post._id)}
        > 
            Delete Post 
        </button>
    </div>
))}

</div>


      <div
        className="mt-6 p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
        onClick={() => navigate('/post')}
      >
        Post a Photo
      </div>
    </div>
  );
};

export default MyProfile;
