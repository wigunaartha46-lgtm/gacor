import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  Percent, 
  Flame, 
  Check 
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const WishlistPage: React.FC = () => {
  const { 
    games, 
    wishlistGameIds, 
    removeFromWishlist, 
    addToCart, 
    isInCart, 
    isOwned, 
    goToPage, 
    viewGameDetail, 
    formatDiscountPrice 
  } = useGameHub();

  const [sortBy, setSortBy] = useState<'discount' | 'priceAsc' | 'name'>('discount');
  const [discountOnly, setDiscountOnly] = useState(false);

  const wishlistGames = games
    .filter(g => wishlistGameIds.includes(g.id))
    .filter(g => !discountOnly || g.discount > 0)
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'priceAsc') {
        const pA = a.price * (1 - a.discount / 100);
        const pB = b.price * (1 - b.discount / 100);
        return pA - pB;
      }
      return a.title.localeCompare(b.title);
    });

  const discountedCount = games.filter(g => wishlistGameIds.includes(g.id) && g.discount > 0).length;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-pink-500/20 border border-pink-500/40 rounded-xl text-pink-400">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              Your Wishlist ({wishlistGameIds.length})
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Keep track of games you want to play. Get instant alerts when prices drop!
            </p>
          </div>
        </div>

        {/* Price Drop Alert Pill if on sale */}
        {discountedCount > 0 && (
          <div className="bg-[#a4d007]/20 border border-[#a4d007]/40 px-3.5 py-2 rounded-xl flex items-center space-x-2 text-xs text-[#a4d007] font-semibold">
            <Tag className="w-4 h-4" />
            <span>{discountedCount} {discountedCount === 1 ? 'game is' : 'games are'} currently on sale!</span>
          </div>
        )}
      </div>

      {/* Control bar */}
      {wishlistGameIds.length > 0 && (
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow">
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
              <input 
                type="checkbox" 
                checked={discountOnly} 
                onChange={(e) => setDiscountOnly(e.target.checked)}
                className="rounded bg-[#171a21] border-[#2a475e] text-[#66c0f4] focus:ring-0" 
              />
              <span>Show Discounted Games Only ({discountedCount})</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#171a21] border border-[#2a475e] rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="discount">Highest Discount</option>
              <option value="priceAsc">Lowest Price</option>
              <option value="name">Game Title</option>
            </select>
          </div>
        </div>
      )}

      {/* Wishlist Items List */}
      {wishlistGames.length > 0 ? (
        <div className="space-y-3">
          {wishlistGames.map(game => {
            const priceInfo = formatDiscountPrice(game.price, game.discount);
            const owned = isOwned(game.id);
            const inCart = isInCart(game.id);

            return (
              <div
                key={game.id}
                className="bg-[#1b2838] border border-[#2a475e]/70 hover:border-[#66c0f4]/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow transition-all"
              >
                {/* Left: Thumbnail & Details */}
                <div 
                  onClick={() => viewGameDetail(game.id)}
                  className="flex items-center space-x-4 w-full sm:w-auto cursor-pointer group"
                >
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-24 h-28 sm:w-28 sm:h-20 object-cover rounded-lg border border-[#2a475e] shadow group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-[#66c0f4] transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{game.tagline}</p>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                      <span className="text-emerald-400 font-semibold">{game.ratingText} ({game.ratingScore}%)</span>
                      <span>•</span>
                      <span>{game.genres.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing, Add to Cart, Remove */}
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
                          <span className="text-sm font-black text-white">{priceInfo.final}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-white">{priceInfo.original}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {owned ? (
                      <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Owned
                      </span>
                    ) : inCart ? (
                      <span className="text-xs text-[#66c0f4] font-bold bg-[#66c0f4]/20 border border-[#66c0f4]/30 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> In Cart
                      </span>
                    ) : (
                      <button
                        onClick={() => addToCart(game.id)}
                        className="px-3.5 py-1.5 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-xs rounded-lg flex items-center space-x-1.5 shadow cursor-pointer transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    )}

                    <button
                      onClick={() => removeFromWishlist(game.id)}
                      className="p-2 text-gray-400 hover:text-rose-400 hover:bg-[#171a21] rounded-lg transition-colors cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-12 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#171a21] flex items-center justify-center text-pink-400/60">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Wishlist is Empty</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Browse our game catalog and click the heart icon on any game you're interested in. We'll track sales and notify you of discounts!
          </p>
          <button
            onClick={() => goToPage('catalog')}
            className="mt-2 px-6 py-2.5 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-colors inline-flex items-center space-x-2"
          >
            <span>Explore Games Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
