/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameHubProvider, useGameHub } from './context/GameHubContext';
import { Navbar } from './components/Navbar';
import { StoreHome } from './components/StoreHome';
import { GameCatalog } from './components/GameCatalog';
import { GameDetail } from './components/GameDetail';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { LibraryPage } from './components/LibraryPage';
import { CommunityPage } from './components/CommunityPage';
import { UserProfile } from './components/UserProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, notification } = useGameHub();

  const renderActivePage = () => {
    switch (activePage) {
      case 'store':
        return <StoreHome />;
      case 'catalog':
        return <GameCatalog />;
      case 'game-detail':
        return <GameDetail />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'library':
        return <LibraryPage />;
      case 'community':
        return <CommunityPage />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StoreHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#171a21] text-gray-200 flex flex-col font-sans selection:bg-[#66c0f4] selection:text-gray-950">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Floating Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b2838] border-2 border-[#66c0f4] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePage()}
      </main>

      {/* Global Modals */}
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <GameHubProvider>
      <MainContent />
    </GameHubProvider>
  );
}
