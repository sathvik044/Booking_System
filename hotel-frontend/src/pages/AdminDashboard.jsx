import { useState, useEffect } from 'react';
import api from '../api';
import { Hotel, Key, Users, CreditCard, Plus, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [loading, setLoading] = useState(true);

  // Data states
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedHotelForRooms, setSelectedHotelForRooms] = useState('');
  const [hotelRooms, setHotelRooms] = useState([]);

  // Form states
  const [newHotel, setNewHotel] = useState({ name: '', location: '', description: '', basePrice: '' });
  const [newRoom, setNewRoom] = useState({ hotelId: '', roomType: 'SINGLE', pricePerNight: '', totalRooms: '' });

  const fetchHotels = async () => {
    try {
      const res = await api.get('/hotels');
      setHotels(res.data);
    } catch (error) {
      toast.error('Failed to fetch hotels');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await api.get('/admin/payments');
      setPayments(res.data);
    } catch (error) {
      toast.error('Failed to fetch payments');
    }
  };

  const fetchRoomsForHotel = async (hotelId) => {
    try {
      const res = await api.get(`/rooms/hotel/${hotelId}`);
      setHotelRooms(res.data);
    } catch (error) {
      toast.error('Failed to fetch rooms for hotel');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (activeTab === 'hotels') await fetchHotels();
      if (activeTab === 'users') await fetchUsers();
      if (activeTab === 'payments') await fetchPayments();
      if (activeTab === 'rooms') {
        await fetchHotels();
        if (selectedHotelForRooms) await fetchRoomsForHotel(selectedHotelForRooms);
      }
      setLoading(false);
    };
    loadData();
  }, [activeTab, selectedHotelForRooms]);

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/hotels', newHotel);
      toast.success('Hotel added successfully');
      setNewHotel({ name: '', location: '', description: '', basePrice: '' });
      fetchHotels();
    } catch (error) {
      toast.error('Failed to add hotel');
    }
  };

  const handleDeleteHotel = async (id) => {
    if(!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await api.delete(`/admin/hotels/${id}`);
      toast.success('Hotel deleted');
      fetchHotels();
    } catch (error) {
      toast.error('Failed to delete hotel');
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/rooms', newRoom);
      toast.success('Room added successfully');
      setNewRoom({ hotelId: newRoom.hotelId, roomType: 'SINGLE', pricePerNight: '', totalRooms: '' });
      if (selectedHotelForRooms === newRoom.hotelId) {
        fetchRoomsForHotel(newRoom.hotelId);
      }
    } catch (error) {
      toast.error('Failed to add room');
    }
  };

  const handleDeleteRoom = async (id) => {
    if(!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/admin/rooms/${id}`);
      toast.success('Room deleted');
      if (selectedHotelForRooms) fetchRoomsForHotel(selectedHotelForRooms);
    } catch (error) {
      toast.error('Failed to delete room');
    }
  };

  const handleUpdatePaymentStatus = async (id, status) => {
    try {
      await api.patch(`/admin/payments/${id}/status?status=${status}`);
      toast.success('Payment status updated');
      fetchPayments();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Admin Portal</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('hotels')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${activeTab === 'hotels' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Hotel className="h-5 w-5" /> Manage Hotels
          </button>
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${activeTab === 'rooms' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Key className="h-5 w-5" /> Manage Rooms
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <Users className="h-5 w-5" /> Manage Users
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <CreditCard className="h-5 w-5" /> All Payments
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-muted/30">
        
        {/* HOTELS TAB */}
        {activeTab === 'hotels' && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Manage Hotels</h1>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8">
              <h2 className="text-lg font-semibold mb-4">Add New Hotel</h2>
              <form onSubmit={handleAddHotel} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Hotel Name" required value={newHotel.name} onChange={e => setNewHotel({...newHotel, name: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <input type="text" placeholder="Location" required value={newHotel.location} onChange={e => setNewHotel({...newHotel, location: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <input type="number" placeholder="Base Price" required value={newHotel.basePrice} onChange={e => setNewHotel({...newHotel, basePrice: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <input type="text" placeholder="Description" value={newHotel.description} onChange={e => setNewHotel({...newHotel, description: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <button type="submit" className="md:col-span-2 bg-primary text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2"><Plus className="h-4 w-4" /> Add Hotel</button>
              </form>
            </div>
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm">Hotel Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Location</th>
                    <th className="px-6 py-4 font-semibold text-sm">Base Price</th>
                    <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></td></tr>
                  ) : hotels.map(hotel => (
                    <tr key={hotel.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{hotel.name}</td>
                      <td className="px-6 py-4">{hotel.location}</td>
                      <td className="px-6 py-4 font-medium text-primary">${hotel.basePrice}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteHotel(hotel.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ROOMS TAB */}
        {activeTab === 'rooms' && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Manage Rooms</h1>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8">
              <h2 className="text-lg font-semibold mb-4">Add New Room</h2>
              <form onSubmit={handleAddRoom} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select required value={newRoom.hotelId} onChange={e => {setNewRoom({...newRoom, hotelId: e.target.value}); setSelectedHotelForRooms(e.target.value);}} className="px-4 py-2 border rounded-md w-full">
                  <option value="">Select Hotel</option>
                  {hotels.map(h => <option key={h.id} value={h.id}>{h.name} - {h.location}</option>)}
                </select>
                <select required value={newRoom.roomType} onChange={e => setNewRoom({...newRoom, roomType: e.target.value})} className="px-4 py-2 border rounded-md w-full">
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="DELUXE">Deluxe</option>
                </select>
                <input type="number" placeholder="Price per Night" required value={newRoom.pricePerNight} onChange={e => setNewRoom({...newRoom, pricePerNight: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <input type="number" placeholder="Total Rooms" required value={newRoom.totalRooms} onChange={e => setNewRoom({...newRoom, totalRooms: e.target.value})} className="px-4 py-2 border rounded-md w-full"/>
                <button type="submit" className="md:col-span-2 bg-primary text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2"><Plus className="h-4 w-4" /> Add Room</button>
              </form>
            </div>
            
            {selectedHotelForRooms && (
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="px-6 py-4 font-semibold text-sm">Room Type</th>
                      <th className="px-6 py-4 font-semibold text-sm">Price/Night</th>
                      <th className="px-6 py-4 font-semibold text-sm">Total Count</th>
                      <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelRooms.length === 0 ? <tr><td colSpan="4" className="text-center py-4">No rooms found.</td></tr> : hotelRooms.map(room => (
                      <tr key={room.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{room.roomType}</td>
                        <td className="px-6 py-4 text-primary font-medium">${room.pricePerNight}</td>
                        <td className="px-6 py-4">{room.totalRooms}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteRoom(room.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Manage Users</h1>
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm">Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Email</th>
                    <th className="px-6 py-4 font-semibold text-sm">Role</th>
                    <th className="px-6 py-4 font-semibold text-sm">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <tr><td colSpan="4" className="text-center py-8"><Loader2 className="animate-spin mx-auto text-primary"/></td></tr> : users.map(u => (
                    <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-gray-100'}`}>{u.role}</span></td>
                      <td className="px-6 py-4">{u.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">All Payments</h1>
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm">Payment ID</th>
                    <th className="px-6 py-4 font-semibold text-sm">Booking ID</th>
                    <th className="px-6 py-4 font-semibold text-sm">Amount</th>
                    <th className="px-6 py-4 font-semibold text-sm">Method</th>
                    <th className="px-6 py-4 font-semibold text-sm">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <tr><td colSpan="6" className="text-center py-8"><Loader2 className="animate-spin mx-auto text-primary"/></td></tr> : payments.map(p => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">#{p.id}</td>
                      <td className="px-6 py-4">#{p.bookingId}</td>
                      <td className="px-6 py-4 font-bold text-primary">${p.amount}</td>
                      <td className="px-6 py-4">{p.paymentMethod}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.paymentStatus === 'SUCCESS' ? 'bg-green-100 text-green-700' : p.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.paymentStatus === 'PENDING' && (
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdatePaymentStatus(p.id, 'SUCCESS')} className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Approve</button>
                            <button onClick={() => handleUpdatePaymentStatus(p.id, 'FAILED')} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
