import { useContext } from "react";
import { AuthContext } from "../../Lib/AuthContext/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <img
          src={
            user.img ||
            "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          }
          alt="User"
          className="w-24 h-24 rounded-full"
        />
        <div className="mt-2">
          <p className="text-lg font-semibold">Name: {user.username}</p>
          <p className="text-lg font-semibold">Email: {user.email}</p>
          <p className="text-lg font-semibold">ID: {user._id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
