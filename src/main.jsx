import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadFromLocalStorage } from './store/bookingSlice';
import App from './App.jsx';
import './index.css';

// Rehydrate state before first render
store.dispatch(loadFromLocalStorage());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
