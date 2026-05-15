import { MapPin, ShoppingCart, Menu, X, Search, ChevronDown, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../../context/CartContext';
import API from '../../api/axios';
import { selectAllActiveBookings } from '../../store/bookingSlice';
import logoImage from '../../assets/logo.png';

const logo = logoImage;

export default function Navbar({ location, onLocationClick }) {
  const routeLocation = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(routeLocation.search).get('q') || "");
  const [suggestions, setSuggestions] = useState([]);
  const [dbData, setDbData] = useState([]);
  const searchRef = useRef(null);

  // Sync with URL parameter
  useEffect(() => {
    const query = new URLSearchParams(routeLocation.search).get('q');
    if (query !== null) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [routeLocation.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/client/send-services-client");
        const result = response.data;
        if (result.success) {
          setDbData(result.data.filter(item => item.isActive));
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      // Only show bookable Services that have content (image/desc) AND booking info (price/options)
      const filtered = dbData
        .filter(item => 
          item.type === 'service' && 
          (item.images?.length > 0 || (item.description && item.description.trim() !== "")) &&
          (item.price !== null || (item.options && item.options.length > 0)) &&
          (item.name.toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q)))
        )
        .slice(0, 8);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, dbData]);
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
    // { label: 'Be a Partner', path: '/partner' },
    { label: 'Track Booking', path: '/check-status' }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-2 shadow-sm" 
          : "bg-white py-3"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="MK Home Service" 
                  className={cn(
                    "transition-all duration-300 object-contain",
                    isScrolled ? "w-10 h-10 md:w-14 md:h-14" : "w-12 h-12 md:w-20 md:h-20"
                  )} 
                />
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#041131] font-black text-lg md:text-xl leading-none tracking-tight uppercase">
                  MK Home
                </span>
                <span className="text-[#d8a011ff] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  Services
                </span>
              </div>
            </Link>
            
            {/* Location Selector */}
            {/* <button 
              onClick={onLocationClick}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col items-start leading-tight pr-2">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Your Location</span>
                <span className="text-xs text-white font-bold max-w-[120px] truncate">{location || 'Select Area'}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-white/30 group-hover:text-accent transition-colors" />
            </button> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "relative px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300",
                    routeLocation.pathname === link.path 
                      ? "text-[#dfa719ff]" 
                      : "text-[#041131] hover:text-[#dfa81eff]"
                  )}
                >
                  {link.label}
                  {routeLocation.pathname === link.path && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#daa217ff] rounded-full" />
                  )}
                </Link>
              ))}
            </div>
            
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <div 
                ref={searchRef}
                className={cn(
                  "flex items-center bg-white/5 border border-white/10 rounded-xl transition-all duration-300 relative",
                  isSearchOpen ? "w-64 px-3" : "w-11 px-0 border-transparent bg-transparent"
                )}
              >
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-[#041131] hover:text-[#fbbf24] transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <div className="relative flex-1">
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Search services..." 
                      className="bg-transparent border-none outline-none text-[#051849ff] text-xs w-full font-bold uppercase tracking-tight placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }
                      }}
                    />
                    
                    {/* Suggestions Dropdown */}
                    {/* {suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-primary/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60]">
                        <div className="p-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-400 px-3">Top Matches</span>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                          {suggestions.map((item) => (
                            <button
                              key={item._id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                navigate(`/service/${item._id}`);
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full flex items-center gap-4 p-3 hover:bg-orange-200 group transition-all text-left"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center">
                                {item.images?.[0] ? (
                                  <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                ) : (
                                  <Layers className="w-5 h-5 text-accent group-hover:text-primary" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-white group-hover:text-primary leading-tight uppercase truncate max-w-[150px]">
                                  {item.name}
                                </span>
                                <span className="text-[9px] text-accent group-hover:text-primary/70 font-black uppercase tracking-wider">
                                  Service
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full p-3 bg-white/5 hover:bg-white/10 transition-colors text-center border-t border-white/10"
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">See all results</span>
                        </button>
                      </div>
                    )} */}
                    {suggestions.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[120%] md:w-[140%] lg:w-[160%] max-w-[900px] bg-primary/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60]">
                                            <div className="p-2 border-b border-white/5 bg-white/5">
                                              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400 px-3">
                                                Top Matches
                                              </span>
                                            </div>

                                            <div className="w-full max-h-[60vh] overflow-y-auto overflow-x-hidden no-scrollbar">
                                              {suggestions.map((item) => (
                                                <button
                                                  key={item._id}
                                                  onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    navigate(`/service/${item._id}`);
                                                    setIsSearchOpen(false);
                                                    setSearchQuery("");
                                                  }}
                                                  className="w-full flex items-center gap-4 p-3 hover:bg-precision group transition-all text-left overflow-hidden"
                                                >

                                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center">
                                                    {item.images?.[0] ? (
                                                      <img
                                                        src={item.images[0]}
                                                        alt=""
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                      />
                                                    ) : (
                                                      <Layers className="w-5 h-5 text-accent group-hover:text-primary" />
                                                    )}
                                                  </div>

                                                  <div className="basis-0 flex-1 min-w-0 flex flex-col">
                                                    <span className="block w-full truncate text-xs font-bold text-white group-hover:text-primary leading-tight uppercase">
                                                      {item.name}
                                                    </span>

                                                    <span className="block w-full text-[9px] text-accent group-hover:text-primary/70 font-black uppercase tracking-wider">
                                                      Service
                                                    </span>
                                                  </div>

                                                </button>
                                              ))}
                                            </div>

                                            <button
                                              onMouseDown={(e) => {
                                                e.preventDefault();
                                                navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery("");
                                              }}
                                              className="w-full p-3 bg-white/5 hover:bg-white/10 transition-colors text-center border-t border-white/10"
                                            >
                                              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                                See all results
                                              </span>
                                            </button>

                    </div>
                    )}
                  </div>
                )}
              </div>

              {/* {isAuthenticated ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Login</span>
                </Link>
              )} */}
              
              <Link to={cartLink} className="relative group">
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
                  <ShoppingCart className="w-5 h-5 text-[#041131]" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#fbbf24] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link 
                to="/services" 
                className="hidden xl:flex bg-[#d5a21fff] hover:bg-[#0a1d4eff] text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-[#fbbf24]/20 active:scale-95"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to={cartLink} className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-[#041131]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#fbbf24] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                isMenuOpen ? "bg-[#fbbf24] text-white" : "bg-gray-100 text-[#041131]"
              )}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <div className="flex flex-col h-full pt-32 px-8 pb-12">
          {/* Mobile Search */}
          <div className="relative mb-10 group" ref={searchRef}>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#fbbf24] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
                  setIsMenuOpen(false);
                  setSearchQuery('');
                }
              }}
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-gray-50 border border-gray-100 text-[#041131] font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#fbbf24]/50 focus:bg-white transition-all"
            />
            
            {/* Mobile Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden z-[60] max-h-[50vh] overflow-y-auto no-scrollbar">
                {suggestions.map((item) => (
                  <button
                    key={item._id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      navigate(`/service/${item._id}`);
                      setIsMenuOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                      {item.images?.[0] ? (
                        <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Layers className="w-5 h-5 text-[#fbbf24]" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#041131] uppercase truncate max-w-[200px] leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#fbbf24] font-black uppercase tracking-widest mt-0.5">
                        Service
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center justify-between"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl font-bold tracking-tighter text-[#041131] group-hover:text-[#fbbf24] transition-colors uppercase">
                  {link.label}
                </span>
                <ChevronDown className="w-8 h-8 text-gray-200 -rotate-90 group-hover:text-[#fbbf24] transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <Link 
              to="/services" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#fbbf24] text-white py-5 rounded-3xl font-black text-center text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#fbbf24]/20"
            >
              Book A Service
            </Link>
            <div className="flex items-center justify-center gap-8 py-6">
               <span className="text-gray-300 text-[10px] uppercase tracking-[0.3em] font-bold">MK Home Services © 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

