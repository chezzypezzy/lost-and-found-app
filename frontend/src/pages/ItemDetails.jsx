import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/items/${id}`);
        setItem(res.data);

        // Check if the logged-in user is the owner by decoding the JWT token
        const token = localStorage.getItem('token');
        if (token && res.data.user) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.user?.id === res.data.user._id) {
            setIsOwner(true);
          }
        }
      } catch (_) {
        console.error("Failed to fetch item");
      }
    };
    fetchItem();
  }, [id]);

  const handleMarkReturned = async () => {
    try {
      await axios.put(`/items/${id}`, { status: 'returned' });
      setItem({ ...item, status: 'returned' });
      alert('Item marked as returned!');
    } catch (_) {
      alert('Error updating item');
    }
  };

  if (!item) return <div className="text-center p-10 text-gray-500">Loading report...</div>;

  return (
    <div className="container mx-auto p-4 max-w-3xl pb-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        &larr; Back to all items
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Banner */}
        <div className={`p-6 ${item.type === 'lost' ? 'bg-red-50' : 'bg-green-50'} border-b border-gray-100`}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
            <div className="flex items-center gap-2">
              {item.status === 'returned' && (
                <span className="px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full bg-gray-100 text-gray-500">
                  Returned
                </span>
              )}
              <span className={`px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full ${item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {item.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Image Section */}
          {item.image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover mx-auto"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Category</p>
                <p className="text-lg text-gray-800 font-medium">{item.category}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Location</p>
                <p className="text-lg text-gray-800 font-medium flex items-center gap-2">📍 {item.location}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Date Reported</p>
                <p className="text-lg text-gray-800 font-medium">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Posted By</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {item.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{item.user?.name || 'Unknown User'}</p>
                  <p className="text-sm text-gray-500">Member</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              {item.description}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              📞 Contact Information
            </h3>
            <p className="text-blue-800 mb-4 text-sm">
              If you have information about this item, please reach out directly.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200 text-blue-900 font-mono text-lg text-center shadow-sm">
              {item.contactInfo}
            </div>

            {isOwner && item.status === 'active' && (
              <button
                onClick={handleMarkReturned}
                className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-semibold transition"
              >
                ✅ Mark as Returned
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;