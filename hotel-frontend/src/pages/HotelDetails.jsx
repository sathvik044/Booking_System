import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Star, Wifi, Coffee, Car, Check, CalendarDays, Users, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Booking form state for a selected room
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const hotelRes = await api.get(`/hotels/${id}`);
        setHotel(hotelRes.data);
        // Note: rooms might be included in hotel details or need a separate fetch based on API design.
        // Assuming there's a /api/rooms/hotel/{id} endpoint
        const roomRes = await api.get(`/rooms/hotel/${id}`);
        setRooms(roomRes.data);
      } catch (error) {
        console.error("Failed to fetch details", error);
        toast.error("Failed to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');

  const handleBookRoom = async (roomId, pricePerNight) => {
    if (!user || !user.id) {
      toast.error('Session expired or invalid. Please login again to book a room.');
      navigate('/login', { state: { from: { pathname: `/hotels/${id}` } } });
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * pricePerNight;

    setBookingLoading(roomId);
    try {
      const payload = {
        userId: user.id,
        roomId: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        totalPrice: totalPrice,
        status: "PENDING"
      };

      const res = await api.post('/bookings', payload);
      setCreatedBooking(res.data);
      setShowPaymentModal(true);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Booking failed';
      if (errorMsg === 'User not found') {
        toast.error('Your account was reset during the database update. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setBookingLoading(null);
    }
  };

  const handlePayment = async () => {
    if (!createdBooking) return;
    setBookingLoading('payment');
    try {
      await api.post('/payments/process', {
        bookingId: createdBooking.bookingId,
        amount: createdBooking.totalPrice,
        paymentMethod: paymentMethod
      });
      toast.success('Payment successful! Room booked.');
      navigate('/bookings');
    } catch (error) {
      console.error(error);
      toast.error('Payment failed. Please check your bookings page to retry.');
      navigate('/bookings');
    } finally {
      setBookingLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!hotel) {
    return <div className="p-12 text-center text-xl font-medium">Hotel not found.</div>;
  }

  const imageUrl = hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  return (
    <div className="pb-20">
      {/* Hotel Header Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <img src={imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hotel.name}</h1>
          <div className="flex items-center gap-2 text-white/90 text-lg">
            <MapPin className="h-5 w-5" />
            <span>{hotel.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">About the Hotel</h2>
            <p className="text-muted-foreground leading-relaxed">
              {hotel.description || "Experience unparalleled luxury and comfort at our exquisite hotel. Nestled in a prime location, we offer top-notch amenities, exceptional service, and breathtaking views to make your stay truly memorable."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Popular Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm">
                <Wifi className="text-primary h-6 w-6" />
                <span className="font-medium text-sm">Free WiFi</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm">
                <Coffee className="text-primary h-6 w-6" />
                <span className="font-medium text-sm">Breakfast</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm">
                <Car className="text-primary h-6 w-6" />
                <span className="font-medium text-sm">Parking</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm">
                <Check className="text-primary h-6 w-6" />
                <span className="font-medium text-sm">Pool</span>
              </div>
            </div>
          </section>

          {/* Rooms Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Rooms</h2>
            {rooms.length === 0 ? (
              <div className="bg-white p-8 border border-border rounded-xl text-center text-muted-foreground">
                No rooms available at the moment.
              </div>
            ) : (
              <div className="space-y-6">
                {rooms.map((room) => {
                  let roomImg = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'SINGLE') roomImg = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'DOUBLE') roomImg = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'DELUXE') roomImg = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

                  return (
                  <div key={room.id} className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                      <img 
                        src={roomImg} 
                        alt={room.roomType} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-foreground">{room.roomType}</h3>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">${room.pricePerNight}</span>
                          <span className="text-sm text-muted-foreground block">/ night</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{room.roomType === 'SINGLE' ? '1 Guest' : room.roomType === 'DOUBLE' ? '2 Guests' : 'Up to 4 Guests'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 font-medium">
                          <Check className="h-4 w-4" />
                          <span>Available to Book</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                        {selectedRoom === room.id ? (
                          <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <input 
                              type="date" 
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              min={new Date().toISOString().split('T')[0]}
                            />
                            <input 
                              type="date"
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              min={checkInDate || new Date().toISOString().split('T')[0]}
                            />
                            <button 
                              onClick={() => handleBookRoom(room.id, room.pricePerNight)}
                              disabled={bookingLoading === room.id}
                              className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center min-w-[100px] transition-colors"
                            >
                              {bookingLoading === room.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm Booking'}
                            </button>
                            <button 
                              onClick={() => setSelectedRoom(null)}
                              className="text-muted-foreground hover:text-foreground text-sm font-medium px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setSelectedRoom(room.id)}
                            className="w-full md:w-auto bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
                          >
                            Select Dates & Book
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white border border-border p-6 rounded-xl shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">Need to know</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Check-in / Check-out</p>
                  <p className="text-sm text-muted-foreground">Check-in: 3:00 PM</p>
                  <p className="text-sm text-muted-foreground">Check-out: 11:00 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Location</p>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <a href="#" className="text-sm text-primary hover:underline font-medium">View on map</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && createdBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Complete Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">Almost there! Choose a payment method.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-semibold">#{createdBooking.bookingId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-primary text-lg">${createdBooking.totalPrice}</span>
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="PAYPAL">PayPal</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-muted/30 border-t border-border flex gap-3 justify-end">
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  navigate('/bookings');
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Pay Later
              </button>
              <button 
                onClick={handlePayment}
                disabled={bookingLoading === 'payment'}
                className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
              >
                {bookingLoading === 'payment' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
