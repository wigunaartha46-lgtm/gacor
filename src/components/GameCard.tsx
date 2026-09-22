import React from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Check, 
  Monitor, 
  Apple, 
  Layers, 
  Flame, 
  Clock 
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  layout?: 'grid' | 'list';
}

export const GameCard: React.FC<GameCardProps> = ({ game, layout = 'grid' }) => {
  const { 
    viewGameDetail, 
    addToCart, 
    isInCart, 
    isOwned, 
    toggleWishlist, 
    isInWishlist, 
    formatDiscountPrice 
  } = useGameHub();

  const priceInfo = formatDiscountPrice(game.price, game.discount);
  const owned = isOwned(game.id);
  const inCart = isInCart(game.id);
  const inWishlist = isInWishlist(game.id);

  if (layout === 'list') {
    return (
      <div className="group bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e]/70 hover:border-[#66c0f4]/50 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200">
        {/* Left: Image & Title */}
        <div 
          onClick={() => viewGameDetail(game.id)}
          className="flex items-center space-x-3 w-full sm:w-auto cursor-pointer"
        >
          <img 
            src={game.coverImage} 
            alt={game.title} 
            className="w-20 h-24 sm:w-28 sm:h-20 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-[#66c0f4] transition-colors truncate">
              {game.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{game.tagline}</p>
            <div className="flex items-center space-x-2 mt-1.5 text-xs text-gray-400">
              <span className="text-emerald-400 font-medium">{game.ratingText} ({game.ratingScore}%)</span>
              <span>•</span>
              <span className="truncate">{game.genres.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Right: Pricing & Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2a475e]/40">
          {/* Price */}
          <div className="text-right">
            {priceInfo.isFree ? (
              <span className="text-sm font-black text-emerald-400">Free to Play</span>
            ) : game.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="bg-[#a4d007] text-gray-950 font-black text-xs px-2 py-0.5 rounded font-mono">
                  -{game.discount}%
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-gray-400 line-through">{priceInfo.original}</span>
                  <span className="text-sm font-bold text-white">{priceInfo.final}</span>
                </div>
              </div>
            ) : (
              <span className="text-sm font-bold text-white">{priceInfo.original}</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => toggleWishlist(game.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                inWishlist
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                  : 'bg-[#171a21] text-gray-400 hover:text-white border-[#2a475e]'
              }`}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {owned ? (
              <span className="px-3 py-1.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Owned
              </span>
            ) : inCart ? (
              <span className="px-3 py-1.5 bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/30 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Cart
              </span>
            ) : (
              <button
                onClick={() => addToCart(game.id)}
                className="px-3 py-1.5 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-xs rounded-lg flex items-center space-x-1 transition-all cursor-pointer shadow"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="group flex flex-col bg-[#1b2838] hover:bg-[#202b3b] border border-[#2a475e]/70 hover:border-[#66c0f4]/60 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image Container */}
      <div 
        onClick={() => viewGameDetail(game.id)}
        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer"
      >
        <img 
          src={game.coverImage} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <div className="flex gap-1">
            {game.isTopSeller && (
              <span className="bg-amber-500/90 text-gray-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                <Flame className="w-3 h-3" /> Top Seller
              </span>
            )}
            {game.isNewRelease && (
              <span className="bg-[#66c0f4]/90 text-gray-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                New
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(game.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              inWishlist 
                ? 'bg-pink-600 text-white shadow-lg' 
                : 'bg-black/50 text-white hover:bg-black/80 hover:text-pink-400'
            }`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Platform Icons overlay */}
        <div className="absolute bottom-2 left-2.5 flex items-center space-x-1.5 text-gray-300">
          {game.platforms.includes('Windows') && <span title="Windows"><Monitor className="w-3.5 h-3.5" /></span>}
          {game.platforms.includes('macOS') && <span title="macOS"><Apple className="w-3.5 h-3.5" /></span>}
          {game.platforms.includes('Linux') && <span title="Linux"><Layers className="w-3.5 h-3.5" /></span>}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => viewGameDetail(game.id)}
            className="font-bold text-white text-base leading-snug group-hover:text-[#66c0f4] transition-colors cursor-pointer line-clamp-1"
          >
            {game.title}
          </h3>

          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {game.tagline || game.description}
          </p>

          {/* Genre chips */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {game.genres.slice(0, 2).map(genre => (
              <span key={genre} className="text-[10px] font-medium bg-[#171a21] text-gray-300 px-2 py-0.5 rounded border border-[#2a475e]/60">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="mt-4 pt-3 border-t border-[#2a475e]/50 flex items-center justify-between">
          <div>
            {priceInfo.isFree ? (
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                Free to Play
              </span>
            ) : game.discount > 0 ? (
              <div className="flex items-center space-x-1.5">
                <span className="bg-[#a4d007] text-gray-950 font-black text-xs px-1.5 py-0.5 rounded font-mono">
                  -{game.discount}%
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 line-through">
                    {priceInfo.original}
                  </span>
                  <span className="text-sm font-black text-white">
                    {priceInfo.final}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm font-black text-white">
                {priceInfo.original}
              </span>
            )}
          </div>

          <div>
            {owned ? (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Check className="w-3 h-3" /> In Library
              </span>
            ) : inCart ? (
              <span className="text-[11px] font-bold text-[#66c0f4] bg-[#66c0f4]/20 border border-[#66c0f4]/30 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Check className="w-3 h-3" /> In Cart
              </span>
            ) : (
              <button
                onClick={() => addToCart(game.id)}
                className="px-3 py-1.5 rounded-lg bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-xs flex items-center space-x-1 shadow transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
