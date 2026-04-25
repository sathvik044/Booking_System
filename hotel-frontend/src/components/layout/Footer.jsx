import { Hotel, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">LuxeStay</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Experience the world's most luxurious destinations with unparalleled comfort and service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/hotels" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find a Hotel</Link></li>
              <li><Link to="/destinations" className="text-sm text-muted-foreground hover:text-primary transition-colors">Top Destinations</Link></li>
              <li><Link to="/offers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Special Offers</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 tracking-tight">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 tracking-tight">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers and updates.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-muted px-4 py-2 w-full text-sm rounded-l-md border border-r-0 border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors flex items-center justify-center"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LuxeStay. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">USD ($)</span>
            <span className="text-sm text-muted-foreground">English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
