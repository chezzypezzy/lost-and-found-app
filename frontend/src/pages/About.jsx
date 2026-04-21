const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Reuniting People with Their Belongings</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Our mission is to create a trusted, local community where lost items find their way home.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="font-bold mb-2">Search</h3>
              <p className="text-gray-600">Browse recent lost and found reports in your area.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">📢</div>
              <h3 className="font-bold mb-2">Report</h3>
              <p className="text-gray-600">Post an item you've lost or found in seconds.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="font-bold mb-2">Connect</h3>
              <p className="text-gray-600">Contact the owner or finder directly to arrange a return.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Use Lost & Found?</h2>
          <p className="text-gray-600 leading-relaxed">
            Losing something important can be stressful. Our platform simplifies the recovery process by providing a centralized, easy-to-use database for our community. Whether it's a set of keys, a wallet, or a beloved pet, we're here to help bridge the gap between loss and recovery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;