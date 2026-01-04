import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react'; 
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const { login } = useAuth();

   // Inside handleGoogleSuccess...
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/google`, {
                token: credentialResponse.credential
            });

            if (res.data.token) {
                login(res.data); // Save the Whole Object (including picture)
            }
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
            
            {/* Main Card */}
            <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
                
                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Notepad Pro
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Securely save and sync your notes
                    </p>
                </div>

                {/* The Google Button - Centered */}
                <div className="flex flex-col gap-4">
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log('Login Failed')}
                            theme="outline"
                            size="large"
                            shape="pill"
                            width="300" 
                            text="continue_with"
                        />
                    </div>
                    
                    <p className="text-center text-xs text-gray-400 mt-2">
                        No password required. Instant access.
                    </p>
                </div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} Notepad App. Secured by Google.</p>
            </div>
        </div>
    );
};

export default Login;

















// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // <--- Import this

// const Login = () => {
//     // 1. GET THE LOGIN FUNCTION FROM CONTEXT
//     const { login } = useAuth(); 

//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//             console.log("Sending token to backend..."); // Debug log

//             const res = await axios.post("http://localhost:3000/api/auth/google", {
//                 token: credentialResponse.credential
//             });
            
//             console.log("Backend response:", res.data); // Debug log

//             // 2. CHECK SUCCESS AND CALL LOGIN
//             // We check for 'token' because that's what proves we are logged in
//             if (res.data.token) {
//                 login(res.data); 
//             }
//         } catch (error) {
//             console.error("Login Failed:", error);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-50">
//              {/* ... your UI code ... */}
//             <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => console.log('Login Failed')}
//             />
//              {/* ... */}
//         </div>
//     );
// };

// export default Login;