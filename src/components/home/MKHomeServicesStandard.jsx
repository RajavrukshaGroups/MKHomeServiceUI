import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Smartphone, 
  ShieldAlert,
  CheckCircle2,
  Gem,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";
import quality from '../../assets/quality.jpg'
import verified from '../../assets/Verified.svg'
import onTime from '../../assets/on-time.svg'
import easyBooking from '../../assets/easy-booking.jpg'
import unknownPerson from '../../assets/unknown-person.jpg'

const certificationMetrics = [
  { label: "Background Checks", value: "100%", detail: "Criminal & Identity Verified" },
  { label: "Skill Assessment", value: "Tier 1", detail: "Hands-on technical testing" },
  { label: "Insurance Coverage", value: "₹10L+", detail: "Comprehensive site protection" },
  { label: "Service Area", value: "All KA", detail: "Urban & Semi-urban reach" },
];

const features = [
  {
    title: "Certified Pros",
    description: "Expert professionals vetted through stringent background and skill assessments. We only hire the top 1% of applicants.",
    imageUrl: verified,
    icon: ShieldCheck,
    color: "blue"
  },
  {
    title: "On-Time Service",
    description: "Our logistics network ensures punctuality is never compromised. 98% of our house calls arrive within the 15-minute window.",
    imageUrl: onTime,
    icon: Clock,
    color: "amber"
  },
  {
    title: "Service Guarantee",
    description: "Quality service with a commitement to absolute satisfaction. If you aren't happy, we'll make it right within 24 hours.",
    imageUrl: quality,
    icon: Award,
    color: "indigo"
  },
  {
    title: "Easy Booking",
    description: "Book and manage your services through our streamlined digital gateway. Real-time tracking and instant invoices.",
    imageUrl: easyBooking,
    icon: Smartphone,
    color: "emerald"
  },
];

export default function RoyalStandard() {
  return (
    <section className="bg-[#fcfaf7] py-12 px-6 sm:px-12 lg:px-24 text-[#0a1128] overflow-hidden relative font-sans">
      {/* Structural Accents */}
      <div className="absolute left-0 top-0 w-px h-full bg-black/5 ml-[10%] hidden xl:block" />
      <div className="absolute right-0 top-0 w-px h-full bg-black/5 mr-[10%] hidden xl:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-black/10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#fbbf24]" />
              <span className="text-[#695200ff] font-bold tracking-[0.3em] uppercase text-[10px]">The Royal Protocol</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight leading-[0.95] mb-6">
              Standard <br />
              <span className="font-bold italic text-blue-900">of Care.</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-lg">
              Reliable home maintenance for every household. We combine skilled professionals 
              with a commitment to quality for homes across Karnataka.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex flex-col items-end gap-2"
          >
            <div className="flex -space-x-2">
              {[unknownPerson, unknownPerson, unknownPerson].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#fcfaf7] bg-gray-200 overflow-hidden">
                  <img src={i} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#fcfaf7] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">
                +12k
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Trusted by Karnataka</span>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-white border border-black/5 rounded-3xl hover:border-blue-200 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-center items-center mb-6  flex-col">
                    {/* <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <feature.icon className="text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
                    </div>
                    <ArrowUpRight className="text-gray-200 group-hover:text-blue-200 transition-colors" size={20} /> */}
                    <img src={feature.imageUrl} alt={feature.title} className="w-52 h-52 items-center justify-center group-hover:bg-blue-50 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b3f6aff] mb-3">{feature.title}</h3>
                  <p className="text-gray-800 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Panels - Informative Stack */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* The Metric Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a1128] text-white p-8 rounded-3xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert size={120} />
              </div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-8">System Metrics</h4>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {certificationMetrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold mb-1">{m.value}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{m.label}</div>
                    <div className="text-[9px] text-blue-300/60 leading-tight">{m.detail}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Oath Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#fbbf24]/30 p-8 rounded-3xl flex-1 flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Pattern Background */}
              <div 
                className="absolute inset-0 opacity-[0.03] z-0" 
                style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "16px 16px" }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#fbbf24] flex items-center justify-center">
                    <Gem size={16} className="text-[#0a1128]" />
                  </div>
                  <span className="text-[#0a1128] font-bold tracking-widest text-[10px] uppercase">The MK Royal Oath</span>
                </div>
                
                <p className="text-2xl font-bold italic text-blue-900 leading-tight mb-4 transform group-hover:scale-[1.02] transition-transform duration-500">
                  "Discretion. Precision. Unwavering integrity."
                </p>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">
                  Our promise to every home we serve, ensuring the highest standards are met 
                  with every visit.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Bonded & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Fingerprint size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Background Checked</span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#fbbf24]/10 rounded-tl-3xl translate-x-4 translate-y-4" />
            </motion.div>
          </div>

        </div>

        {/* Footer Rail */}
        {/* <div className="mt-20 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Operation Code: MK-2024</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">Service Active Across Karnataka</span>
          </div>
          <div className="flex gap-4">
             {["Compliance", "Privacy Policy", "Terms of Service"].map((text) => (
               <a key={text} href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">{text}</a>
             ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
