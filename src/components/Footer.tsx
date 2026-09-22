import React from 'react';
import { Gamepad2, ShieldCheck, Heart, Sparkles, Monitor, Layers, Apple } from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const Footer: React.FC = () => {
  const { goToPage, games } = useGameHub();

  return (
    <footer className="bg-[#171a21] border-t border-[#2a475e] text-xs text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-black text-lg tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1b2838] to-[#66c0f4] flex items-center justify-center shadow border border-[#66c0f4]/50">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span>GAC<span className="text-[#66c0f4]">OR</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The premier digital game distribution platform. Instant keys, cloud library sync, automatic updates, and player reviews.
            </p>
            <div className="flex items-center space-x-2 pt-1 text-gray-300">
              <span title="Windows"><Monitor className="w-4 h-4" /></span>
              <span title="macOS"><Apple className="w-4 h-4" /></span>
              <span title="Steam Deck / Linux"><Layers className="w-4 h-4" /></span>
            </div>
          </div>

          {/* Store Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Store &amp; Catalog</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => goToPage('store')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Featured &amp; Recommended
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('catalog')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Full Catalog &amp; Genres
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('wishlist')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Special Offers &amp; Discounts
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('community')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Community Hub &amp; Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Player Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => goToPage('library')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Personal Game Library
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('cart')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  Shopping Cart &amp; Checkout
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('profile')} className="hover:text-[#66c0f4] transition-colors cursor-pointer">
                  User Profile &amp; Preferences
                </button>
              </li>
              <li>
                <button onClick={() => goToPage('admin')} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Trust & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Certified Secure Payments</h4>
            <p className="text-xs text-gray-400">
              Supporting QRIS, GoPay, OVO, DANA, BCA, Mandiri, and Visa/Mastercard with instant digital delivery.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="bg-[#1b2838] border border-[#2a475e] px-2.5 py-1 rounded text-white">QRIS</span>
              <span className="bg-[#1b2838] border border-[#2a475e] px-2.5 py-1 rounded text-emerald-400">E-Wallet</span>
              <span className="bg-[#1b2838] border border-[#2a475e] px-2.5 py-1 rounded text-amber-300">Bank VA</span>
              <span className="bg-[#1b2838] border border-[#2a475e] px-2.5 py-1 rounded text-purple-300">Cards</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2a475e]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 Gacor Corporation. All digital rights, logos, and trademarks belong to their respective publishers.</p>
          <div className="flex space-x-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Legal Terms</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Gacor Subscriber Agreement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
