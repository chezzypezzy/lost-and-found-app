import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      navigate('/'); // Redirect to home after successful register
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={name} onChange={onChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={email} onChange={onChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;