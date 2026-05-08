import { MapPin, User, ShoppingCart, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../../context/CartContext';
import { selectAllActiveBookings } from '../../store/bookingSlice';
import logoImage from '../../assets/logo.png';

// Using a placeholder since local asset is missing
const logo = logoImage;

export default function Navbar({ location, onLocationClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount: oldCartCount } = useCart();
  const allActiveBookings = useSelector(selectAllActiveBookings);
  const cartCount = allActiveBookings.length;

  const firstServiceId = allActiveBookings.length > 0 ? allActiveBookings[0].serviceId : null;
  const cartLink = firstServiceId ? `/booking/${firstServiceId}` : "/services";

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('is_authenticated') === 'true');
    };
    checkAuth();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    window.location.reload();
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Be a Partner', path: '/partner' },
    { label: 'Check Status', path: '/check-status' }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-12 py-4",
        isScrolled || isMenuOpen ? "bg-primary/95 backdrop-blur-xl shadow-2xl py-3 border-b border-primary-dark" : "bg-gradient-to-b from-primary/50 to-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-start leading-tight group">
              <div className="flex items-center gap-5">
                <img src={logo} alt="Logo" className="w-12 h-12 md:w-20 md:h-20 object-contain transition-all"  />
                <span className={cn(
                  "text-lg md:text-2xl font-bold tracking-tight transition-colors text-white",
                )}>All In One Home Service</span>
              </div>
            </Link>
            
            <button 
              onClick={onLocationClick}
              className={cn(
                "hidden md:flex items-center gap-2 px-4 py-2 rounded-full border transition-all group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white",
              )}
            >
              <MapPin className={cn("w-4 h-4 group-hover:animate-bounce text-[#D3AF37]")} />
              <span className="text-sm font-bold truncate max-w-[150px]">{location || 'Select Location'}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-white/20" />
            
            {/* {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest text-accent">Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors">
                <User className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest text-accent">Login</span>
              </Link>
            )} */}

            <Link to={cartLink} className="relative group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-primary transition-all">
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-primary" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg border-2 border-primary">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link to={cartLink} className="relative group p-2">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2 transition-all rounded-lg",
                isMenuOpen ? "bg-accent text-primary" : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-primary transition-all duration-500 md:hidden pt-24 px-6",
        isMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
      )}>
        <div className="flex flex-col gap-8">
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onLocationClick();
            }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-white"
          >
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">{location || 'Select Location'}</span>
          </button>

          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-black uppercase tracking-widest text-white/90 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-white/10 w-full" />

          {/* <div className="space-y-6">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 text-white hover:text-accent transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xl font-black uppercase tracking-widest text-accent">Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 text-white hover:text-accent transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xl font-black uppercase tracking-widest text-accent">Login</span>
              </Link>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
