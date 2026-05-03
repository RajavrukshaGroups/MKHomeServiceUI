// RelatedServicesSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Star } from "lucide-react";

// ---------- Helper: check if a service is a leaf (no active children) ----------
const isLeafService = (service, allItems) => {
  return !allItems.some(item => item.parentId === service._id && item.isActive);
};

// ---------- Helper: extract price info (same as in catalogue) ----------
const getServicePriceInfo = (service) => {
  if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
    return { type: "fixed", price: service.price };
  }
  if (service.options && service.options.length > 0) {
    let minPrice = Infinity;
    for (const opt of service.options) {
      if (opt.values && Array.isArray(opt.values)) {
        for (const val of opt.values) {
          if (val.price !== undefined && val.price !== null && val.price < minPrice) {
            minPrice = val.price;
          }
        }
      }
    }
    return { type: "options", minPrice: minPrice !== Infinity ? minPrice : null };
  }
  return { type: "custom" };
};

// ---------- Reusable Service Card (mirrors catalogue design) ----------
const ServiceCard = ({ service, onClick }) => {
  const priceInfo = getServicePriceInfo(service);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-amber-100/60 overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden bg-stone-100">
        <img
          src={service.images?.[0] || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format"}
          alt={service.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&auto=format";
          }}
        />
        {/* {service.rating >= 4.5 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
            Premium
          </div>
        )} */}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-stone-800 group-hover:text-amber-700 transition line-clamp-1">
          {service.name}
        </h3>
        <p className="text-stone-500 text-xs mt-1 line-clamp-2">
          {service.description || "Exceptional service tailored to your needs."}
        </p>

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-100">
          <div>
            {priceInfo.type === "fixed" && (
              <span className="font-semibold text-amber-700 text-sm">₹{priceInfo.price.toLocaleString()}</span>
            )}
            {priceInfo.type === "options" && priceInfo.minPrice && (
              <span className="font-semibold text-amber-700 text-sm">From ₹{priceInfo.minPrice.toLocaleString()}</span>
            )}
            {priceInfo.type === "custom" && (
              <span className="text-stone-500 text-xs">Custom Quote</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-stone-600">{service.rating || "4.9"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------- Main component ----------
export default function RelatedServicesSection({ currentServiceId, currentParentId }) {
  const navigate = useNavigate();
  const [relatedServices, setRelatedServices] = useState([]); // same category, leaf services only
  const [otherServices, setOtherServices] = useState([]);     // other categories, leaf services only
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:12000/client/send-services-client");
        const result = await response.json();

        if (result.success) {
          const allItems = result.data;

          // 1. Only active items
          const activeItems = allItems.filter(item => item.isActive);

          // 2. Get all leaf services (no active children)
          const leafServices = activeItems.filter(service => 
            service.type === "service" && isLeafService(service, activeItems)
          );

          // 3. Exclude the current service
          const otherLeafServices = leafServices.filter(s => s._id !== currentServiceId);

          // 4. Split into same parentId vs others
          const sameCategory = otherLeafServices.filter(s => s.parentId === currentParentId);
          const otherCategory = otherLeafServices.filter(s => s.parentId !== currentParentId);

          setRelatedServices(sameCategory);
          setOtherServices(otherCategory);
        }
      } catch (err) {
        console.error("Failed to load related services", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentServiceId && currentParentId) {
      fetchAllServices();
    }
  }, [currentServiceId, currentParentId]);

  // Loading skeleton (matches premium style)
  if (loading) {
    return (
      <div className="mt-12">
        <div className="h-8 w-48 bg-stone-100 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-stone-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // If no services to show, return nothing
  if (relatedServices.length === 0 && otherServices.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 pt-8 border-t border-amber-100/50">
      {/* Same Category Services (leaf services only) */}
      {relatedServices.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-0.5 bg-amber-300 rounded-full" />
            <h2 className="text-2xl font-serif font-light tracking-wide text-stone-800">
              Related Services
            </h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300/70 to-transparent rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onClick={() => navigate(`/service/${service._id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Category Services (leaf services only) */}
      {otherServices.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-0.5 bg-stone-300 rounded-full" />
            <h2 className="text-2xl font-serif font-light tracking-wide text-stone-800">
              Other Services
            </h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-stone-300/70 to-transparent rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onClick={() => navigate(`/service/${service._id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}