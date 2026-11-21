import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext.jsx';
import { MapPin, Star, Wifi, Coffee, Car, Check, CalendarDays, Users, Loader2, ArrowRight, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null);
  const { user, logout } = useContext(AuthContext);
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
        logout();
        navigate('/login');
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
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="p-12 text-center bg-gradient-to-br from-white to-blue-50 min-h-screen flex items-center justify-center">
        <div>
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">Hotel not found</p>
        </div>
      </div>
    );
  }

  const imageUrl = hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  return (
    <div className="pb-20 bg-gradient-to-b from-white to-blue-50">
      {/* Hotel Header Image */}
      <div className="relative h-[450px] md:h-[550px] overflow-hidden group">
        <img src={imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white font-bold ml-2 bg-black/40 px-3 py-1 rounded-full text-sm">5.0 Luxury</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{hotel.name}</h1>
          <div className="flex items-center gap-2 text-white text-lg drop-shadow-lg">
            <MapPin className="h-6 w-6" />
            <span className="font-medium">{hotel.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <section className="mb-16 bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Hotel</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {hotel.description || "Experience unparalleled luxury and comfort at our exquisite hotel. Nestled in a prime location, we offer top-notch amenities, exceptional service, and breathtaking views to make your stay truly memorable."}
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group flex flex-col items-center gap-4 p-6 bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Wifi className="text-white h-6 w-6" />
                </div>
                <span className="font-semibold text-center text-gray-900">Free WiFi</span>
              </div>
              <div className="group flex flex-col items-center gap-4 p-6 bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="text-white h-6 w-6" />
                </div>
                <span className="font-semibold text-center text-gray-900">Breakfast</span>
              </div>
              <div className="group flex flex-col items-center gap-4 p-6 bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Car className="text-white h-6 w-6" />
                </div>
                <span className="font-semibold text-center text-gray-900">Parking</span>
              </div>
              <div className="group flex flex-col items-center gap-4 p-6 bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Check className="text-white h-6 w-6" />
                </div>
                <span className="font-semibold text-center text-gray-900">Pool</span>
              </div>
            </div>
          </section>

          {/* Rooms Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Rooms</h2>
            {rooms.length === 0 ? (
              <div className="bg-white p-12 border border-blue-100 rounded-2xl text-center shadow-lg">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium text-lg">No rooms available at the moment</p>
              </div>
            ) : (
              <div className="space-y-8">
                {rooms.map((room) => {
                  let roomImg = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'SINGLE') roomImg = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'DOUBLE') roomImg = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  if(room.roomType === 'DELUXE') roomImg = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

                  return (
                  <div key={room.id} className="bg-white border border-blue-100 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 group">
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={roomImg} 
                        alt={room.roomType} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="text-blue-600 font-bold text-sm mb-2">ROOM TYPE</div>
                          <h3 className="text-2xl font-bold text-gray-900">{room.roomType}</h3>
                        </div>
                        <div className="text-right bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl">
                          <span className="text-3xl font-bold block">${room.pricePerNight}</span>
                          <span className="text-sm font-medium block">/ night</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm mb-6 pb-6 border-b border-blue-100">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span>{room.roomType === 'SINGLE' ? '1 Guest' : room.roomType === 'DOUBLE' ? '2 Guests' : 'Up to 4 Guests'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          <Check className="h-5 w-5" />
                          <span>Available</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
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
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-8 rounded-2xl shadow-lg sticky top-24">
            <h3 className="font-bold text-xl text-gray-900 mb-6">Important Info</h3>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg h-fit">
                  <CalendarDays className="h-5 w-5 text-blue-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Check-in / Check-out</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">Check-in: 3:00 PM</p>
                  <p className="text-xs text-gray-600 font-medium">Check-out: 11:00 AM</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg h-fit">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Location</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">{hotel.location}</p>
                  <a href="#" className="text-xs text-blue-600 hover:underline font-bold mt-1 block">View on map →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && createdBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-blue-100 transform transition-all duration-300">
            <div className="p-8 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h3 className="text-2xl font-bold">Complete Payment</h3>
              <p className="text-blue-100 mt-2 font-medium">Almost there! Choose a payment method.</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700 font-medium">Booking ID:</span>
                  <span className="font-bold text-blue-600 bg-white px-3 py-1 rounded-lg">#{createdBooking.bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">${createdBooking.totalPrice}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium bg-white"
                >
                  <option value="CREDIT_CARD">💳 Credit Card</option>
                  <option value="PAYPAL">🅿️ PayPal</option>
                  <option value="BANK_TRANSFER">🏦 Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-blue-100 flex gap-3 justify-end">
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  navigate('/bookings');
                }}
                className="px-6 py-3 text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all border border-gray-200"
              >
                Pay Later
              </button>
              <button 
                onClick={handlePayment}
                disabled={bookingLoading === 'payment'}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {bookingLoading === 'payment' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
