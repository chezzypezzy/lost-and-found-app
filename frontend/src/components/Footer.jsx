import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Lost & Found</h3>
          <p className="text-sm">Helping our community recover what matters most.</p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm">support@lostandfound.local</p>
          <p className="text-sm mt-2">&copy; 2026 Lost & Found App</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;