import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const PostItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    type: 'lost',
    description: '',
    location: '',
    contactInfo: '',
    image: ''
  });
  const navigate = useNavigate();
  const { title, category, type, description, location, contactInfo } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", formData);
    try {
      await axios.post('/items', formData);
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      alert('Error posting item');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Report an Item</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input type="text" name="title" value={title} onChange={onChange} className="w-full p-2 border rounded" required />
        </div>
        
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Type</label>
            <select name="type" value={type} onChange={onChange} className="w-full p-2 border rounded">
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select name="category" value={category} onChange={onChange} className="w-full p-2 border rounded">
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Documents">Documents</option>
              <option value="Keys">Keys</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={location} onChange={onChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={description} onChange={onChange} className="w-full p-2 border rounded" rows="3" required></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contact Info</label>
          <input type="text" name="contactInfo" value={contactInfo} onChange={onChange} className="w-full p-2 border rounded" placeholder="Email or Phone" required />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={onChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">Paste a link to an image of the item.</p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Report</button>
      </form>
    </div>
  );
};

export default PostItem;