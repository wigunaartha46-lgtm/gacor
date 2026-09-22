import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Wallet, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Lock, 
  Copy,
  Gamepad2,
  ExternalLink
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartFinalTotal, 
    cartSubtotal, 
    cartDiscountTotal, 
    formatPrice, 
    processCheckout, 
    goToPage, 
    currentUser, 
    setAuthModalOpen,
    showNotification
  } = useGameHub();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('QRIS');
  const [selectedProvider, setSelectedProvider] = useState<string>('QRIS Universal');
  
  // Form states
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Card inputs
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [cardName, setCardName] = useState(currentUser?.username || 'Artha Wiguna');

  // E-Wallet phone
  const [ewalletPhone, setEwalletPhone] = useState('081234567890');

  // Virtual account for Bank Transfer
  const virtualAccount = '88019' + Math.floor(10000000 + Math.random() * 90000000);

  const handlePay = async () => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    if (cart.length === 0 && !completedOrder) {
      goToPage('store');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate network verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const order = await processCheckout(selectedMethod, selectedProvider);
      setCompletedOrder(order);
    } catch (err: any) {
      showNotification(err.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyVA = () => {
    navigator.clipboard?.writeText(virtualAccount);
    showNotification('Virtual Account number copied to clipboard!');
  };

  // SUCCESS VIEW
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto py-8 pb-16 space-y-6">
        <div className="bg-[#1b2838] border-2 border-emerald-500/50 rounded-2xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Payment Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Your games have been successfully activated and added to your personal Library.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-[#171a21] border border-[#2a475e] rounded-xl p-5 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-[#2a475e]/60 pb-2">
              <span className="text-gray-400">Invoice Number:</span>
              <span className="font-mono text-white font-bold">{completedOrder.invoiceNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#2a475e]/60 pb-2">
              <span className="text-gray-400">Payment Method:</span>
              <span className="text-white font-semibold">{completedOrder.paymentMethod} ({completedOrder.paymentProvider || 'Instant'})</span>
            </div>
            <div className="flex justify-between border-b border-[#2a475e]/60 pb-2">
              <span className="text-gray-400">Total Paid:</span>
              <span className="text-emerald-400 font-bold text-sm">{formatPrice(completedOrder.totalPrice)}</span>
            </div>

            <div className="pt-1">
              <span className="text-gray-400 block mb-2 font-medium">Activated Titles:</span>
              <div className="space-y-2">
                {completedOrder.items.map(item => (
                  <div key={item.gameId} className="flex items-center space-x-3 bg-[#1b2838] p-2 rounded-lg border border-[#2a475e]/60">
                    <img src={item.coverImage} alt={item.title} className="w-10 h-12 object-cover rounded shadow" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">License Ready • Lifetime Access</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions: Go to Library or continue browsing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="checkout-success-library-btn"
              onClick={() => goToPage('library')}
              className="py-3 px-6 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg cursor-pointer transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Go to My Library &amp; Play</span>
            </button>

            <button
              onClick={() => goToPage('store')}
              className="py-3 px-6 bg-[#202b3b] hover:bg-[#2a475e] text-white font-semibold text-xs rounded-xl border border-[#2a475e] flex items-center justify-center space-x-2 cursor-pointer transition-colors"
            >
              <span>Back to Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Page Header */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Secure Checkout
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Select your preferred payment channel to complete instant game activation.
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Payment Method Selection */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
              1. Choose Payment Method
            </h2>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('QRIS');
                  setSelectedProvider('QRIS Universal');
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedMethod === 'QRIS'
                    ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white shadow'
                    : 'bg-[#171a21] border-[#2a475e] text-gray-400 hover:text-white'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#66c0f4]" />
                <span className="text-xs font-bold">QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('E-Wallet');
                  setSelectedProvider('GoPay');
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedMethod === 'E-Wallet'
                    ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white shadow'
                    : 'bg-[#171a21] border-[#2a475e] text-gray-400 hover:text-white'
                }`}
              >
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">E-Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('Bank Transfer');
                  setSelectedProvider('BCA Virtual Account');
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedMethod === 'Bank Transfer'
                    ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white shadow'
                    : 'bg-[#171a21] border-[#2a475e] text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('Credit/Debit Card');
                  setSelectedProvider('Visa/Mastercard');
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  selectedMethod === 'Credit/Debit Card'
                    ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white shadow'
                    : 'bg-[#171a21] border-[#2a475e] text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold">Cards</span>
              </button>
            </div>

            {/* Method Details Pane */}
            <div className="pt-2">
              
              {/* QRIS Tab Content */}
              {selectedMethod === 'QRIS' && (
                <div className="bg-[#171a21] border border-[#2a475e] rounded-xl p-5 text-center space-y-4">
                  <div className="inline-block bg-white p-3 rounded-xl shadow-lg">
                    {/* Simulated SVG QR Code */}
                    <div className="w-40 h-40 bg-white flex flex-col items-center justify-center p-1 border-2 border-gray-950">
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-xs ${
                              (i % 2 === 0 || i % 7 === 0 || i < 8) && i !== 14 && i !== 22
                                ? 'bg-gray-950' 
                                : 'bg-transparent'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">Scan with BCA Mobile, GoPay, OVO, Dana, or ShopeePay</p>
                    <p className="text-[11px] text-gray-400 mt-1">Instant automatic verification upon scanning</p>
                  </div>
                </div>
              )}

              {/* E-Wallet Tab Content */}
              {selectedMethod === 'E-Wallet' && (
                <div className="bg-[#171a21] border border-[#2a475e] rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {['GoPay', 'OVO', 'DANA', 'ShopeePay'].map(ew => (
                      <button
                        key={ew}
                        type="button"
                        onClick={() => setSelectedProvider(ew)}
                        className={`p-2 rounded-lg border font-semibold transition-colors cursor-pointer ${
                          selectedProvider === ew
                            ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white'
                            : 'bg-[#202b3b] border-[#2a475e] text-gray-300'
                        }`}
                      >
                        {ew}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Registered Mobile Number ({selectedProvider})
                    </label>
                    <input
                      type="text"
                      value={ewalletPhone}
                      onChange={(e) => setEwalletPhone(e.target.value)}
                      className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">A payment push notification will be sent to your phone app.</span>
                  </div>
                </div>
              )}

              {/* Bank Transfer Tab Content */}
              {selectedMethod === 'Bank Transfer' && (
                <div className="bg-[#171a21] border border-[#2a475e] rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['BCA VA', 'Mandiri VA', 'BRI VA'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedProvider(bank)}
                        className={`p-2 rounded-lg border font-semibold transition-colors cursor-pointer ${
                          selectedProvider === bank
                            ? 'bg-[#66c0f4]/20 border-[#66c0f4] text-white'
                            : 'bg-[#202b3b] border-[#2a475e] text-gray-300'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-[#1b2838] rounded-xl border border-[#2a475e] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-gray-400">Virtual Account Number ({selectedProvider}):</p>
                      <p className="font-mono text-base font-bold text-emerald-400 tracking-wider mt-0.5">{virtualAccount}</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyVA}
                      className="p-2 bg-[#202b3b] hover:bg-[#2a475e] text-gray-300 rounded-lg cursor-pointer"
                      title="Copy VA"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Cards Tab Content */}
              {selectedMethod === 'Credit/Debit Card' && (
                <div className="bg-[#171a21] border border-[#2a475e] rounded-xl p-5 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Pay CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider border-b border-[#2a475e] pb-3">
              Order Summary ({cart.length} items)
            </h2>

            {/* Cart mini items */}
            <div className="divide-y divide-[#2a475e]/40 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img src={item.game.coverImage} alt={item.game.title} className="w-8 h-10 object-cover rounded shadow" />
                    <span className="font-semibold text-white truncate">{item.game.title}</span>
                  </div>
                  <span className="font-bold text-white shrink-0">
                    {formatPrice(item.game.price * (1 - item.game.discount / 100))}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-[#2a475e] pt-3 space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscountTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discounts Applied:</span>
                  <span>-{formatPrice(cartDiscountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#2a475e]/60 text-sm font-black text-white">
                <span>Total Amount:</span>
                <span className="text-xl text-[#66c0f4]">{formatPrice(cartFinalTotal)}</span>
              </div>
            </div>

            {/* Complete Payment Button */}
            <button
              id="confirm-payment-btn"
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full py-3.5 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#a4d007]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm &amp; Pay {formatPrice(cartFinalTotal)}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              By confirming, digital rights are immediately dispatched and linked to your Gacor account.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
