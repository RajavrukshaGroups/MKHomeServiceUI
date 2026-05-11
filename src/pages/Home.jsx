import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import ServiceCategories from '../components/home/ServiceCategories';
import FeaturedServices from '../components/home/FeaturedServices';
import LocationModal from '../components/common/LocationModal';
import { ShieldCheck, Clock, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import MKHomeServicesAbout from '../components/home/about';
import MKHomeServicesStandard from '../components/home/MKHomeServicesStandard';
import HomeServiceFlow from '../components/home/HomeServiceFlow';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      setSelectedCity(savedLocation);
      setIsLocationModalOpen(false);
    } else {
      setIsLocationModalOpen(true);
    }
  }, []);

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    localStorage.setItem('user_location', cityName);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar 
        location={selectedCity} 
        onLocationClick={() => setIsLocationModalOpen(true)} 
      />
      
      <main>
        <Hero />
        <MKHomeServicesAbout />
        <ServiceCategories />
        
        {/* <FeaturedServices /> */}

       

        <HomeServiceFlow />

        <MKHomeServicesStandard />

        {/* <section className="py-32 bg-background-app relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[50%] bg-primary/5 skew-y-3 translate-y-32" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4 block animate-pulse">Standard of Care</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-primary mb-6 tracking-tighter uppercase whitespace-pre-line">
                WHY <span className="text-accent font-black">ALL IN ONE?</span>
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-8" />
              <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                Reliable home maintenance for every household. We combine skilled professionals with a commitment to quality for homes across Karnataka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: ShieldCheck, title: 'Certified Pros', desc: 'Expert professionals vetted through stringent background and skill assessments.', color: 'text-primary', bg: 'bg-primary/5' },
                { icon: Clock, title: 'On-Time Service', desc: 'Our logistics network ensures punctuality is never compromised.', color: 'text-accent', bg: 'bg-accent/10' },
                { icon: CheckCircle, title: 'Service Guarantee', desc: 'Quality service with a commitment to absolute satisfaction in every task.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: Smartphone, title: 'Easy Booking', desc: 'Book and manage your services through our streamlined digital gateway.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group relative"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-[3rem] -z-0 transition-all group-hover:bg-accent/10" />
                  
                  <div className={`relative z-10 w-20 h-20 rounded-[1.8rem] ${item.bg} flex items-center justify-center mb-10 border border-black/5 group-hover:rotate-[15deg] transition-all duration-500`}>
                    <item.icon className={`w-10 h-10 ${item.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="relative z-10 text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="relative z-10 text-slate-500 text-sm leading-relaxed font-semibold">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

      </main>

      <Footer />

      {/* <LocationModal 
        isOpen={isLocationModalOpen} 
        onSelect={handleCitySelect} 
      /> */}
    </div>
  );
}
