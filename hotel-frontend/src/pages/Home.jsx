import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2, Sparkles, TrendingUp, Heart } from 'lucide-react';
import api from '../api';
import HotelCard from '../components/ui/HotelCard';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationQuery, setLocationQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (locationQuery) {
      navigate(`/hotels?location=${locationQuery}`);
    } else if (searchQuery) {
      navigate(`/hotels?search=${searchQuery}`);
    } else {
      navigate('/hotels');
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center pt-20 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/hero_hotel_bg.png" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 mix-blend-multiply" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          {/* Subtitle with Icon */}
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="text-blue-300 font-semibold text-sm tracking-widest uppercase">Welcome to LuxeStay</span>
          </div>

          {/* Main Heading with Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Find Your
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Perfect Stay
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover extraordinary luxury hotels and premium accommodations handpicked for unforgettable experiences
          </p>

          {/* Advanced Search Bar */}
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-3 max-w-4xl mx-auto border border-white/20 hover:border-blue-300/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex-1 relative flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 px-4">
              <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full py-3 focus:outline-none bg-transparent text-foreground placeholder-gray-400 font-medium"
              />
            </div>
            <div className="flex-1 relative flex items-center px-4 pb-3 md:pb-0">
              <Search className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Hotel name or keyword" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 focus:outline-none bg-transparent text-foreground placeholder-gray-400 font-medium"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg md:rounded-full px-8 py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform w-full md:w-auto flex items-center justify-center gap-2 group"
            >
              <Search className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {hotels.length}+
              </div>
              <p className="text-gray-600 font-medium">Premium Hotels</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                195+
              </div>
              <p className="text-gray-600 font-medium">Destinations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                4.8★
              </div>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our handpicked collection of luxury hotels and premium accommodations for your next unforgettable getaway
            </p>
          </div>

          {/* Hotels Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading incredible stays...</p>
              </div>
            </div>
          ) : hotels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {hotels.slice(0, 6).map((hotel, index) => (
                  <div key={hotel.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </div>
              
              {hotels.length > 6 && (
                <div className="text-center mt-16">
                  <button 
                    onClick={() => navigate('/hotels')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    <span>View All {hotels.length} Hotels</span>
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600 py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium text-lg">No hotels available right now</p>
              <p className="text-gray-500 mt-2">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full filter blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to book your dream hotel?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of travelers who've discovered their perfect stay with LuxeStay
          </p>
          <button 
            onClick={() => navigate('/hotels')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Explore All Hotels
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
