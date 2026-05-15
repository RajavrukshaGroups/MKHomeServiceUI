import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import { ShieldCheck, Clock, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import MKHomeServicesAbout from '../components/home/about';
import MKHomeServicesStandard from '../components/home/MKHomeServicesStandard';
import HomeServiceFlow from '../components/home/HomeServiceFlow';

const ServiceCategories = lazy(() => import('../components/home/ServiceCategories'));

export default function Home() {
  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero />
        <MKHomeServicesAbout />
        <Suspense fallback={<div className="py-20 text-center text-stone-400">Loading services...</div>}>
          <ServiceCategories hideHero={true} />
        </Suspense>
        
        {/* <FeaturedServices /> */}

        <HomeServiceFlow />

        <MKHomeServicesStandard />
      </main>

      <Footer />
    </div>
  );
}
