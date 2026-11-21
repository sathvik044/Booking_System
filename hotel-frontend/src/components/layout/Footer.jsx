import { Hotel, Globe, MessageCircle, Mail, MapPin, Phone, ArrowRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg group-hover:shadow-lg transition-all duration-300">
                <Hotel className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LuxeStay
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium">
              Your gateway to extraordinary luxury hotels and unforgettable travel experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-110 transform">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-110 transform">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-110 transform">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-6 tracking-tight text-lg">Explore</h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/hotels" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Find a Hotel</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Top Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Special Offers</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>About LuxeStay</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-foreground mb-6 tracking-tight text-lg">Support</h3>
            <ul className="space-y-3.5">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground mb-6 tracking-tight text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">123 Luxury Lane, Travel City, TC 12345</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">+1 (234) 567-890</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:hello@luxestay.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">hello@luxestay.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-foreground mb-6 tracking-tight text-lg">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Get exclusive deals and travel tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-bold flex items-center justify-center gap-2 group"
              >
                <span>Subscribe</span>
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
              {subscribed && (
                <p className="text-xs text-green-600 font-semibold">Thanks for subscribing! 🎉</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-600 font-medium">
              &copy; {new Date().getFullYear()} LuxeStay. All rights reserved. Crafted with ❤️
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">USD ($)</button>
              <div className="w-px h-5 bg-blue-200" />
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">English (US)</button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl -z-10 pointer-events-none" />
    </footer>
  );
};

export default Footer;
