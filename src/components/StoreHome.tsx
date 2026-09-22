import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Tag, 
  TrendingUp, 
  Clock, 
  Compass, 
  ArrowRight, 
  Layers, 
  Percent, 
  Gift,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { HeroBanner } from './HeroBanner';
import { GameCard } from './GameCard';

const CATEGORIES = [
  { name: 'Action', icon: '⚔️', desc: 'Fast kinetic combat & high adrenaline' },
  { name: 'RPG', icon: '🛡️', desc: 'Character progression & epic narratives' },
  { name: 'Strategy', icon: '🧠', desc: '4X empires, tactics & fleet warfare' },
  { name: 'Simulation', icon: '🚜', desc: 'Farming, life sims & flight dynamics' },
  { name: 'Racing', icon: '🏎️', desc: 'Arcade drifting & precision touge' },
  { name: 'Horror', icon: '👁️', desc: 'Psychological terror & survival' },
  { name: 'Indie', icon: '💎', desc: 'Innovative artistic masterpieces' },
  { name: 'Multiplayer', icon: '🌐', desc: 'Co-op campaigns & competitive PvP' }
];

export const StoreHome: React.FC = () => {
  const { games, goToPage, setSelectedGenre, formatDiscountPrice } = useGameHub();

  const [activeTab, setActiveTab] = useState<'topSellers' | 'newReleases' | 'freeToPlay'>('topSellers');

  // Filter games based on criteria
  const featuredGames = games.filter(g => g.isFeatured);
  const discountGames = games.filter(g => g.discount > 0);
  const topSellers = games.filter(g => g.isTopSeller || g.ratingScore >= 92);
  const newReleases = games.filter(g => g.isNewRelease || new Date(g.releaseDate).getFullYear() >= 2025);
  const freeToPlay = games.filter(g => g.isFreeToPlay || g.price === 0);

  const displayedTabGames = activeTab === 'topSellers' 
    ? topSellers 
    : activeTab === 'newReleases' 
      ? newReleases 
      : freeToPlay;

  const handleCategoryClick = (categoryName: string) => {
    setSelectedGenre(categoryName);
    goToPage('catalog');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Flagship Hero Banner Carousel */}
      <section id="homepage-hero-section">
        <HeroBanner />
      </section>

      {/* 2. Special Discounts & Limited Events Banner */}
      <section id="discounts-events-section" className="relative rounded-2xl bg-gradient-to-r from-[#1b2838] via-[#202b3b] to-[#171a21] border border-[#66c0f4]/30 p-6 shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#66c0f4]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#2a475e]/60 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#a4d007]/20 border border-[#a4d007]/40 rounded-xl text-[#a4d007]">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  Special Discounts &amp; Publisher Events
                </h2>
                <span className="bg-[#a4d007] text-gray-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                  Live Deals
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Save up to 50% on award-winning games. Promo resets daily!
              </p>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center space-x-2 bg-[#171a21] px-4 py-2 rounded-xl border border-[#2a475e]">
            <Clock className="w-4 h-4 text-[#66c0f4] animate-pulse" />
            <span className="text-xs text-gray-300">Deals end in:</span>
            <span className="text-xs font-mono font-bold text-amber-300">23h : 42m : 18s</span>
          </div>
        </div>

        {/* Discount Deals Carousel/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {discountGames.slice(0, 4).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setSelectedGenre(null);
              goToPage('catalog');
            }}
            className="text-xs font-semibold text-[#66c0f4] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>See all {discountGames.length} discounted titles in Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Featured & Recommended Games Grid */}
      <section id="featured-recommended-section">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-6 bg-[#66c0f4] rounded-sm" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Featured &amp; Recommended
            </h2>
          </div>
          <button
            onClick={() => goToPage('catalog')}
            className="text-xs font-semibold text-gray-400 hover:text-[#66c0f4] flex items-center space-x-1 cursor-pointer"
          >
            <span>Browse All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGames.slice(0, 6).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 4. Tabbed Filter: Top Sellers / New Releases / Free to Play */}
      <section id="tabbed-store-section" className="bg-[#1b2838]/80 border border-[#2a475e]/70 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a475e] pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('topSellers')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'topSellers'
                  ? 'bg-[#66c0f4] text-gray-950 shadow-md shadow-[#66c0f4]/20'
                  : 'text-gray-300 hover:text-white hover:bg-[#202b3b]'
              }`}
            >
              Top Sellers
            </button>
            <button
              onClick={() => setActiveTab('newReleases')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'newReleases'
                  ? 'bg-[#66c0f4] text-gray-950 shadow-md shadow-[#66c0f4]/20'
                  : 'text-gray-300 hover:text-white hover:bg-[#202b3b]'
              }`}
            >
              New Releases
            </button>
            <button
              onClick={() => setActiveTab('freeToPlay')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'freeToPlay'
                  ? 'bg-[#66c0f4] text-gray-950 shadow-md shadow-[#66c0f4]/20'
                  : 'text-gray-300 hover:text-white hover:bg-[#202b3b]'
              }`}
            >
              Free-to-Play
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Showing {displayedTabGames.length} curated entries
          </div>
        </div>

        {/* List Layout for Quick Discovery */}
        <div className="space-y-3">
          {displayedTabGames.map(game => (
            <GameCard key={game.id} game={game} layout="list" />
          ))}
        </div>
      </section>

      {/* 5. Browse by Category & Genre Cards */}
      <section id="categories-browse-section">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-2.5 h-6 bg-purple-500 rounded-sm" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Browse by Genre &amp; Category
            </h2>
          </div>
          <button
            onClick={() => goToPage('catalog')}
            className="text-xs font-semibold text-gray-400 hover:text-[#66c0f4] flex items-center space-x-1 cursor-pointer"
          >
            <span>Full Catalog Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="p-4 rounded-xl bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e] hover:border-[#66c0f4] text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#66c0f4] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Why GameHub Banner / Platform Guarantees */}
      <section className="bg-gradient-to-br from-[#1b2838] to-[#171a21] border border-[#2a475e]/80 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#66c0f4]/10 border border-[#66c0f4]/30 rounded-xl text-[#66c0f4]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-gray-400 mt-1">
                Purchased games are instantly added to your personal library and ready for one-click installation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#a4d007]/10 border border-[#a4d007]/30 rounded-xl text-[#a4d007]">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Best Price Guarantee</h4>
              <p className="text-xs text-gray-400 mt-1">
                Daily publisher discounts, seasonal flash sales, and regional currency conversion support.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Community Powered</h4>
              <p className="text-xs text-gray-400 mt-1">
                Honest player reviews, verified gameplay hours, mod guides, and active discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
