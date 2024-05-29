// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-500 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-xl font-bold">MySocialApp</div>
//         <div>
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/" className="text-white">Home</Link>
//             </li>
//             <li>
//               <Link to="/myprofile" className="text-white">My Profile</Link>
//             </li>
//             <li>
//               <Link to="/register" className="text-white">Register</Link>
//             </li>
//             <li>
//               <Link to="/login" className="text-white">Login</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">MySocialApp</div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link to="/myprofile" className="text-white">My Profile</Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/register" className="text-white">Register</Link>
                </li>
                <li>
                  <Link to="/login" className="text-white">Login</Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logout}  className=" text-slate-200 bg-red-600 p-1 rounded-lg">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
