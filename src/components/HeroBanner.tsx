import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Monitor, 
  Apple, 
  Layers, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { Game } from '../types';

export const HeroBanner: React.FC = () => {
  const { 
    games, 
    viewGameDetail, 
    addToCart, 
    isInCart, 
    isOwned, 
    toggleWishlist, 
    isInWishlist, 
    formatDiscountPrice 
  } = useGameHub();

  const featuredGames = games.filter(g => g.isFeatured || g.discount >= 30).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate banner every 7 seconds
  useEffect(() => {
    if (featuredGames.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  if (featuredGames.length === 0) return null;

  const current = featuredGames[currentIndex];
  const priceInfo = formatDiscountPrice(current.price, current.discount);
  const owned = isOwned(current.id);
  const inCart = isInCart(current.id);
  const inWishlist = isInWishlist(current.id);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#1b2838] border border-[#2a475e]/80 shadow-2xl">
      {/* Background Ambience with blur and vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter blur-xl opacity-30 scale-105"
        style={{ backgroundImage: `url(${current.bannerImage || current.coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#171a21] via-[#171a21]/90 to-transparent" />

      {/* Hero Layout: Content + Media + Thumbnails */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[440px] items-stretch">
        
        {/* Left Column: Big Game Info */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
          <div>
            {/* Badges bar */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/30">
                <Flame className="w-3.5 h-3.5" />
                Featured &amp; Recommended
              </span>
              {current.isDiscountEvent && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Special Event Sale
                </span>
              )}
            </div>

            {/* Title */}
            <h1 
              onClick={() => viewGameDetail(current.id)}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight hover:text-[#66c0f4] cursor-pointer transition-colors"
            >
              {current.title}
            </h1>

            {/* Tagline */}
            <p className="mt-3 text-sm sm:text-base text-gray-300 line-clamp-2 max-w-xl">
              {current.tagline || current.description}
            </p>

            {/* Metadata Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-1 bg-[#171a21]/70 px-2.5 py-1 rounded-md border border-[#2a475e]/60">
                <span className="text-gray-400">Rating:</span>
                <span className="text-emerald-400 font-bold">{current.ratingText}</span>
                <span className="text-gray-400">({current.ratingScore}%)</span>
              </div>
              <div className="flex items-center gap-1 bg-[#171a21]/70 px-2.5 py-1 rounded-md border border-[#2a475e]/60">
                <span className="text-gray-400">Developer:</span>
                <span className="text-white font-medium">{current.developer}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171a21]/70 px-2.5 py-1 rounded-md border border-[#2a475e]/60">
                {current.platforms.includes('Windows') && <span title="Windows"><Monitor className="w-3.5 h-3.5 text-gray-300" /></span>}
                {current.platforms.includes('macOS') && <span title="macOS"><Apple className="w-3.5 h-3.5 text-gray-300" /></span>}
                {current.platforms.includes('Linux') && <span title="Linux"><Layers className="w-3.5 h-3.5 text-gray-300" /></span>}
              </div>
            </div>

            {/* Genre chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {current.genres.map(g => (
                <span key={g} className="text-[11px] font-medium bg-[#202b3b] text-gray-300 px-2 py-0.5 rounded border border-[#2a475e]">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Action CTA */}
          <div className="mt-8 pt-4 border-t border-[#2a475e]/60 flex flex-wrap items-center justify-between gap-4">
            {/* Price Tag */}
            <div className="flex items-center space-x-3">
              {priceInfo.isFree ? (
                <span className="text-2xl font-black text-emerald-400">Free to Play</span>
              ) : current.discount > 0 ? (
                <div className="flex items-center space-x-2">
                  <span className="bg-[#a4d007] text-gray-950 font-black text-sm px-2.5 py-1 rounded-md shadow font-mono">
                    -{current.discount}%
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      {priceInfo.original}
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {priceInfo.final}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xl sm:text-2xl font-black text-white">
                  {priceInfo.original}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => toggleWishlist(current.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  inWishlist
                    ? 'bg-pink-500/20 text-pink-400 border-pink-500/40 hover:bg-pink-500/30'
                    : 'bg-[#202b3b] text-gray-300 border-[#2a475e] hover:text-white hover:bg-[#2a475e]'
                }`}
                title={inWishlist ? 'In your Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>

              {owned ? (
                <button
                  onClick={() => viewGameDetail(current.id)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-sm flex items-center space-x-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>In Library</span>
                </button>
              ) : inCart ? (
                <button
                  onClick={() => viewGameDetail(current.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/40 font-bold text-sm flex items-center space-x-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>In Cart</span>
                </button>
              ) : (
                <button
                  id="hero-add-cart-btn"
                  onClick={() => addToCart(current.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-sm flex items-center space-x-2 shadow-lg shadow-[#a4d007]/20 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              )}

              <button
                id="hero-view-details-btn"
                onClick={() => viewGameDetail(current.id)}
                className="px-4 py-2.5 rounded-xl bg-[#202b3b] hover:bg-[#2a475e] text-white font-semibold text-sm border border-[#2a475e] flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Media & Thumbnails Sidebar */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2a475e]/60 bg-[#171a21]/50">
          {/* Main Visual Preview */}
          <div 
            onClick={() => viewGameDetail(current.id)}
            className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#2a475e] group cursor-pointer"
          >
            <img 
              src={current.bannerImage || current.coverImage} 
              alt={current.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-gray-200">Click to explore details</span>
              <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] text-gray-300">
                Released {current.releaseDate}
              </span>
            </div>
          </div>

          {/* Screenshot thumbnails preview */}
          {current.screenshots && current.screenshots.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {current.screenshots.slice(0, 3).map((screen, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-[#2a475e]/60">
                  <img src={screen} alt="Preview" className="w-full h-full object-cover hover:opacity-90" />
                </div>
              ))}
            </div>
          )}

          {/* Featured Marquee Selector Thumbnails */}
          <div className="mt-4 pt-3 border-t border-[#2a475e]/40">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Featured Spotlight</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1))}
                  className="p-1 rounded bg-[#202b3b] hover:bg-[#2a475e] text-white cursor-pointer"
                  aria-label="Previous featured"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono">{currentIndex + 1} / {featuredGames.length}</span>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredGames.length)}
                  className="p-1 rounded bg-[#202b3b] hover:bg-[#2a475e] text-white cursor-pointer"
                  aria-label="Next featured"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {featuredGames.map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative aspect-[16/10] rounded-md overflow-hidden border transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? 'border-[#66c0f4] ring-2 ring-[#66c0f4]/40 scale-105' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={g.coverImage} alt={g.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
