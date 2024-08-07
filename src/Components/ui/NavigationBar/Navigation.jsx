import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Lib/AuthContext/AuthContext";

const Navigation = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MyApp
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={
                    user.img ||
                    "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-business-user-profile-vector-png-image_1541960.jpg"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-2xl font-bold">
                  {user.username}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
