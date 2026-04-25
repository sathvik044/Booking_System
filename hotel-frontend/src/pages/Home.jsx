import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2 } from 'lucide-react';
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_hotel_bg.png" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10">
            Discover luxury hotels and premium accommodations worldwide
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-xl md:rounded-full shadow-lg flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 relative flex items-center border-b md:border-b-0 md:border-r border-border pb-2 md:pb-0 px-4">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full py-3 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex-1 relative flex items-center px-4 pb-2 md:pb-0">
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Hotel name or keyword" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 focus:outline-none bg-transparent"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-600 text-white rounded-lg md:rounded-full px-8 py-3 font-medium transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of top-rated hotels for your next unforgettable getaway.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.slice(0, 6).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No hotels found. Check back later!
          </div>
        )}
        
        {hotels.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/hotels')}
              className="border border-border bg-white text-foreground hover:bg-muted px-8 py-3 rounded-md font-medium transition-colors"
            >
              View All Hotels
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
