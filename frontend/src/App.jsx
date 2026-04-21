import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostItem from './pages/PostItem';
import ItemDetails from './pages/ItemDetails';
import MyReports from './pages/MyReports';
import About from './pages/About'; // Import About

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow"> {/* Ensures footer stays at bottom */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-item" element={<PostItem />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;