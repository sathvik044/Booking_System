import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import HotelCard from '../components/ui/HotelCard';
import { Search, MapPin, Loader2, Filter } from 'lucide-react';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const locationQuery = searchParams.get('location') || '';
  const keywordQuery = searchParams.get('search') || '';
  
  const [localLocation, setLocalLocation] = useState(locationQuery);
  const [localKeyword, setLocalKeyword] = useState(keywordQuery);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let url = '/hotels';
      if (locationQuery) {
        url = `/hotels/location/${encodeURIComponent(locationQuery)}`;
      } else if (keywordQuery) {
        url = `/hotels/search?keyword=${encodeURIComponent(keywordQuery)}`;
      }
      
      const response = await api.get(url);
      setHotels(response.data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    setLocalLocation(locationQuery);
    setLocalKeyword(keywordQuery);
  }, [locationQuery, keywordQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localLocation) {
      setSearchParams({ location: localLocation });
    } else if (localKeyword) {
      setSearchParams({ search: localKeyword });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {locationQuery ? `Hotels in ${locationQuery}` : keywordQuery ? `Search results for "${keywordQuery}"` : 'All Hotels'}
        </h1>
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={localLocation}
                onChange={(e) => {
                  setLocalLocation(e.target.value);
                  setLocalKeyword(''); // Clear keyword if searching by location
                }}
                className="pl-10 w-full py-2.5 bg-muted border-transparent rounded-lg focus:border-primary focus:bg-white focus:ring-0 transition-colors"
                placeholder="Search by location (e.g. New York)"
              />
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={localKeyword}
                onChange={(e) => {
                  setLocalKeyword(e.target.value);
                  setLocalLocation(''); // Clear location if searching by keyword
                }}
                className="pl-10 w-full py-2.5 bg-muted border-transparent rounded-lg focus:border-primary focus:bg-white focus:ring-0 transition-colors"
                placeholder="Search by hotel name"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Static for now) */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border sticky top-24">
            <div className="flex items-center gap-2 mb-4 font-semibold text-foreground">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                    <span className="ml-2 text-sm text-muted-foreground">Under $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                    <span className="ml-2 text-sm text-muted-foreground">$100 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                    <span className="ml-2 text-sm text-muted-foreground">Over $200</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Star Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((stars) => (
                    <label key={stars} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                      <span className="ml-2 text-sm text-muted-foreground">{stars} Stars & Up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-border">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No hotels found</h3>
              <p className="text-muted-foreground">
                We couldn't find any hotels matching your criteria. Try adjusting your search.
              </p>
              <button 
                onClick={() => setSearchParams({})}
                className="mt-6 text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
