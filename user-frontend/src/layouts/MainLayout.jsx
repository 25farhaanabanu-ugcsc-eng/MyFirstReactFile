import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { CheckCircle2, Heart } from 'lucide-react';

export default function MainLayout() {
  const { pathname } = useLocation();
  const { cartToast } = useCart();
  const { wishlistToast } = useWishlist();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />

      {/* Cart Toast Notification */}
      {cartToast && (
        <div className="toast-notification">
          <CheckCircle2 size={20} color="var(--color-secondary)" />
          <span>{cartToast}</span>
        </div>
      )}

      {/* Wishlist Toast Notification */}
      {wishlistToast && !cartToast && (
        <div className="toast-notification">
          <Heart size={20} fill="var(--color-secondary)" color="var(--color-secondary)" />
          <span>{wishlistToast}</span>
        </div>
      )}
    </div>
  );
}
