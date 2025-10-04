// import {
//   PlusIcon,
//   BookmarkIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";
const Navbar = ({ onNewNoteClick }) => {
  const user = {
    name : "Prince Patel",
    logo : "PP"
  }
  return (
    // bg-gray-100
    <nav className="fixed top-0 left-0 w-full bg-white border-b-1 border-gray-300 p-4 px-5 flex justify-between items-center text-white shadow-md z-50">
      <div className="flex items-center space-x-4">
        <span className="text-2xl text-black font-bold tracking-tight">Notepad</span>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={onNewNoteClick} className="flex items-center px-4 py-2 bg-gray-800 text-gray-100 rounded-full font-medium shadow-sm hover:bg-gray-700 transition-colors duration-200">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>New Note</span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 font-bold flex items-center justify-center border-2 border-black">
            {user.logo}
          </div>
          <span className="text-gray-500 group-hover:text-black transition-colors duration-200 hidden md:inline">
            {user.name}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// const Navbar = () => {
//   return (
//     <nav classNameName="bg-gray-800 text-white p-4 shadow-md">
//       <div classNameName="container mx-auto flex justify-between items-center">
//         {/* App Title */}
//         <div classNameName="flex items-center">
//           <span classNameName="text-xl font-bold tracking-wide">Notepad</span>
//         </div>

//         {/* Navigation Links / Buttons */}
//         <div classNameName="flex items-center space-x-4">
//           <button classNameName="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
//             New Note
//           </button>
//           <button classNameName="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
//             Save
//           </button>
//           <button classNameName="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
//             Share
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
