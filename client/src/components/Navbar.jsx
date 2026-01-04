import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { Search, Menu, X, LogOut, Sparkles, Plus, ArrowLeft } from 'lucide-react';

const Navbar = ({ onNewNoteClick, onSearch, searchQuery }) => {
  const { user, logout } = useAuth();
  
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all duration-300">
        
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* EXPANDED SEARCH (Mobile) */}
            {isSearchExpanded ? (
                <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button 
                        onClick={() => setIsSearchExpanded(false)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="flex-1 bg-transparent text-lg text-gray-800 placeholder-gray-400 outline-none h-full"
                        autoFocus
                    />
                    {searchQuery && (
                        <button onClick={() => onSearch('')}>
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>
            ) : (
                /* STANDARD NAVBAR */
                <>
                    {/* LEFT: Logo */}
                    <div className="flex items-center gap-2 select-none min-w-max">
                        <div className="bg-gradient-to-tr from-blue-600 to-blue-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">
                            Notepad Pro
                        </span>
                    </div>

                    {/* CENTER: Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                        />
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-1 sm:gap-4">
                        
                        {/* 1. Mobile Search Icon */}
                        <button 
                            onClick={() => setIsSearchExpanded(true)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>

                        {/* CREATE NOTE ICON (Mobile & Desktop Unified) */}
                        {/* Mobile: Simple Icon */}
                        <button 
                            onClick={onNewNoteClick}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Plus className="w-7 h-7 text-blue-600" />
                        </button>

                        {/* Desktop: Full Button */}
                        <button 
                            onClick={onNewNoteClick}
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create</span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative ml-1">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-0.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                            >
                                <img 
                                    src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`} 
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                     {/* Header with Avatar */}
                                      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 text-center">
                                          <div className="mx-auto mb-2">
                                                {user?.picture ? (
                                                  <img src={user.picture} alt="Profile" className="w-12 h-12 rounded-full mx-auto" referrerPolicy="no-referrer" />
                                              ) : (
                                                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                                                      {user?.name?.charAt(0)}
                                                  </div>
                                              )}
                                          </div>
                                          <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                      </div>

                                      {/* Actions */}
                                      <div className="p-2">
                                          <button 
                                            onClick={logout} 
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium"
                                          >
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                          </button>
                                      </div>
                                  </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from "../context/AuthContext";
// import { Search, Menu, X, LogOut, Sparkles, Plus } from 'lucide-react'; // Added 'Plus'

// const Navbar = ({ onNewNoteClick, onSearch, searchQuery }) => {
//   const { user, logout } = useAuth();
  
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center z-50 h-16 shadow-sm">
        
//         {/* LEFT: Branding */}
//         <div className="flex items-center gap-3 min-w-max">
//           {/* <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
//               <Menu className="w-6 h-6" />
//           </button> */}
          
//           <div className="flex items-center gap-2 select-none">
//               <div className="bg-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//                   <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-700 tracking-tight hidden sm:block">
//                   Notepad Pro
//               </span>
//           </div>
//         </div>

//         {/* CENTER: Search Bar */}
//         <div className="flex-1 max-w-2xl mx-4 lg:mx-12 hidden md:block">
//           <div className="relative group">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//               </div>
//               <input
//                   type="text"
//                   placeholder="Search your notes"
//                   value={searchQuery}
//                   onChange={(e) => onSearch(e.target.value)}
//                   className="block w-full pl-12 pr-10 py-3 bg-gray-100 border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//               />
//               {searchQuery && (
//                   <button 
//                       onClick={() => onSearch('')}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black"
//                   >
//                       <X className="w-5 h-5" />
//                   </button>
//               )}
//           </div>
//         </div>

//         {/* RIGHT: Actions & Profile */}
//         <div className="flex items-center gap-4 min-w-max" ref={menuRef}>
          
//           {/* --- THE CREATE BUTTON (Desktop) --- */}
//           <button 
//               onClick={onNewNoteClick}
//               className="hidden sm:flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm transition-all hover:shadow-md"
//           >
//               <Plus className="w-5 h-5 text-blue-600" />
//               <span>Create</span>
//           </button>

//           {/* User Profile Section */}
//           <div className="flex items-center gap-3">
//               <div className="hidden lg:flex flex-col items-end mr-1">
//                   <span className="text-sm font-bold text-gray-700 leading-tight">
//                       {user?.name} 
//                   </span>
//                   <span className="text-[11px] text-gray-400 font-medium">
//                       {user?.email}
//                   </span>
//               </div>

//               <div 
//                   className="relative cursor-pointer"
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                  {user?.picture ? (
//                      <img 
//                        src={user.picture} 
//                        alt="Profile"
//                        referrerPolicy="no-referrer"
//                        className={`w-10 h-10 rounded-full border-2 p-0.5 object-cover transition-all ${isMenuOpen ? 'border-blue-500 shadow-md' : 'border-gray-200'}`} 
//                      />
//                  ) : (
//                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
//                          {user?.name?.charAt(0).toUpperCase()}
//                      </div>
//                  )}
                 
//                  {/* Dropdown Menu */}
//             {isMenuOpen && (
//                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
//                     {/* Header with Avatar */}
//                     <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 text-center">
//                         <div className="mx-auto mb-2">
//                              {user?.picture ? (
//                                 <img src={user.picture} alt="Profile" className="w-12 h-12 rounded-full mx-auto" referrerPolicy="no-referrer" />
//                              ) : (
//                                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-xl">
//                                      {user?.name?.charAt(0)}
//                                 </div>
//                              )}
//                         </div>
//                         <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                     </div>

//                     {/* Actions */}
//                     <div className="p-2">
//                          <button 
//                            onClick={logout} 
//                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium"
//                          >
//                            <LogOut className="w-4 h-4" />
//                            Sign out
//                          </button>
//                     </div>
//                </div>
//            )}
//               </div>
//           </div>
//         </div>
//       </nav>

//       {/* --- FLOATING ACTION BUTTON (Mobile Only) --- */}
//       {/* This button stays fixed at the bottom right of the screen on phones */}
//       <button
//         onClick={onNewNoteClick}
//         className="fixed bottom-6 right-6 sm:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-90 z-50 flex items-center justify-center"
//       >
//         <Plus className="w-8 h-8" />
//       </button>
//     </>
//   );
// };

// export default Navbar;
















// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from "../context/AuthContext";
// import { Search, Menu, X, LogOut, Sparkles } from 'lucide-react';

// const Navbar = ({ onNewNoteClick, onSearch, searchQuery }) => {
//   // 1. Get the Google User Data from Context
//   const { user, logout } = useAuth();
  
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center z-50 h-16 shadow-sm">
      
//       {/* LEFT: Branding (Matches Login Page) */}
//       <div className="flex items-center gap-3 min-w-max">
//         {/* <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
//             <Menu className="w-6 h-6" />
//         </button> */}
        
//         <div className="flex items-center gap-2 select-none">
//             <div className="bg-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//                 <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-gray-700 tracking-tight hidden sm:block">
//                 Notepad Pro
//             </span>
//         </div>
//       </div>

//       {/* CENTER: Search Bar */}
//       <div className="flex-1 max-w-2xl mx-4 lg:mx-12 hidden md:block">
//         <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//             </div>
//             <input
//                 type="text"
//                 placeholder="Search your notes"
//                 value={searchQuery}
//                 onChange={(e) => onSearch(e.target.value)}
//                 className="block w-full pl-12 pr-10 py-3 bg-gray-100 border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-md focus:ring-2 focus:ring-blue-100 transition-all duration-200"
//             />
//             {searchQuery && (
//                 <button 
//                     onClick={() => onSearch('')}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black"
//                 >
//                     <X className="w-5 h-5" />
//                 </button>
//             )}
//         </div>
//       </div>

//       {/* RIGHT: Google User Profile */}
//       <div className="flex items-center gap-3 min-w-max" ref={menuRef}>
        
//         {/* 2. Display Google Name (Hidden on mobile) */}
//         <div className="hidden lg:flex flex-col items-end mr-1">
//             <span className="text-sm font-bold text-gray-700 leading-tight">
//                 {user?.name} 
//             </span>
//             <span className="text-[11px] text-gray-400 font-medium">
//                 {user?.email}
//             </span>
//         </div>

//         {/* 3. Display Google Profile Picture */}
//         <div 
//             className="relative cursor-pointer"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//            {user?.picture ? (
//                // If Google Pic exists, show it
//                <img 
//                  src={user.picture} 
//                  alt={user.name}
//                  referrerPolicy="no-referrer" // Important for Google Images
//                  className={`w-10 h-10 rounded-full border-2 p-0.5 object-cover transition-all ${isMenuOpen ? 'border-blue-500 shadow-md' : 'border-gray-200'}`} 
//                />
//            ) : (
//                // Fallback if image fails (First letter of Name)
//                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
//                    {user?.name?.charAt(0).toUpperCase()}
//                </div>
//            )}
           
//            {/* Dropdown Menu */}
//            {isMenuOpen && (
//                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
//                     {/* Header with Avatar */}
//                     <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 text-center">
//                         <div className="mx-auto mb-2">
//                              {user?.picture ? (
//                                 <img src={user.picture} alt="Profile" className="w-12 h-12 rounded-full mx-auto" referrerPolicy="no-referrer" />
//                              ) : (
//                                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-xl">
//                                      {user?.name?.charAt(0)}
//                                 </div>
//                              )}
//                         </div>
//                         <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                     </div>

//                     {/* Actions */}
//                     <div className="p-2">
//                          <button 
//                            onClick={logout} 
//                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium"
//                          >
//                            <LogOut className="w-4 h-4" />
//                            Sign out
//                          </button>
//                     </div>
//                </div>
//            )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;