import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_SERVICES, CATEGORIES } from '../constants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LocationModal from '../components/common/LocationModal';
import { Star, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Services() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Select Location');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) setLocation(savedLocation);
    window.scrollTo(0, 0);
  }, []);

  const filteredServices = FEATURED_SERVICES.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleLocationSelect = (cityName) => {
    setLocation(cityName);
    localStorage.setItem('user_location', cityName);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar location={location} onLocationClick={() => setIsLocationModalOpen(true)} />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-black text-primary mb-4 uppercase tracking-tighter">
              ALL HOME <span className="text-accent font-black">SERVICES</span>
            </h1>
            <p className="text-slate-500 max-w-2xl font-medium">
              Explore our wide range of professional home services. From deep cleaning
              to expert repairs, we've got you covered with verified Karnataka experts.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="What are you looking for? (e.g. cleaning, plumbing...)"
                className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm font-bold placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('All')}
                className={cn(
                  "px-8 py-5 rounded-[2rem] text-[13px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                  selectedCategory === 'All'
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white border-slate-200 text-slate-500 hover:text-primary hover:border-primary"
                )}
              >
                All Services
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    "px-8 py-5 rounded-[2rem] text-[13px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                    selectedCategory === cat.name
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white border-slate-200 text-slate-500 hover:text-primary hover:border-primary"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group cursor-pointer"
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-bold text-slate-800">{service.rating}</span>
                        <span className="text-sm text-slate-400 font-medium">
                          ({service.reviews})
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-primary mb-3 uppercase tracking-tight group-hover:text-accent transition-colors leading-tight">
                        {service.name}
                      </h3>

                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starts at</span>
                          <span className="text-2xl font-black text-primary">
                            ₹{service.price}
                          </span>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500 border border-black/5">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 shadow-inner">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-black/5">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h2 className="text-2xl font-black text-primary mb-3 uppercase tracking-tighter">No results <span className="text-accent">Found</span></h2>
              <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
                We couldn't find any services matching your current filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <LocationModal 
        isOpen={isLocationModalOpen}
        onSelect={handleLocationSelect}
      />
    </div>
  );
}
