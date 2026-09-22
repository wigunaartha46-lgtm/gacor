import React, { useState, useRef, useEffect } from 'react';
import { 
  Gamepad2, 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { NavigationPage } from '../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    goToPage,
    viewGameDetail,
    searchQuery,
    setSearchQuery,
    games,
    cart,
    wishlistGameIds,
    currentUser,
    logout,
    loginAsDemoUser,
    loginAsAdmin,
    setAuthModalOpen,
    currency,
    setCurrency,
    currentlyPlayingGameId,
    stopPlayingGame
  } = useGameHub();

  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Filter search suggestions
  const searchResults = searchQuery.trim().length > 0 
    ? games.filter(g => 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
        g.developer.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: NavigationPage) => {
    goToPage(page);
    setMobileMenuOpen(false);
  };

  const handleSelectGame = (gameId: string) => {
    viewGameDetail(gameId);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const activePlayingGame = currentlyPlayingGameId 
    ? games.find(g => g.id === currentlyPlayingGameId) 
    : null;

  return (
    <header className="sticky top-0 z-50 bg-[#171a21]/95 backdrop-blur-md border-b border-[#2a475e]/60 shadow-xl text-white">
      {/* Active Game Playing Bar if running */}
      {activePlayingGame && (
        <div className="bg-gradient-to-r from-emerald-950 via-[#1b2838] to-emerald-950 border-b border-emerald-500/40 px-4 py-1.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">Playing: {activePlayingGame.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => goToPage('library')}
              className="text-gray-300 hover:text-white underline text-xs cursor-pointer"
            >
              View in Library
            </button>
            <button
              onClick={stopPlayingGame}
              className="px-2.5 py-0.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded text-xs font-medium cursor-pointer transition-colors"
            >
              Exit Game
            </button>
          </div>
        </div>
      )}

      {/* Main Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <button 
              id="gacor-logo-btn"
              onClick={() => handleNavClick('store')}
              className="flex items-center space-x-3 group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#66c0f4] to-[#1976d2] p-0.5 shadow-lg shadow-[#66c0f4]/20 group-hover:shadow-[#66c0f4]/40 transition-all duration-300">
                <div className="w-full h-full bg-[#171a21] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-[#66c0f4] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-xl tracking-wider text-white flex items-center gap-1">
                  GAC<span className="text-[#66c0f4]">OR</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest -mt-1 font-medium">Digital Store</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                id="nav-link-store"
                onClick={() => handleNavClick('store')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activePage === 'store'
                    ? 'text-white bg-[#1b2838] border border-[#66c0f4]/30 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-[#1b2838]/60'
                }`}
              >
                Store
              </button>
              <button
                id="nav-link-catalog"
                onClick={() => handleNavClick('catalog')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activePage === 'catalog'
                    ? 'text-white bg-[#1b2838] border border-[#66c0f4]/30 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-[#1b2838]/60'
                }`}
              >
                Browse Catalog
              </button>
              <button
                id="nav-link-community"
                onClick={() => handleNavClick('community')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activePage === 'community'
                    ? 'text-white bg-[#1b2838] border border-[#66c0f4]/30 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-[#1b2838]/60'
                }`}
              >
                Community
              </button>
              <button
                id="nav-link-library"
                onClick={() => handleNavClick('library')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activePage === 'library'
                    ? 'text-white bg-[#1b2838] border border-[#66c0f4]/30 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-[#1b2838]/60'
                }`}
              >
                My Library
              </button>
              <button
                id="nav-link-about"
                onClick={() => handleNavClick('about')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activePage === 'about'
                    ? 'text-white bg-[#1b2838] border border-[#66c0f4]/30 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-[#1b2838]/60'
                }`}
              >
                About
              </button>
            </nav>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="flex-1 max-w-xs lg:max-w-md relative hidden sm:block" ref={searchRef}>
            <div className="relative">
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    goToPage('catalog');
                    setSearchFocused(false);
                  }
                }}
                placeholder="Search games, genres, developers..."
                className="w-full bg-[#1b2838] text-sm text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-[#2a475e] focus:border-[#66c0f4] focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>

            {/* Instant Search Suggestions Box */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#1b2838] border border-[#2a475e] rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-[#2a475e]/60 flex justify-between items-center text-xs text-gray-400 px-3">
                  <span>Quick Results</span>
                  <span>Press Enter to explore all</span>
                </div>
                <div className="divide-y divide-[#2a475e]/40 max-h-80 overflow-y-auto">
                  {searchResults.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => handleSelectGame(game.id)}
                      className="w-full p-2.5 flex items-center space-x-3 hover:bg-[#202b3b] transition-colors text-left cursor-pointer group"
                    >
                      <img 
                        src={game.coverImage} 
                        alt={game.title} 
                        className="w-12 h-14 object-cover rounded shadow"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#66c0f4] truncate">
                          {game.title}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center space-x-2 mt-0.5">
                          <span>{game.genres.slice(0, 2).join(', ')}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">{game.ratingText}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {game.discount > 0 ? (
                          <div className="flex flex-col items-end">
                            <span className="bg-[#a4d007] text-gray-950 font-black text-[10px] px-1.5 py-0.5 rounded font-mono">
                              -{game.discount}%
                            </span>
                            <span className="text-xs font-semibold text-white mt-0.5">
                              ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-white">
                            {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    goToPage('catalog');
                    setSearchFocused(false);
                  }}
                  className="w-full py-2 bg-[#202b3b] hover:bg-[#2a475e] text-center text-xs font-semibold text-[#66c0f4] transition-colors cursor-pointer"
                >
                  View all results in Catalog →
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Currency, Wishlist, Cart, User / Admin */}
          <div className="flex items-center space-x-3">
            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'IDR' : 'USD')}
              className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e] rounded-lg text-xs font-medium text-gray-300 cursor-pointer transition-colors"
              title="Switch display currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#66c0f4]" />
              <span>{currency}</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-btn-wishlist"
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 rounded-lg bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e] text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistGameIds.length > 0 ? 'text-pink-500 fill-pink-500/20' : ''}`} />
              {wishlistGameIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow">
                  {wishlistGameIds.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-btn-cart"
              onClick={() => handleNavClick('cart')}
              className="relative p-2 rounded-lg bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e] text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingCart className={`w-5 h-5 ${cart.length > 0 ? 'text-[#66c0f4]' : ''}`} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#66c0f4] text-gray-950 rounded-full text-[11px] font-black flex items-center justify-center shadow">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Admin Dashboard Direct Shortcut (if Admin) */}
            {currentUser?.role === 'admin' && (
              <button
                id="nav-btn-admin"
                onClick={() => handleNavClick('admin')}
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  activePage === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-[#1b2838] text-amber-400 border-amber-500/30 hover:bg-amber-500/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* User Profile / Auth Area */}
            {currentUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  id="nav-btn-profile-dropdown"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e] transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#66c0f4]/50"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-white max-w-[90px] truncate">
                    {currentUser.username}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#1b2838] border border-[#2a475e] rounded-xl shadow-2xl p-2 z-50 divide-y divide-[#2a475e]/50">
                    <div className="p-2">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{currentUser.username}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        currentUser.role === 'admin' 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/30'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          goToPage('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-200 hover:bg-[#202b3b] rounded-lg transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        <span>My Profile & Stats</span>
                      </button>
                      <button
                        onClick={() => {
                          goToPage('library');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-200 hover:bg-[#202b3b] rounded-lg transition-colors cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4 text-emerald-400" />
                        <span>My Games ({currentUser.gamesOwned.length})</span>
                      </button>
                      <button
                        onClick={() => {
                          goToPage('wishlist');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-200 hover:bg-[#202b3b] rounded-lg transition-colors cursor-pointer"
                      >
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span>Wishlist ({currentUser.wishlist.length})</span>
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            goToPage('admin');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-amber-400 hover:bg-[#202b3b] rounded-lg transition-colors cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                    </div>

                    {/* Switch role helper */}
                    <div className="py-1">
                      {currentUser.role === 'user' ? (
                        <button
                          onClick={() => {
                            loginAsAdmin();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[11px] text-amber-300 hover:bg-[#202b3b] rounded cursor-pointer"
                        >
                          ⚡ Switch to Admin View
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            loginAsDemoUser();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[11px] text-blue-300 hover:bg-[#202b3b] rounded cursor-pointer"
                        >
                          🎮 Switch to Gamer View
                        </button>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-400 hover:bg-[#202b3b] rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-btn-login"
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              id="nav-btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#1b2838] border border-[#2a475e] text-gray-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171a21] border-b border-[#2a475e] px-4 pt-2 pb-4 space-y-2">
          {/* Mobile Search Input */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  goToPage('catalog');
                  setMobileMenuOpen(false);
                }
              }}
              placeholder="Search games, genres..."
              className="w-full bg-[#1b2838] text-sm text-white placeholder-gray-400 pl-9 pr-3 py-2 rounded-lg border border-[#2a475e]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => handleNavClick('store')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b2838]"
          >
            Store
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b2838]"
          >
            Browse Catalog
          </button>
          <button
            onClick={() => handleNavClick('community')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b2838]"
          >
            Community Hub
          </button>
          <button
            onClick={() => handleNavClick('library')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b2838]"
          >
            My Library
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b2838]"
          >
            About Gacor
          </button>
          
          <div className="pt-2 border-t border-[#2a475e]/60 flex items-center justify-between">
            <span className="text-xs text-gray-400">Display Currency</span>
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'IDR' : 'USD')}
              className="px-2.5 py-1 bg-[#1b2838] border border-[#2a475e] rounded text-xs text-gray-200"
            >
              {currency}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
