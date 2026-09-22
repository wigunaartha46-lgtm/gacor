import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Tag, 
  Gift, 
  Check,
  CreditCard
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartDiscountTotal, 
    cartFinalTotal, 
    formatPrice, 
    formatDiscountPrice, 
    goToPage, 
    viewGameDetail,
    showNotification
  } = useGameHub();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GACOR20' || code === 'GAMEHUB20') {
      const discountVal = cartFinalTotal * 0.20;
      setVoucherDiscount(discountVal);
      setPromoApplied(true);
      showNotification(`Coupon ${code} applied: 20% extra discount!`);
    } else {
      showNotification('Invalid code. Try code: GACOR20');
    }
  };

  const finalCheckoutAmount = Math.max(0, cartFinalTotal - voucherDiscount);

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#66c0f4]/20 border border-[#66c0f4]/40 rounded-xl text-[#66c0f4]">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              Your Shopping Cart ({cart.length})
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Review your selected titles before completing purchase.
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-rose-400 underline cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map(item => {
              const game = item.game;
              const priceInfo = formatDiscountPrice(game.price, game.discount);

              return (
                <div
                  key={item.id}
                  className="bg-[#1b2838] border border-[#2a475e]/70 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow"
                >
                  {/* Left: Cover & Title */}
                  <div 
                    onClick={() => viewGameDetail(game.id)}
                    className="flex items-center space-x-4 w-full sm:w-auto cursor-pointer group"
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-20 h-24 sm:w-24 sm:h-16 object-cover rounded-lg border border-[#2a475e] shadow group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-[#66c0f4] transition-colors">
                        {game.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                        <span>Digital Download</span>
                        <span>•</span>
                        <span>Windows / Mac</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing & Remove */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-5 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#2a475e]/40">
                    <div className="text-right">
                      {priceInfo.isFree ? (
                        <span className="text-sm font-black text-emerald-400">Free</span>
                      ) : game.discount > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#a4d007] text-gray-950 font-black text-xs px-1.5 py-0.5 rounded font-mono">
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

                    <button
                      onClick={() => removeFromCart(game.id)}
                      className="p-2 text-gray-400 hover:text-rose-400 hover:bg-[#171a21] rounded-lg transition-colors cursor-pointer"
                      title="Remove from Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => goToPage('catalog')}
                className="text-xs font-semibold text-[#66c0f4] hover:text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping for More Games</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Promo Code Card */}
            <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-300">
                <Tag className="w-4 h-4 text-[#66c0f4]" />
                <span>Have a Promotion Code?</span>
              </div>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code (e.g. GACOR20)"
                  className="flex-1 bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#66c0f4]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#202b3b] hover:bg-[#2a475e] text-white text-xs font-bold rounded-xl border border-[#2a475e] cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoApplied && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Voucher GACOR20 applied (-20%)
                </p>
              )}
            </div>

            {/* Price Calculation Box */}
            <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-black text-white border-b border-[#2a475e] pb-3">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Items Subtotal:</span>
                  <span className="font-semibold text-white">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscountTotal > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Publisher Discounts:</span>
                    <span className="font-semibold">-{formatPrice(cartDiscountTotal)}</span>
                  </div>
                )}

                {promoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Voucher (20%):</span>
                    <span className="font-semibold">-{formatPrice(voucherDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax:</span>
                  <span>Included</span>
                </div>

                <div className="pt-3 border-t border-[#2a475e] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Amount:</span>
                  <span className="text-2xl font-black text-white">
                    {formatPrice(finalCheckoutAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => goToPage('checkout')}
                className="w-full py-3 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#a4d007]/20 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </button>

              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secured 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-12 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#171a21] flex items-center justify-center text-gray-500">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Cart is Currently Empty</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Explore new releases, top sellers, and special publisher discount events in our store!
          </p>
          <button
            onClick={() => goToPage('catalog')}
            className="mt-2 px-6 py-2.5 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-colors inline-flex items-center space-x-2"
          >
            <span>Discover Games in Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
