import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Gem,
  Building2,
  Bug,
  Wrench,
  Paintbrush,
  Home,
  ChefHat,
  Smartphone,
  Zap,
  Fan,
  X,
  Search,
  Star,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Clock,
  CreditCard,
  ArrowRight,
  Users,
  Leaf,
  Bath,
  Armchair,
  Grid2x2,
  BrushCleaning,
  Building,
  BedDouble
} from "lucide-react";
import HeroSection from "../services/Hero"
import API from "../../api/axios";

// ============================================================
// Icon Mapping
// ============================================================
const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('villa') || name.includes('house')) return <Home className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('duplex')) return <Building2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('kitchen')) return <ChefHat className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('pest')) return <Bug className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('repair')) return <Wrench className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('paint')) return <Paintbrush className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('electric')) return <Zap className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('bathroom')) return <Bath className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('sofa')) return <Armchair className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  //if (name.includes('cleaning')) return <Sparkles className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('window')) return <Grid2x2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('office')) return <Building className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('mattress')) return <BedDouble className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  return <Building2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
};

const getBadge = (index) => {
  const badges = [
    { text: "Trusted Professionals", icon: <ShieldCheck className="w-4 h-4 text-white" /> },
    { text: "Expert Team", icon: <Users className="w-4 h-4 text-white" /> },
    { text: "Deep Clean Assurance", icon: <Sparkles className="w-4 h-4 text-white" /> }
  ];
  return badges[index % badges.length];
};

// ============================================================
// Helper Functions
// ============================================================

const getAllDescendants = (allServices, parentId) => {
  let results = [];
  const directChildren = allServices.filter(
    (item) => item.parentId === parentId && item.isActive
  );
  for (const child of directChildren) {
    results.push(child);
    results.push(...getAllDescendants(allServices, child._id));
  }
  return results;
};

const isLeafService = (item, allServices) => {
  return !allServices.some((s) => s.parentId === item._id && s.isActive);
};

const buildCategoryGroups = (services, categories, selectedCategory, showAllServices) => {
  const getLeafServicesForCategory = (categoryId) => {
    const descendants = getAllDescendants(services, categoryId);
    return descendants.filter((item) => isLeafService(item, services));
  };

  if (showAllServices) {
    return categories
      .filter((cat) => cat._id !== "all-services")
      .map((cat) => ({
        id: cat._id,
        categoryName: cat.name,
        services: getLeafServicesForCategory(cat._id),
      }))
      .filter((group) => group.services.length > 0);
  }

  if (selectedCategory && selectedCategory._id !== "all-services") {
    return [{
      id: selectedCategory._id,
      categoryName: selectedCategory.name,
      services: getLeafServicesForCategory(selectedCategory._id),
    }];
  }
  return [];
};

// Helper: Extract display info from service options
const getServicePriceInfo = (service) => {
  // If direct price exists and no options
  if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
    return { type: "fixed", price: service.price, minPrice: service.price, variants: null };
  }

  // If options exist
  if (service.options && service.options.length > 0) {
    // Collect all unique option value labels and find min price
    let allVariantLabels = [];
    let minPrice = Infinity;

    for (const opt of service.options) {
      if (opt.values && Array.isArray(opt.values)) {
        for (const val of opt.values) {
          if (val.label) allVariantLabels.push(val.label);
          if (val.price !== undefined && val.price !== null && val.price < minPrice) {
            minPrice = val.price;
          }
        }
      }
    }

    // Remove duplicates while preserving order
    const uniqueLabels = [...new Map(allVariantLabels.map(l => [l, l])).values()];
    
    // Truncate for display (first 3 unique variant names)
    let displayVariants = uniqueLabels.slice(0, 3);
    let extraCount = uniqueLabels.length - 3;
    
    return {
      type: "options",
      minPrice: minPrice !== Infinity ? minPrice : null,
      variants: uniqueLabels,
      displayVariants,
      extraCount,
    };
  }

  // No price and no options
  return { type: "custom", price: null, minPrice: null, variants: null };
};

// ============================================================
// Premium Skeleton Loader
// ============================================================
const PremiumSkeleton = () => (
  <div className="space-y-16">
    <div className="flex flex-wrap gap-4 justify-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-36 h-12 bg-gradient-to-r from-amber-100/50 to-stone-100/50 rounded-full animate-pulse" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-100/50 overflow-hidden">
          <div className="h-60 bg-gradient-to-br from-amber-50/50 to-stone-100/50 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-amber-100/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
            <div className="flex justify-between pt-3">
              <div className="h-7 bg-amber-100/50 rounded w-28 animate-pulse" />
              <div className="h-7 bg-stone-100 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// Main Component
// ============================================================




export default function ServiceCategories({ hideHero = false }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [hoveredService, setHoveredService] = useState(null);

  // Sync with URL parameter
  useEffect(() => {
    const query = searchParams.get('q');
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Fetch data
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchServices = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await API.get("/client/send-services-client", {
  //         signal: abortController.signal,
  //       });
  //       const result = response.data;
  //       if (result.success) {
  //         const activeData = result.data.filter((item) => item.isActive);
  //         setServices(activeData);
  //         const dbCategories = activeData.filter(
  //           (item) => item.type === "category" && item.parentId === null
  //         );
  //         const allCategory = { _id: "all-services", name: "All Services" };
  //         setCategories([allCategory, ...dbCategories]);
  //       } else {
  //         throw new Error(result.message || "Failed to load");
  //       }
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  //   return () => abortController.abort();
  // }, []);

  //  useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchServices = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(
  //        "http://localhost:12000/client/send-services-client",
  //        // "https://server.mkhomeservice.in/client/send-services-client",
  //         { signal: abortController.signal }
  //       );
  //       if (!res.ok) throw new Error("Unable to load services");
  //       const result = await res.json();
  //       if (result.success) {
  //         const activeData = result.data.filter((item) => item.isActive);
  //         setServices(activeData);
  //         const dbCategories = activeData.filter(
  //           (item) => item.type === "category" && item.parentId === null
  //         );
  //         const allCategory = { _id: "all-services", name: "All Services" };
  //         setCategories([allCategory, ...dbCategories]);
  //       } else {
  //         throw new Error(result.message || "Failed to load");
  //       }
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  //   return () => abortController.abort();
  // }, []);

useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/client/send-services-client"
      );

      const result = response.data;

      if (result.success) {
        const activeData = result.data.filter(
          (item) => item.isActive
        );

        setServices(activeData);

        const dbCategories = activeData.filter(
          (item) =>
            item.type === "category" &&
            item.parentId === null
        );

        setCategories([
          {
            _id: "all-services",
            name: "All Services",
          },
          ...dbCategories,
        ]);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);
  
  const rawGroups = useMemo(() => {
    if (!services.length) return [];
    return buildCategoryGroups(services, categories, selectedCategory, showAllServices);
  }, [services, categories, selectedCategory, showAllServices]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return rawGroups;
    const q = searchQuery.toLowerCase();
    return rawGroups
      .map((g) => ({
        ...g,
        services: g.services.filter(
          (s) => s.name.toLowerCase().includes(q) || (s.description || "").toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.services.length > 0);
  }, [rawGroups, searchQuery]);

  const totalServicesCount = useMemo(() => 
    filteredGroups.reduce((acc, g) => acc + g.services.length, 0), [filteredGroups]
  );

  const handleCategoryClick = (category) => {
    setSearchQuery("");
    if (category._id === "all-services") {
      setSelectedCategory(null);
      setShowAllServices(true);
    } else {
      setSelectedCategory(category);
      setShowAllServices(false);
    }
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setShowAllServices(true);
    setSearchQuery("");
  };

  const getCategoryServiceCount = (category) => {
    if (category._id === "all-services") {
      const allGroups = buildCategoryGroups(services, categories, null, true);
      return allGroups.reduce((acc, g) => acc + g.services.length, 0);
    }
    const descendants = getAllDescendants(services, category._id);
    return descendants.filter((item) => isLeafService(item, services)).length;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/10 to-stone-50/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-700 text-sm font-medium mb-6 border border-amber-200/50">
              <Gem className="w-4 h-4" />
              <span>Exceptional Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-stone-800">
              Curated Excellence
            </h2>
            <div className="w-24 h-0.5 bg-amber-300 mx-auto mt-6" />
            <p className="text-stone-500 mt-6 max-w-md mx-auto">Loading our premium catalogue...</p>
          </div>
          <PremiumSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-6">
            <Building2 className="w-12 h-12 text-amber-500" />
          </div>
          <h3 className="text-2xl font-serif text-stone-800 mb-2">Service Unavailable</h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            We're experiencing technical difficulties. Our team has been notified.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition shadow-md shadow-amber-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30"
    >
      {/* Decorative abstract shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Hero Section */}
        {!hideHero && <HeroSection />}

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-5 justify-between items-center mb-12"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim()) {
                  setSearchParams({ q: val.trim() });
                } else {
                  setSearchParams({});
                }
              }}
              className="w-full pl-12 pr-5 py-3 md:py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:border-amber-300 shadow-sm text-stone-700 placeholder-stone-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={handleClearAll}
            className="flex flex-row hidden md:flex items-center gap-2 px-6 py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition text-stone-600 text-sm font-medium shadow-sm"
          >
            <X size={16} />
            Reset Filters
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {categories.map((cat, idx) => {
              const isSelected =
                (cat._id === "all-services" && showAllServices) ||
                selectedCategory?._id === cat._id;
              const count = getCategoryServiceCount(cat);
              return (
                <motion.button
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`
                    relative md:text-sm text-xs md:px-7 px-2 md:py-2.5 py-1 rounded-full md:font-medium font-light transition-all duration-300
                    ${isSelected 
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-200/50" 
                      : "bg-white/60 backdrop-blur-sm text-stone-600 hover:bg-amber-50 border border-stone-200"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {cat._id === "all-services" ? (
                      <Layers className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {cat.name}
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full ml-1
                      ${isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}
                    `}>
                      {count}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        {(searchQuery || !showAllServices) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8 pb-3 border-b border-amber-100/50"
          >
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="tracking-wide">
                {totalServicesCount} exquisite {totalServicesCount === 1 ? "service" : "services"}
                {searchQuery && ` matching “${searchQuery}”`}
                {!showAllServices && selectedCategory && ` in ${selectedCategory.name}`}
              </span>
            </div>
          </motion.div>
        )}

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {filteredGroups.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-28 bg-white/40 backdrop-blur-sm rounded-3xl border border-amber-100/50"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-5">
                <Search className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-stone-700 mb-2">No services found</h3>
              <p className="text-stone-400 max-w-sm mx-auto">
                Please refine your selection or explore other categories.
              </p>
              <button
                onClick={handleClearAll}
                className="mt-6 px-7 py-2.5 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition font-medium"
              >
                Browse all services
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {filteredGroups.map((group, groupIdx) => (
                <motion.div
                  key={group.id || groupIdx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIdx * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-12 h-0.5 bg-amber-300/70 rounded-full" />
                    <h2 className="text-xl md:text-3xl font-serif font-light tracking-wide text-stone-800">
                      {group.categoryName}
                    </h2>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300/70 to-transparent rounded-full" />
                    <span className="text-sm text-stone-400 font-mono">
                      {group.services.length} offerings
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.services.map((service, idx) => {
                      const priceInfo = getServicePriceInfo(service);
                      const badge = getBadge(idx);
                      return (
                        <motion.div
                          key={service._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          onHoverStart={() => setHoveredService(service._id)}
                          onHoverEnd={() => setHoveredService(null)}
                          onClick={() => navigate(`/service/${service._id}`)}
                          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 max-w-sm mx-auto w-full flex flex-col h-full"
                        >
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden shrink-0">
                            <img
                              src={service.images?.[0] || "https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=2070&auto=format&fit=crop"}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {/* Dynamic Badge */}
                            <div className="absolute top-4 right-4 bg-[#2d4a43] text-white rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-lg opacity-90">
                              {badge.icon}
                              <span className="text-[10px] font-bold tracking-tight">{badge.text}</span>
                            </div>
                          </div>

                          {/* Floating Category Icon */}
                          <div className="absolute top-[14rem] left-6 w-16 h-16 bg-[#f8fafc] rounded-2xl flex items-center justify-center border-4 border-white shadow-md z-10">
                            {getCategoryIcon(service.name || group.categoryName)}
                          </div>

                          <div className="px-6 pt-10 pb-6 flex-1 flex flex-col">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-[#1f2937] leading-tight">
                                {service.name}
                              </h3>
                              <div className="w-10 h-[3px] bg-[#fbbf24] mt-3" />
                            </div>

                            <p className="text-gray-500 text-[13px] leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                              {service.description || "Comprehensive professional service tailored to your specific needs and ensuring a healthier environment."}
                            </p>

                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                  Starting From
                                </span>
                                <div className="text-3xl font-bold text-[#0a3622]">
                                  ₹{priceInfo.minPrice ? priceInfo.minPrice.toLocaleString() : 'N/A'}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-[#f9fafb] px-3 py-1.5 rounded-full border border-gray-100">
                                <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                <span className="text-sm font-bold text-[#374151]">{service.rating || "5.0"}</span>
                                <span className="text-xs text-gray-400">({service.totalReviews || 5})</span>
                              </div>
                            </div>

                            {/* Service Options Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                               {priceInfo.variants && priceInfo.variants.length > 0 ? (
                                  <>
                                    {priceInfo.displayVariants.map((variant, vIdx) => (
                                      <span key={vIdx} className="text-[11px] font-medium bg-[#f3f4f6] text-[#6b7280] px-3 py-1 rounded-full border border-gray-100">
                                        {variant}
                                      </span>
                                    ))}
                                    {priceInfo.extraCount > 0 && (
                                      <span className="text-[11px] font-medium bg-gray-50 text-gray-400 px-3 py-0 rounded-full border border-gray-100">
                                        +{priceInfo.extraCount} More
                                      </span>
                                    )}
                                  </>
                               ) : (
                                  <></>
                               )}
                            </div>

                            {/* Action Button - Pushed to bottom */}
                            <div className="mt-auto">
                              <div className="flex items-center justify-between p-1 pl-6 border border-[#d1d5db] rounded-xl hover:border-[#0a3622] transition-colors duration-300">
                                <span className="text-[#374151] font-bold text-sm">
                                  View Details
                                </span>
                                <div className="w-10 h-10 bg-[#2d4a43] rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                                  <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators Bar - Exact Image Style */}
        <div className="mt-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">Verified Professionals</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Background-checked & trained cleaning experts</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Leaf className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">Eco-Friendly Products</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Safe for your family, pets & the environment</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">On-Time Service</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Punctual, reliable & hassle-free experience</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Star className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">100% Satisfaction</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Quality service you can trust every time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}