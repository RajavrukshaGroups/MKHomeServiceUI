// MKHomeServicesAbout.jsx
import React from 'react';
import { Shield, Crown, Handshake, Paintbrush, Brush, Hammer, Wrench, Home, CheckCircle } from 'lucide-react';
import logo from '../../assets/logo.png';

const MKHomeServicesAbout = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column – Royal Emblem & Service Badges */}
          <div className="lg:w-2/5 bg-gradient-to-br from-[#0a1a2f] to-[#102b3f] flex flex-col items-center justify-center p-8 md:p-12 text-center">
            <div className="text-amber-400 mb-6">
              {/* <Crown size={80} strokeWidth={1.5} className="drop-shadow-lg" /> */}
              <img src={logo} alt="logo" className="w-52 h-52" />
            </div>
            <div className="font-serif text-2xl md:text-3xl text-amber-100 border-t border-amber-500/40 pt-5 inline-block">
              Service with Nobility
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['Cleaning', 'Painting', 'Carpentry', 'Plumbing', 'Handyman'].map((service) => (
                <span key={service} className="px-3 py-1 text-xs font-medium tracking-wide text-amber-200 bg-amber-500/10 rounded-full backdrop-blur-sm border border-amber-500/30">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column – Content */}
          <div className="lg:w-3/5 p-8 md:p-10 bg-white">
            <div className="text-xs tracking-widest text-amber-700 uppercase border-l-3 border-amber-500 pl-3 mb-4">
              Comprehensive Home Care
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0f2a3f] leading-tight">
              MK Home Services
              <span className="block text-2xl md:text-3xl text-amber-700 mt-1">Cleaning · Painting · Carpentry & Beyond</span>
            </h1>
            <div className="text-sm text-amber-600 font-medium border-b border-amber-200 inline-block pb-1 mt-2">
              One trusted name for every corner of your home
            </div>
            <div className="italic text-gray-500 border-l-3 border-amber-500 pl-4 my-5">
              Dignity in every gesture. Mastery in every trade.
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              At MK Home Services, we bring the same regal standard to <strong>cleaning, painting, carpentry, and all home trades</strong>. 
              Whether we are restoring a heirloom cabinet, applying a flawless finish to your walls, or deep-cleaning your sanctuary, 
              every service is performed with the reverence of a palace and the precision of a crown jeweler. 
              True royalty lies in respect — for your home, your time, and your complete peace of mind.
            </p>

            {/* Three Pillars with Premium Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-6">
              <div className="bg-[#fefcf7] p-4 rounded-2xl border border-amber-100 shadow-sm">
                <Shield className="text-amber-600 mb-2" size={28} />
                <h3 className="font-serif text-xl font-semibold text-amber-800">Dignity</h3>
                <p className="text-sm text-gray-600 mt-1">Quiet, composed professionalism — no cutting corners, no disruption. Your home remains a sanctuary.</p>
              </div>
              <div className="bg-[#fefcf7] p-4 rounded-2xl border border-amber-100 shadow-sm">
                <Crown className="text-amber-600 mb-2" size={28} />
                <h3 className="font-serif text-xl font-semibold text-amber-800">Royalty</h3>
                <p className="text-sm text-gray-600 mt-1">Uncompromising quality. Premium paints, fine carpentry joints, hospital-grade cleaning.</p>
              </div>
              <div className="bg-[#fefcf7] p-4 rounded-2xl border border-amber-100 shadow-sm">
                <Handshake className="text-amber-600 mb-2" size={28} />
                <h3 className="font-serif text-xl font-semibold text-amber-800">Trustworthiness</h3>
                <p className="text-sm text-gray-600 mt-1">Radical transparency. Upfront pricing, vetted experts, and a pledge honored with our seal.</p>
              </div>
            </div>

            {/* Service List Badge */}
            <div className="bg-amber-50/50 rounded-xl p-4 flex flex-wrap items-center gap-3 text-sm text-gray-700 my-4">
              <CheckCircle size={18} className="text-amber-600" />
              <span className="font-medium">One royal standard, all home services:</span>
              <div className="flex flex-wrap gap-2">
                {['Cleaning', 'Painting', 'Carpentry', 'Plumbing', 'Electrical', 'Handyman', 'Assembly'].map((s) => (
                  <span key={s} className="text-xs bg-white px-2 py-1 rounded-full shadow-sm">{s}</span>
                ))}
              </div>
            </div>

            {/* Footer Signature */}
            <div className="border-t border-amber-100 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2">
              <div className="font-serif text-amber-700 italic text-lg">“It is not just a service call. It is a royal appointment.”</div>
              <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">✓ Bonded · Insured · Background-checked stewards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MKHomeServicesAbout;