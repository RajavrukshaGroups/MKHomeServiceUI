import { MapPin, User, ShoppingCart, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import  logoImage from '../../assets/logo.png';

// Using a placeholder since local asset is missing
const logo = logoImage;

export default function Navbar({ location, onLocationClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('is_authenticated') === 'true');
    };
    checkAuth();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-12 py-4",
      isScrolled ? "bg-primary/95 backdrop-blur-xl shadow-2xl py-3 border-b border-primary-dark" : "bg-gradient-to-b from-primary/50 to-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* <div className="flex items-center gap-10">
         <Link to="/" className="flex flex-col items-start leading-tight group">
            <div className="flex items-center gap-1">
              <img src={logo} alt="Logo" className="w-30 h-10 object-contain"  />
              <span className={cn(
                "text-2xl font-bold tracking-tight transition-colors text-white",
              )}>All In One Home Service</span>
              <span className="text-[#D3AF37]">.</span>
            </div>
          </Link>
          
          
          <button 
            onClick={onLocationClick}
            className={cn(
              "hidden md:flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 group bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white",
            )}
          >
            <MapPin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest truncate max-w-[200px]">{location || 'Select Location'}</span>
          </button>
        </div> */}
        <div className="flex items-center gap-5">
          <Link to="/" className="flex flex-col items-start leading-tight group">
            <div className="flex items-center gap-1">
              <img src={logo} alt="Logo" className="w-30 h-10 object-contain"  />
              <span className={cn(
                "text-2xl font-bold tracking-tight transition-colors text-white",
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
          {[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Be a Partner', path: '/partner' }
          ].map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-white/20" />
          
          {isAuthenticated ? (
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
          )}

          <Link to="/cart" className="relative group">
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

        <button className={cn(
          "md:hidden p-2 transition-colors",
          "text-white"
        )}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
