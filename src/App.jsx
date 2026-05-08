// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Services from './pages/Services';
// import ServiceDetail from './pages/ServiceDetail';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Register from './pages/Register';

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/services" element={<Services />} />
//       <Route path="/service/:id" element={<ServiceDetail />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   );
// }

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Cart from './pages/Cart';
import CheckStatus from './pages/CheckStatus';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingSlot from "./components/services/BookingSlot";

export default function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // remove this line if you don't want smooth scroll
    });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/booking/:serviceId" element={<BookingSlot />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/check-status" element={<CheckStatus />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}