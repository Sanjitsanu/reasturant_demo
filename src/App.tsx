import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';
import { OrderPage } from './pages/OrderPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const { currentRoute } = useRestaurant();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/menu':
        return <MenuPage />;
      case '/reservation':
        return <ReservationPage />;
      case '/order':
        return <OrderPage />;
      case '/offers':
        return <OffersPage />;
      case '/about':
        return <AboutPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/contact':
        return <ContactPage />;
      case '/admin':
        return <AdminPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Sticky Navbar */}
      <Navbar />

      {/* Main Page Body with Smooth Transition */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global AI Assistant Floating Orb + Panel */}
      <AIAssistant />

      {/* Booking Modal */}
      <ReservationModal />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Food Customizer Detail Modal */}
      <ItemDetailModal />

      {/* Lead Concierge Modal */}
      <LeadCaptureModal />

      {/* Notification Toasts */}
      <ToastContainer />

      {/* Rich Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}
