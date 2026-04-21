import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          📍 Lost & Found
        </Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/post-item" className="text-gray-600 hover:text-blue-600 font-medium transition">
                + Post Item
              </Link>
              <Link to="/my-reports" className="text-gray-600 hover:text-blue-600 font-medium transition">
                My Reports
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">
                About
              </Link>
              <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">
                About
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;