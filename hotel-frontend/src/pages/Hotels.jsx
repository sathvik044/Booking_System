import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import HotelCard from '../components/ui/HotelCard';
import { Search, MapPin, Loader2, Filter, X, ChevronDown } from 'lucide-react';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  
  const locationQuery = searchParams.get('location') || '';
  const keywordQuery = searchParams.get('search') || '';
  
  const [localLocation, setLocalLocation] = useState(locationQuery);
  const [localKeyword, setLocalKeyword] = useState(keywordQuery);

  // Sync local state with URL params
  const [prevLocationQuery, setPrevLocationQuery] = useState(locationQuery);
  const [prevKeywordQuery, setPrevKeywordQuery] = useState(keywordQuery);

  if (locationQuery !== prevLocationQuery) {
    setPrevLocationQuery(locationQuery);
    setLocalLocation(locationQuery);
  }
  if (keywordQuery !== prevKeywordQuery) {
    setPrevKeywordQuery(keywordQuery);
    setLocalKeyword(keywordQuery);
  }

  const fetchHotels = useCallback(async () => {
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
  }, [locationQuery, keywordQuery]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) {
        await fetchHotels();
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [fetchHotels]);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {locationQuery ? `Luxury Hotels in ${locationQuery}` : keywordQuery ? `Search: ${keywordQuery}` : 'Explore All Hotels'}
          </h1>
          <p className="text-blue-100 text-lg">
            {hotels.length} premium properties available for your stay
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-blue-100 mb-8 hover:shadow-xl transition-all duration-300">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <input
                type="text"
                value={localLocation}
                onChange={(e) => {
                  setLocalLocation(e.target.value);
                  setLocalKeyword('');
                }}
                className="pl-12 w-full py-3 bg-blue-50 border border-blue-100 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder-gray-500"
                placeholder="Search by location (e.g. New York)"
              />
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <input
                type="text"
                value={localKeyword}
                onChange={(e) => {
                  setLocalKeyword(e.target.value);
                  setLocalLocation('');
                }}
                className="pl-12 w-full py-3 bg-blue-50 border border-blue-100 rounded-lg focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder-gray-500"
                placeholder="Search by hotel name"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2 group"
            >
              <Search className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`${filterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 font-bold text-foreground text-lg">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <span>Refine Search</span>
                </div>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Price Range</h3>
                  </div>
                  <div className="space-y-3">
                    {['Under $100', '$100 - $200', '$200 - $300', 'Over $300'].map((range) => (
                      <label key={range} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5 accent-blue-600" 
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-blue-100 pt-8" />

                {/* Star Rating */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Star Rating</h3>
                  </div>
                  <div className="space-y-3">
                    {[5, 4, 3, 2].map((stars) => (
                      <label key={stars} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5 accent-blue-600" 
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                          {Array(stars).fill('★').join('')} {stars} Stars & Up
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-blue-100 pt-8" />

                {/* Amenities */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Amenities</h3>
                  </div>
                  <div className="space-y-3">
                    {['WiFi', 'Swimming Pool', 'Gym', 'Restaurant', 'Spa'].map((amenity) => (
                      <label key={amenity} className="flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5 accent-blue-600" 
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 rounded-lg transition-all duration-300 mt-8">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Hotel Grid */}
          <div className="flex-1">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden w-full mb-6 bg-white border border-blue-100 text-blue-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Show Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>

            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Finding perfect stays...</p>
                </div>
              </div>
            ) : hotels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                  {hotels.map((hotel, index) => (
                    <div key={hotel.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <HotelCard hotel={hotel} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-blue-100 shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">No hotels found</h3>
                <p className="text-gray-600 mb-8 font-medium">
                  We couldn't find any hotels matching your criteria. Try adjusting your search.
                </p>
                <button 
                  onClick={() => setSearchParams({})}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
                >
                  <X className="h-5 w-5" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
