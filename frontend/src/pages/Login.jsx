import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      navigate('/');
    } catch (err) {
      alert(err.response.data.msg || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please sign in to your account</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={onChange} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={onChange} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;