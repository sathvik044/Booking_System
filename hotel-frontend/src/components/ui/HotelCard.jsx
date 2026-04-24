import { MapPin, Star, Wifi, Coffee, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  // Use a placeholder image if not provided
  const imageUrl = hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{hotel.rating || '4.5'}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-foreground line-clamp-1">{hotel.name}</h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-6 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Wifi className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Coffee className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <div className="text-lg font-bold text-foreground">
              ${hotel.basePrice || '199'} <span className="text-sm font-normal text-muted-foreground">/night</span>
            </div>
          </div>
          <Link 
            to={`/hotels/${hotel.id}`}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
