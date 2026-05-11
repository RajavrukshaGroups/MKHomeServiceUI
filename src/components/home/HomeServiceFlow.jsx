// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import weArrive from "../../assets/we-arrive.gif"

// import { 
//   ClipboardCheck, 
//   Calendar, 
//   User, 
//   ThumbsUp, 
//   Star,
//   ChevronRight,
//   ChevronLeft
// } from "lucide-react";

// const steps = [
//   {
//     id: "01",
//     label: "1",
//     lottieUrl:"https://lottie.host/embed/3f952a1a-6807-4f38-88f5-5c0fd4708598/LLMIZst1ZO.lottie",
//     title: "Choose Service",
//     description: "Select the service you need",
//     icon: ClipboardCheck,
//     isFirst: true,
//   },
//   {
//     id: "02",
//     label: "2",
//     lottieUrl:"https://lottie.host/embed/a9be4076-b119-4094-b56c-d83bb26cfdc0/7Nsmj4EO5L.lottie",
//     title: "Book Online",
//     description: "Pick a time & book your slot",
//     icon: Calendar,
//     isFirst: true,
//   },
//   {
//     id: "03",
//     label: null,
//     lottieUrl: "https://lottie.host/embed/0888cbfd-784b-4f7e-af22-18f945a575f5/ebmQvXy5l8.lottie",
//     title: "We Arrive",
//     description: "Our expert arrives on time",
//     icon: User,
//     isFirst: true,
//   },
//   {
//     id: "04",
//     label: null,
//     lottieUrl: "https://lottie.host/embed/d602ba3c-267b-44b8-bbf9-8bf4889ca09b/lqg0DAvLOS.lottie",
//     title: "Relax",
//     description: "Enjoy a clean & beautiful home",
//     icon: ThumbsUp,
//     isFirst: true,
//   },
// ];

// const testimonials = [
//   {
//     id: 1,
//     name: "Rakesh Sharma",
//     location: "Noida",
//     rating: 5,
//     text: "Excellent cleaning service! The team was punctual and did a wonderful job.",
//     avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
//   },
//   {
//     id: 2,
//     name: "Priya Mehta",
//     location: "Gurgaon",
//     rating: 5,
//     text: "Very professional painters. My home looks brand new now!",
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
//   },
//   {
//     id: 3,
//     name: "Aman Verma",
//     location: "Delhi",
//     rating: 5,
//     text: "Great carpentry work. Highly recommended MK Home Service.",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
//   },
//   {
//     id: 4,
//     name: "Sneha Kapoor",
//     location: "Mumbai",
//     rating: 5,
//     text: "The interior design team transformed my apartment. Exactly what I wanted!",
//     avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
//   },
//   {
//     id: 5,
//     name: "Vikram Singh",
//     location: "Bangalore",
//     rating: 5,
//     text: "Reliable plumbing service. They fixed everything quickly without any mess.",
//     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
//   },
//   {
//     id: 6,
//     name: "Ananya Iyer",
//     location: "Chennai",
//     rating: 5,
//     text: "Wonderful experience with their deep cleaning service. Highly thorough.",
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
//   },
// ];

// export default function HomeServiceFlow() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(3);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) setItemsPerPage(1);
//       else if (window.innerWidth < 1024) setItemsPerPage(2);
//       else setItemsPerPage(3);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const totalPages = Math.ceil(testimonials.length / itemsPerPage);

//   const nextSlide = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % totalPages);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
//   };

//   const goToPage = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   const variants = {
//     enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
//     center: { zIndex: 1, x: 0, opacity: 1 },
//     exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
//   };

//   const visibleTestimonials = testimonials.slice(
//     currentIndex * itemsPerPage,
//     (currentIndex + 1) * itemsPerPage
//   );

//   return (
//     <div className="w-full">
//       {/* How It Works Section */}
//       <section className="bg-white py-20 px-6 sm:px-12 lg:px-24 text-white overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <motion.h2 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-black"
//           >
//             How It Works
//           </motion.h2>
//           {/* <iframe src="https://lottie.host/embed/3f952a1a-6807-4f38-88f5-5c0fd4708598/LLMIZst1ZO.lottie"></iframe>
//             <iframe src="https://lottie.host/embed/a9be4076-b119-4094-b56c-d83bb26cfdc0/7Nsmj4EO5L.lottie"></iframe> */}
          
//           <div className="relative">
//             <div className="hidden lg:block absolute top-[50%] left-[5%] right-[5%] h-px border-t border-dashed border-gray-900/90 -translate-y-1/2 z-0" />
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
//               {steps.map((step, index) => (
//                 <motion.div
//                   key={step.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="h-full"
//                 >
//                   <div className="bg-[ #67696cff] flex flex-col items-center justify-center border border-white/10 p-6 rounded-2xl h-full flex items-center gap-6 backdrop-blur-md">
//                     <div className="shrink-0">
//                       {step.isFirst ? (
//                         // <div className="w-14 h-14 rounded-full bg-[#cbd5e1] flex items-center justify-center text-[#0a1128] text-2xl font-bold">
//                         //   {step.label}
//                         // </div>
//                         <iframe src={step.lottieUrl} alt="" className="w-40 h-40" ></iframe>
//                       ) : (
//                         // <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
//                         //   <step.icon className="text-[#0a1128]" size={24} />
//                         // </div>\
//                         // <iframe src={step.lottieUrl} alt="" className="w-20 h-20" ></iframe>
//                         <img src={step.lottieUrl} alt="" className="w-30 h-30" />
//                       )}
//                     </div>
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-1.5 mb-1">
//                         <ClipboardCheck size={12} className="text-[#fbbf24]" />
//                         <span className="text-[#fbbf24] text-[12px] font-semibold tracking-widest uppercase">
//                           STEP {step.id}
//                         </span>
//                       </div>
//                       <h3 className="text-[22px] font-bold mb-1 white-space-nowrap text-[#003579ff]">{step.title}</h3>
//                       <p className="text-gray-950 text-xs font-semibold leading-relaxed max-w-[160px]">{step.description}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a1128] text-center sm:text-left">
//               What Our Customers Say
//             </h2>
//             <div className="flex items-center gap-6">
//               <div className="hidden sm:flex items-center gap-2">
//                 <button onClick={prevSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button onClick={nextSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//               <button className="text-[#2563eb] font-semibold flex items-center gap-1 hover:underline text-sm md:text-base">
//                 View All Reviews <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>

//           <div className="relative overflow-hidden min-h-[400px]">
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={variants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {visibleTestimonials.map((testimonial) => (
//                   <div key={testimonial.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
//                     <div className="flex items-center gap-4 mb-6">
//                       <img 
//                         src={testimonial.avatar} 
//                         alt={testimonial.name}
//                         className="w-14 h-14 rounded-full object-cover border-4 border-orange-50/50"
//                         referrerPolicy="no-referrer"
//                       />
//                       <div>
//                         <h4 className="font-bold text-[#0a1128] text-lg">{testimonial.name}</h4>
//                         <p className="text-gray-400 text-sm">{testimonial.location}</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-1 mb-6">
//                       {[...Array( testimonial.rating)].map((_, i) => (
//                         <Star key={i} size={18} className="fill-[#fbbf24] text-[#fbbf24]" />
//                       ))}
//                     </div>
//                     <p className="text-[#475569] leading-relaxed text-base font-medium">{testimonial.text}</p>
//                   </div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="flex justify-center gap-2.5 mt-16">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goToPage(i)}
//                 className={`transition-all duration-300 rounded-full ${
//                   currentIndex === i ? "w-8 h-2.5 bg-[#2563eb]" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ClipboardCheck, 
  Calendar, 
  User, 
  ThumbsUp, 
  Star,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import unknownPerson from "../../assets/unknown-person.jpg"

const steps = [
  {
    id: "01",
    label: "1",
    lottieUrl:"https://lottie.host/embed/3f952a1a-6807-4f38-88f5-5c0fd4708598/LLMIZst1ZO.lottie",
    title: "Choose Service",
    description: "Select the service you need",
    icon: ClipboardCheck,
    isFirst: true,
  },
  {
    id: "02",
    label: "2",
    lottieUrl:"https://lottie.host/embed/a9be4076-b119-4094-b56c-d83bb26cfdc0/7Nsmj4EO5L.lottie",
    title: "Book Online",
    description: "Pick a time & book your slot",
    icon: Calendar,
    isFirst: true,
  },
  {
    id: "03",
    label: null,
    lottieUrl: "https://lottie.host/embed/0888cbfd-784b-4f7e-af22-18f945a575f5/ebmQvXy5l8.lottie",
    title: "We Arrive",
    description: "Our expert arrives on time",
    icon: User,
    isFirst: true,
  },
  {
    id: "04",
    label: null,
    lottieUrl: "https://lottie.host/embed/d602ba3c-267b-44b8-bbf9-8bf4889ca09b/lqg0DAvLOS.lottie",
    title: "Relax",
    description: "Enjoy a clean & beautiful home",
    icon: ThumbsUp,
    isFirst: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Rakesh Sharma",
    location: "Bangalore",
    rating: 5,
    text: "Excellent cleaning service! The team was punctual and did a wonderful job.",
    avatar: unknownPerson,
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Bangalore",
    rating: 5,
    text: "Very professional painters. My home looks brand new now!",
    avatar: unknownPerson,
  },
  {
    id: 3,
    name: "Aman Verma",
    location: "Bangalore",
    rating: 5,
    text: "Great carpentry work. Highly recommended MK Home Service.",
    avatar: unknownPerson,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    location: "Bangalore",
    rating: 5,
    text: "The interior design team transformed my apartment. Exactly what I wanted!",
    avatar: unknownPerson
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Bangalore",
    rating: 5,
    text: "Reliable plumbing service. They fixed everything quickly without any mess.",
    avatar: unknownPerson,
  },
  {
    id: 6,
    name: "Ananya Iyer",
    location: "Bengaluru",
    rating: 5,
    text: "Wonderful experience with their deep cleaning service. Highly thorough.",
    avatar: unknownPerson,
  },
];

export default function HomeServiceFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir) => ({ zIndex: 0, x: dir < 0 ? 1000 : -1000, opacity: 0 })
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="w-full min-h-screen bg-white">
      {/* How It Works Section */}
      <section className="relative bg-white py-12 px-6 sm:px-12 lg:px-24 text-black overflow-hidden">
        {/* Modern "Small Box" Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px" 
          }} 
        />
        
        {/* Dot pattern overlay for extra texture */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "12px 12px"
          }} 
        />

        {/* Ambient Decorative Blobs with improved colors */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-indigo-100/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight text-[#0a1128]"
          >
            How It Works
          </motion.h2>
          <p className="text-center text-gray-600 font-medium mb-8">Our streamlined process ensures you receive reliable home services with ease and confidence.</p>
           */}
           <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#041448ff] mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-4xl mx-auto text-lg font-medium leading-relaxed"
            >
              A seamless journey from booking to completion for all your home maintenance needs.
            </motion.p>
          </div>
          <div className="relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-[40%] left-[10%] right-[10%] h-px border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className=" flex flex-col items-center justify-center p-8 h-full gap-6   transition-all duration-500 group">
                    <div className="relative">
                      <div className="absolute inset-0  rounded-full scale-0 group-hover:scale-110 transition-transform duration-500" />
                      <iframe 
                        src={step.lottieUrl} 
                        className="w-49 h-49 border-none pointer-events-none relative z-10" 
                        title={`Step ${step.id}`}
                      />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-[#D2AD27]/10 flex items-center justify-center">
                          <ClipboardCheck size={12} className="text-[#695200ff]" />
                        </div>
                        <span className="text-[#695200ff] text-[11px] font-bold tracking-[0.15em] uppercase">
                          STEP {step.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#003579] group-hover:text-blue-800 transition-colors">{step.title}</h3>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[200px]">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-15 px-6 sm:px-12 lg:px-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#021553ff] text-center sm:text-left">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2">
                <button onClick={prevSlide} className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
              {/* <button className="text-[#2563eb] font-semibold flex items-center gap-1 hover:underline text-sm md:text-base">
                View All Reviews <ChevronRight size={18} />
              </button> */}
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {visibleTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-4 border-blue-50"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-[#0a1128] text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={18} className="fill-[#fbbf24] text-[#fbbf24]" />
                      ))}
                    </div>
                    <p className="text-[#475569] leading-relaxed text-base font-medium italic">"{testimonial.text}"</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2.5 -mt-24 ">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === i ? "w-8 h-2.5 bg-[#2563eb]" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
