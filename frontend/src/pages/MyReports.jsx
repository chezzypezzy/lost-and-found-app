import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const MyReports = () => {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await axios.get('/items');
        const myItems = res.data.filter(item => item.user && item.user._id === userId);
        setItems(myItems);
      } catch (_) {
        console.error("Failed to fetch reports");
      }
    };
    if (userId) fetchMyItems();
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/items/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (_) {
        alert('Error deleting item');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Reports</h1>
      {items.length === 0 ? <p>No reports found.</p> : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.type} - {item.status}</p>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;