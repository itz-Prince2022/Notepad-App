import Notes from "./components/Notes";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth(); // Get loading state

  // Show a loading screen while we check LocalStorage
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      { !user ? <Login /> : <Notes /> }
    </>
  );
}

export default App;