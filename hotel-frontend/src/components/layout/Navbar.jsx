import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Menu, X, Hotel, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                LuxeStay
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/hotels" className="text-muted-foreground hover:text-primary transition-colors font-medium">Hotels</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-primary hover:text-primary-700 transition-colors font-medium">
                    Dashboard
                  </Link>
                )}
                <Link to="/bookings" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  My Bookings
                </Link>
                <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full border border-border">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {user.name} 
                    <span className="text-xs ml-2 bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">{user.role}</span>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md">Home</Link>
            <Link to="/hotels" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md">Hotels</Link>
            
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="block px-3 py-2 text-base font-medium text-primary hover:bg-muted rounded-md">Dashboard</Link>
                )}
                <Link to="/bookings" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md">My Bookings</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-primary hover:bg-primary/10 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
