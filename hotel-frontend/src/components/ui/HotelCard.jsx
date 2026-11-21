import { MapPin, Star, Wifi, Coffee, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HotelCard = ({ hotel }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Use a placeholder image if not provided
  const imageUrl = hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img 
          src={imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/20 hover:shadow-xl transition-all">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-gray-900">{hotel.rating || '4.5'}</span>
          </div>
        </div>

        {/* Luxury Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg">
          LUXURY
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-5 pb-4 border-b border-blue-100">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">{hotel.location}</span>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors" title="Free WiFi">
            <Wifi className="h-4 w-4" />
            <span className="text-xs">WiFi</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors" title="Café">
            <Coffee className="h-4 w-4" />
            <span className="text-xs">Café</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors" title="Parking">
            <Car className="h-4 w-4" />
            <span className="text-xs">Parking</span>
          </div>
        </div>

        <div className="pt-5 border-t border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium uppercase">Starting from</span>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ${hotel.basePrice || '199'}
            </div>
            <span className="text-xs text-gray-500">/night</span>
          </div>
          <Link 
            to={`/hotels/${hotel.id}`}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-300 transform group/btn ${
              isHovered 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl' 
                : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}
          >
            <span>Details</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
