import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Menu, X, Hotel, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-white via-white to-blue-50/30 backdrop-blur-sm shadow-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                <Hotel className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                LuxeStay
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">Home</Link>
            <Link to="/hotels" className="text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">Hotels</Link>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 border-l border-blue-200 pl-4">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-primary hover:text-primary-700 transition-colors font-medium px-3 py-2 rounded-md bg-blue-50">
                    Dashboard
                  </Link>
                )}
                <Link to="/bookings" className="text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                  My Bookings
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-2 rounded-full border border-blue-200 hover:border-blue-300 transition-all group"
                  >
                    <div className="h-6 w-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{user.name}</span>
                    <span className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">{user.role}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-blue-100">
                        <p className="text-xs text-muted-foreground">Logged in as</p>
                        <p className="font-semibold text-foreground">{user.name}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 border-l border-blue-200 pl-4">
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-50">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform"
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
              className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-blue-50 transition-colors"
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
