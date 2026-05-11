import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="/" className="text-2xl font-black text-white tracking-tighter uppercase">
              MK <span className="text-accent font-extrabold">Home </span> Service
            </a>
            <p className="text-[13px] leading-relaxed font-medium">
              Your one-stop solution for all home services. We provide professional, reliable, and affordable services at your doorstep across Karnataka.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Facebook className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Twitter className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Instagram className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Youtube className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-[13px] font-bold">
              {/* <li><a href="#" className="hover:text-white transition-colors">About Us</a></li> */}
              <li><a href="/services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="/check-status" className="hover:text-white transition-colors">Track Booking</a></li>
              
              {/* <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li> */}
              {/* <li><a href="#" className="hover:text-white transition-colors">Careers</a></li> */}
              {/* <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Support</h4>
            <ul className="space-y-4 text-[13px] font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Contact Info</h4>
            <ul className="space-y-5 text-[13px] font-bold">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span className="leading-tight">45, MG Road, Shivaji Nagar,<br />Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+91 80 1234 5678</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>support@allinone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            © 2026 UrbanElite Home Service. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
