import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg shadow-lg mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to Community Lost & Found</h2>
        <p className="opacity-90">Search below to find what you've lost or report what you've found.</p>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Recent Lost & Found Items</h1>
      
      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search by title, location, or category..." 
          className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No items found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className={`bg-white rounded shadow-md border-l-4 ${item.status === 'returned' ? 'border-gray-400 opacity-75' : 'border-blue-500'} overflow-hidden`}>

              {/* Image Section */}
              {item.image && (
                <div className="h-48 w-full bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.type.toUpperCase()}
                  </span>
                  {item.status === 'returned' && (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-200 text-gray-700">RETURNED</span>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {item.category}</p>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {item.location}</p>
                <Link to={`/item/${item._id}`} className="text-blue-600 hover:underline font-medium">View Details</Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;