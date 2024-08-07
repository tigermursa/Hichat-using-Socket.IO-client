import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Log the form data to see what is being sent
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      console.log("Registration successful:", response.data);
      toast.success("Registration successful!");
      reset(); // Clear the form
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      toast.error(
        "Registration failed: " + (error.response?.data || error.message)
      );
      // Handle registration error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            {...register("img", { required: "Image URL is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.img && (
            <p className="text-red-500 text-sm mt-1">{errors.img.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
