import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { CalendarDays, MapPin, CreditCard, Loader2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/bookings/user/${user.id}`);
      const fetchedBookings = res.data;
      
      // Fetch payment details for each booking
      const bookingsWithPayments = await Promise.all(
        fetchedBookings.map(async (booking) => {
          try {
            const payRes = await api.get(`/payments/booking/${booking.bookingId}`);
            return { ...booking, paymentInfo: payRes.data };
          } catch (e) {
            // No payment found or error
            return { ...booking, paymentInfo: null };
          }
        })
      );
      
      setBookings(bookingsWithPayments);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch your bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await api.delete(`/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-border shadow-sm">
          <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
          <p className="text-muted-foreground">
            You haven't made any bookings yet. Start exploring our amazing hotels!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Booking #{booking.bookingId}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">${booking.totalPrice}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Stay Dates
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Check-in: <span className="font-medium text-foreground">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check-out: <span className="font-medium text-foreground">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Payment Details
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Total: <span className="font-medium text-foreground">${booking.totalPrice}</span>
                    </p>
                    {booking.paymentInfo ? (
                      <div className="mt-1">
                        <p className="text-sm text-muted-foreground">
                          Status: <span className={`font-medium ${booking.paymentInfo.paymentStatus === 'SUCCESS' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {booking.paymentInfo.paymentStatus}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Method: <span className="font-medium text-foreground">{booking.paymentInfo.paymentMethod}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-yellow-600 font-medium mt-1">Payment Pending</p>
                    )}
                  </div>
                </div>

                {booking.status !== 'CANCELLED' && (
                  <div className="mt-6 pt-6 border-t border-border flex justify-end">
                    <button 
                      onClick={() => handleCancel(booking.bookingId)}
                      className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
