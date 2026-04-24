import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  X, 
  ChevronDown,
  Building2,
  Building,
  Monitor,
  Flame,
  Globe,
  Waves,
  History,
  Target,
  Mountain
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const POPULAR_CITIES = [
  { id: 'bengaluru', name: 'BENGALURU', icon: Monitor },
  { id: 'mysuru', name: 'MYSURU', icon: Building },
  { id: 'hubballi', name: 'HUBBALLI', icon: Building2 },
  { id: 'mangaluru', name: 'MANGALURU', icon: Waves },
  { id: 'belagavi', name: 'BELAGAVI', icon: Mountain },
  { id: 'kalaburagi', name: 'KALABURAGI', icon: History },
  { id: 'davanagere', name: 'DAVANAGERE', icon: Building },
  { id: 'shivamogga', name: 'SHIVAMOGGA', icon: Globe },
  { id: 'ballari', name: 'BALLARI', icon: Flame },
  { id: 'vijayapura', name: 'VIJAYAPURA', icon: History },
  { id: 'tumakuru', name: 'TUMAKURU', icon: Target },
  { id: 'bidar', name: 'BIDAR', icon: Building2 },
];

const OTHER_CITIES = [
  { id: 'hassan', name: 'HASSAN' },
  { id: 'udupi', name: 'UDUPI' },
  { id: 'gadag', name: 'GADAG' },
  { id: 'chitradurga', name: 'CHITRADURGA' },
  { id: 'bagalkot', name: 'BAGALKOT' },
  { id: 'raichur', name: 'RAICHUR' },
  { id: 'chikkamagaluru', name: 'CHIKKAMAGALURU' },
  { id: 'mandya', name: 'MANDYA' },
  { id: 'karwar', name: 'KARWAR' },
  { id: 'haveri', name: 'HAVERI' },
  { id: 'koppal', name: 'KOPPAL' },
  { id: 'yadgir', name: 'YADGIR' },
  { id: 'chamarajanagar', name: 'CHAMARAJANAGAR' },
  { id: 'chikkaballapura', name: 'CHIKKABALLAPURA' },
  { id: 'ramanagara', name: 'RAMANAGARA' },
];

function ChangeView({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const reinit = () => {
      map.invalidateSize();
      map.setView(center, 15, { animate: true });
    };

    reinit();
    const t1 = setTimeout(reinit, 100);
    const t2 = setTimeout(reinit, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map, center]);
  
  return null;
}

export default function LocationModal({ isOpen, onSelect }) {
  const [view, setView] = useState('selection');
  const [mapType, setMapType] = useState('roadmap');
  const [coords, setCoords] = useState([12.9716, 77.5946]); // Default to Bengaluru
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search Your location');
  const [isTyping, setIsTyping] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 3 || isDetecting) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=10&countrycodes=in&state=Karnataka`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        
        // Stricter filter to ensure location is in Karnataka
        const filtered = data.filter(item => {
          const displayName = item.display_name.toLowerCase();
          const state = item.address?.state?.toLowerCase() || '';
          return displayName.includes('karnataka') || state.includes('karnataka');
        }).slice(0, 5);
        
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } catch (error) {
        console.error("Suggestion fetch error:", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, isDetecting]);

  const handleSuggestionSelect = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setCoords([lat, lon]);
    setSearchQuery(item.display_name);
    setShowSuggestions(false);
    setView('map');
    setIsTyping(true);
  };

  useEffect(() => {
    if (isTyping) return;
    
    const originalText = 'Search Your location';
    let currentIndex = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        setPlaceholder(originalText.substring(0, currentIndex + 1) + '|');
        currentIndex++;
        if (currentIndex === originalText.length) {
          isDeleting = true;
        }
      } else {
        setPlaceholder(originalText.substring(0, currentIndex - 1) + '|');
        currentIndex--;
        if (currentIndex === 0) {
          isDeleting = false;
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isTyping]);

  const detectLocation = async () => {
    setIsDetecting(true);
    setSuggestions([]);
    setShowSuggestions(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords([lat, lon]);
        
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          if (!response.ok) throw new Error("Fetch failed");
          const data = await response.json();
          setSearchQuery(data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          setIsTyping(true);
        } catch (error) {
          console.warn("Reverse geocoding failed, using coordinates only:", error);
          setSearchQuery(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          setIsTyping(true);
        }
        
        setView('map');
        setIsDetecting(false);
      }, (error) => {
        setIsDetecting(false);
        console.error("Geolocation error:", error);
        alert(`Location access denied or failed: ${error.message}. Please enable location permissions in your browser.`);
        setCoords([12.9345, 77.6186]); 
        setView('map');
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    } else {
      setIsDetecting(false);
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[4px]"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-none sm:rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden flex flex-col h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh]"
          >
            <div className="p-6 sm:p-10 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-primary uppercase tracking-tighter text-center flex-1">
                  OUR <span className="text-[#D3AF37] font-black">SERVICING</span> AREAS
                </h2>
                <button 
                  onClick={() => onSelect(null)} 
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex items-center max-w-xl mx-auto border-b-2 border-slate-100 focus-within:border-primary transition-colors">
                <div className="absolute left-0 text-primary">
                  <Search className="w-5 h-5" strokeWidth={3} />
                </div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onFocus={() => {
                    setIsTyping(true);
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggestions(false);
                      setIsTyping(searchQuery.length > 0);
                    }, 200);
                  }}
                  placeholder={isTyping ? "" : placeholder}
                  className="w-full pl-10 pr-10 py-5 bg-transparent border-none text-primary placeholder-slate-300 focus:ring-0 outline-none text-sx uppercase tracking-tight"
                />

                {isLoadingSuggestions && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-slate-100 border-t-primary rounded-full animate-spin" />
                  </div>
                )}

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl border border-slate-100 z-[700] overflow-hidden">
                    {suggestions.map((item) => (
                      <button 
                        key={item.place_id}
                        onClick={() => handleSuggestionSelect(item)}
                        className="w-full text-left px-6 py-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex items-start gap-4 group"
                      >
                        <MapPin className="w-5 h-5 text-slate-300 mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
                        <div className="min-w-0">
                          <div className="text-[15px] font-black text-slate-800 truncate uppercase tracking-tight">
                            {item.display_name.split(',')[0]}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate uppercase font-bold tracking-widest">
                            {item.display_name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <button 
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="absolute right-0 text-accent hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    animate={isDetecting ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Target className="w-7 h-7" strokeWidth={2.5} />
                  </motion.div>
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex flex-col min-h-0">
              <AnimatePresence>
                {isDetecting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[600] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                  >
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary animate-bounce" />
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-primary uppercase tracking-[4px] animate-pulse">
                        Elite Location Syncing...
                      </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {view === 'selection' ? (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white"
                  >
                    <div className="space-y-12">
                      <div className="space-y-8">
                        <div className="text-center">
                          <span className="text-lg font-bold uppercase tracking-[2px] text-slate-700">
                            Popular Cities
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                          {POPULAR_CITIES.map((city) => (
                            <button 
                              key={city.id}
                              onClick={() => onSelect(city.name)}
                              className="group flex flex-col items-center gap-4 p-6 rounded-[12px] border border-slate-50 hover:bg-slate-50/50 hover:shadow-sm transition-all active:scale-[0.98]"
                            >
                              <div className="w-16 h-14 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all">
                                <city.icon className="w-12 h-12" strokeWidth={0.8} />
                              </div>
                              <span className="text-[13px] font-black text-slate-800 uppercase tracking-wider">
                                {city.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                     
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-hidden bg-slate-100 flex flex-col"
                  >
                    <div className="relative w-full h-[450px] sm:h-[500px] border-y border-slate-200">
                      <MapContainer 
                        center={coords} 
                        zoom={15} 
                        style={{ height: '100%', width: '100%', background: '#f8fafc', zIndex: 1 }}
                        zoomControl={false}
                        key={`map-${coords[0]}-${coords[1]}-${mapType}`}
                      >
                        <ChangeView center={coords} />
                        {mapType === 'roadmap' ? (
                          <TileLayer
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                          />
                        ) : (
                          <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
                          />
                        )}
                        <Marker position={coords} />
                      </MapContainer>
                      <div className="absolute top-4 left-4 z-[400] flex shadow-md rounded-[4px] overflow-hidden">
                        <button 
                          onClick={() => setMapType('roadmap')}
                          className={`px-5 py-2.5 text-sm font-bold border-r border-slate-100 transition-colors ${mapType === 'roadmap' ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-400 hover:bg-white hover:text-slate-600'}`}
                        >
                          Map
                        </button>
                        <button 
                          onClick={() => setMapType('satellite')}
                          className={`px-5 py-2.5 text-sm font-bold transition-colors ${mapType === 'satellite' ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-400 hover:bg-white hover:text-slate-600'}`}
                        >
                          Satellite
                        </button>
                      </div>
                    </div>

                    <div className="p-6 sm:p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-6">
                      <button 
                        onClick={() => setView('selection')}
                        className="w-full max-w-[200px] py-5 bg-primary-dark text-white text-[13px] font-black rounded-2xl hover:bg-primary transition-all uppercase tracking-widest active:scale-95 shadow-lg shadow-primary/20"
                      >
                        Go Back
                      </button>
                      <button 
                        onClick={() => onSelect(searchQuery || "Current Location")}
                        className="w-full max-w-[240px] py-5 bg-[#FFCA08] text-primary text-[13px] font-black rounded-2xl hover:bg-accent transition-all uppercase tracking-widest shadow-xl shadow-accent/30 active:scale-95"
                      >
                        Confirm Area
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
