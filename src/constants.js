/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { img } from 'motion/react-client';
import homeServiceImage from './assets/home-service-logo.jpg';
import cleaningServiceImage from './assets/cleaning-service.jpg';
import allServices from './assets/all-services.jpg';


export const CATEGORIES = [
  //  {
  //   id: 'all-services',
  //   name: 'All Services',
  //   icon: 'Wrench',
  //   img: allServices,
  //   color: 'bg-accent/10 text-accent',
  // },
  {
    id: 'home-maintenance',
    name: 'Home Maintenance',
    icon: 'Wrench',
    img: homeServiceImage,
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    icon: 'Brush',
    img: cleaningServiceImage,
    color: 'bg-primary/5 text-primary',
  },
];

export const HOME_CATEGORIES = [
   {
    id: 'all-services',
    name: 'All Services',
    icon: 'Wrench',
    img: allServices,
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'home-maintenance',
    name: 'Home Maintenance',
    icon: 'Wrench',
    img: homeServiceImage,
    color: 'bg-gold/10 text-accent',
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    icon: 'Brush',
    img: cleaningServiceImage,
    color: 'bg-primary/5 text-primary',
  },
];

export const FEATURED_SERVICES = [
  // Home Maintenance
  {
    id: 'painting',
    name: 'Professional Painting',
    description: 'Expert wall painting with premium finishes.',
    price: 4999,
    rating: 4.9,
    reviews: 450,
    image: 'https://plus.unsplash.com/premium_photo-1683120897865-b09acb266810?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home Maintenance'
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    description: 'Fixing leaks, blockages and installations.',
    price: 299,
    rating: 4.7,
    reviews: 1200,
    image: 'https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home Maintenance'
  },
  {
    id: 'carpenter',
    name: 'Carpenter Services',
    description: 'Furniture repair and custom woodwork.',
    price: 399,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    category: 'Home Maintenance'
  },

  // Cleaning Services -> Bathroom Cleaning
  {
    id: 'bathroom-deep-cleaning',
    name: 'Bathroom Deep Cleaning',
    description: 'Intense sanitization of tiles, fixtures and floors.',
    price: 599,
    rating: 4.6,
    reviews: 560,
    image: 'https://images.pexels.com/photos/4098764/pexels-photo-4098764.jpeg?_gl=1*bor7ah*_ga*MTIzMDMzMjI2Ni4xNzc0NTA0NzU2*_ga_8JE65Q40S6*czE3NzY3NTQ0OTQkbzQkZzEkdDE3NzY3NTUxMjMkajQwJGwwJGgw',
    category: 'Cleaning Services',
    subcategory: 'Bathroom Cleaning'
  },
  {
    id: 'bathroom-machine-cleaning',
    name: 'Bathroom Cleaning with Machine',
    description: 'Deep scrubbing using industrial machines.',
    price: 899,
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1776585617123-84cb50100bd0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cleaning Services',
    subcategory: 'Bathroom Cleaning'
  },

  // Cleaning Services -> Deep Cleaning
  {
    id: 'vacant-villa-deep-cleaning',
    name: 'Vacant Villa Deep Cleaning (1/2/3/4BHK)',
    description: 'Empty villa thorough cleaning before move-in.',
    price: 4999,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.pexels.com/photos/6195288/pexels-photo-6195288.jpeg?_gl=1*1h9ldaw*_ga*MTIzMDMzMjI2Ni4xNzc0NTA0NzU2*_ga_8JE65Q40S6*czE3NzY3NTQ0OTQkbzQkZzEkdDE3NzY3NTUzNDgkajYwJGwwJGgw',
    category: 'Cleaning Services',
    subcategory: 'Deep Cleaning'
  },
  {
    id: 'occupied-villa-deep-cleaning',
    name: 'Occupied Villa Deep Cleaning (1/2/3/4BHK)',
    description: 'Comprehensive cleaning for lived-in villas.',
    price: 5499,
    rating: 4.8,
    reviews: 180,
    image: 'https://images.pexels.com/photos/6197108/pexels-photo-6197108.jpeg?_gl=1*upahxe*_ga*MTIzMDMzMjI2Ni4xNzc0NTA0NzU2*_ga_8JE65Q40S6*czE3NzY3NTQ0OTQkbzQkZzEkdDE3NzY3NTU1NDMkajU3JGwwJGgw',
    category: 'Cleaning Services',
    subcategory: 'Deep Cleaning'
  },
  {
    id: 'vacant-house-deep-cleaning',
    name: 'Vacant House Deep Cleaning (1/2/3/4BHK)',
    description: 'Thorough cleaning for empty apartments/houses.',
    price: 2999,
    rating: 4.7,
    reviews: 430,
    image: 'https://img.freepik.com/premium-photo/cleaning-workers-doing-general-cleaning-apartment_274679-58032.jpg',
    category: 'Cleaning Services',
    subcategory: 'Deep Cleaning'
  },
  {
    id: 'occupied-house-deep-cleaning',
    name: 'Occupied House Deep Cleaning (1/2/3/4BHK)',
    description: 'Deep disinfection for currently lived-in homes.',
    price: 3499,
    rating: 4.6,
    reviews: 610,
    image: 'https://plus.unsplash.com/premium_photo-1661719302438-acc6c78fa001?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cleaning Services',
    subcategory: 'Deep Cleaning'
  },
  {
    id: 'duplex-cleaning',
    name: 'Duplex Vacant/Occupied House Cleaning',
    description: 'Specialized split-level home deep cleaning.',
    price: 6999,
    rating: 4.9,
    reviews: 95,
    image: 'https://cdn.pixabay.com/photo/2025/06/16/12/52/cleaning-services-9663247_1280.jpg',
    category: 'Cleaning Services',
    subcategory: 'Deep Cleaning'
  },

  // Cleaning Services -> Kitchen Cleaning
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning (1/2/3)',
    description: 'Degreasing cabinets, tiles and chimney.',
    price: 1299,
    rating: 4.5,
    reviews: 280,
    image: 'https://img.freepik.com/free-photo/young-woman-cleaning-kitchen-furniture-rubber-gloves_651396-2883.jpg',
    category: 'Cleaning Services',
    subcategory: 'Kitchen Cleaning'
  },

  // Cleaning Services -> Sofa Cleaning
  {
    id: 'sofa-cleaning-fabric-leather',
    name: 'Sofa Cleaning (Fabric/Leather)',
    description: 'Dry vacuuming and shampooing for all sofa types.',
    price: 799,
    rating: 4.7,
    reviews: 390,
    image: 'https://images.pexels.com/photos/4098317/pexels-photo-4098317.jpeg?_gl=1*roqwzr*_ga*MTIzMDMzMjI2Ni4xNzc0NTA0NzU2*_ga_8JE65Q40S6*czE3NzY3NTQ0OTQkbzQkZzEkdDE3NzY3NTU0OTkkajQxJGwwJGgw',
    category: 'Cleaning Services',
    subcategory: 'Sofa Cleaning'
  },
];

export const PROVIDERS = [
  {
    id: 'p1',
    name: 'Bangalore Home Service Pro',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    jobs: 4500,
    experience: '8+ Years',
    verified: true,
  },
];

export const REVIEWS = [
  {
    id: 'r1',
    user: 'Deepak Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    date: '2 days ago',
    comment: 'Exceptional service! The team was professional, punctual, and did a thorough job. Highly recommended for full home deep cleaning.',
  },
  {
    id: 'r2',
    user: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    rating: 4,
    date: '1 week ago',
    comment: 'Great experience overall. The technician was knowledgeable and fixed our AC issues quickly. Will use their services again.',
  },
];
