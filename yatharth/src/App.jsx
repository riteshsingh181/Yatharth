
import { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setFormData({});
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/authenticate', {
        role,
        ...formData,
      });

      // Store JWT in localStorage or cookies
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      // Redirect to a protected route or dashboard
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!role && (
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-center">Choose Your Profile</h1>
          <p className="text-base text-gray-500 text-center">Select how you want to proceed</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 p-10">
            <div 
              onClick={() => handleRoleSelection('student')}
              className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer"
            >
              <img src="..\src\assets\student-icon.png" alt="Student" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Student</h2>
            </div>
            <div 
              onClick={() => handleRoleSelection('parent')}
              className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer"
            >
              <img src="..\src\assets\parent-icon.png" alt="Parent" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Parent</h2>
            </div>
            <div 
              onClick={() => handleRoleSelection('admin')}
              className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer"
            >
              <img src="..\src\assets\admin-icon.png" alt="Admin" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Admin</h2>
            </div>
          </div>
        </div>
      )}
      {role && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-6">{role.charAt(0).toUpperCase() + role.slice(1)} Sign In</h2>
          {error && <p className="text-red-500">{error}</p>}
          {role === 'student' && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="studentID"
                placeholder="Student ID"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </>
          )}
          {role === 'parent' && (
            <>
              <input
                type="text"
                name="studentID"
                placeholder="Student ID"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </>
          )}
          {role === 'admin' && (
            <>
              <input
                type="text"
                name="schoolID"
                placeholder="School ID"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Continue
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
