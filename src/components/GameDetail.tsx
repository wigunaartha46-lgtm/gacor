import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Monitor, 
  Apple, 
  Layers, 
  Check, 
  Flame, 
  Share2, 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown, 
  Cpu, 
  HardDrive, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Award,
  Play
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const GameDetail: React.FC = () => {
  const { 
    selectedGame, 
    goToPage, 
    addToCart, 
    isInCart, 
    isOwned, 
    toggleWishlist, 
    isInWishlist, 
    formatDiscountPrice,
    reviews,
    addReview,
    voteReviewHelpful,
    currentUser,
    setAuthModalOpen,
    showNotification
  } = useGameHub();

  const game = selectedGame;

  // Media selector
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeReqTab, setActiveReqTab] = useState<'minimum' | 'recommended'>('minimum');
  
  // Review form state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewIsPositive, setReviewIsPositive] = useState(true);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewScore, setReviewScore] = useState(5);

  if (!game) {
    return (
      <div className="py-20 text-center text-white">
        <p>Game not found.</p>
        <button 
          onClick={() => goToPage('store')}
          className="mt-4 px-4 py-2 bg-[#66c0f4] text-gray-950 rounded-lg text-xs font-bold"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const priceInfo = formatDiscountPrice(game.price, game.discount);
  const owned = isOwned(game.id);
  const inCart = isInCart(game.id);
  const inWishlist = isInWishlist(game.id);

  // Relevant reviews for this game
  const gameReviews = reviews.filter(r => r.gameId === game.id);
  const positiveCount = gameReviews.filter(r => r.isPositive).length;
  const positivePercentage = gameReviews.length > 0 
    ? Math.round((positiveCount / gameReviews.length) * 100) 
    : game.ratingScore;

  const allMedia = [
    game.bannerImage || game.coverImage,
    ...(game.screenshots || [])
  ];

  const handleBuyNow = () => {
    if (!owned) {
      if (!inCart) {
        addToCart(game.id);
      }
      goToPage('cart');
    } else {
      goToPage('library');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showNotification('Game link copied to clipboard!');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (!reviewComment.trim()) return;

    addReview(game.id, reviewScore, reviewIsPositive, reviewComment.trim());
    setReviewComment('');
    setReviewModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Back button breadcrumb */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <button
          onClick={() => goToPage('store')}
          className="flex items-center space-x-1.5 text-gray-300 hover:text-[#66c0f4] font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline">Store &gt; Catalog &gt;</span>
          <span className="text-white font-semibold truncate max-w-[200px]">{game.title}</span>
        </div>
      </div>

      {/* Main Showcase: Media Gallery on Left + Buy & Meta Info on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Active Media Viewer */}
          <div className="relative w-full aspect-[16/9] bg-[#171a21] rounded-2xl overflow-hidden border border-[#2a475e] shadow-2xl">
            <img 
              src={allMedia[activeMediaIndex] || game.coverImage} 
              alt={game.title} 
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            {/* Tagline overlay at bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
                Image {activeMediaIndex + 1} of {allMedia.length}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 bg-[#171a21]/80 hover:bg-[#202b3b] px-3 py-1 rounded-md border border-[#2a475e] cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Screenshot Thumbnails Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
            {allMedia.map((mediaUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  activeMediaIndex === idx
                    ? 'border-[#66c0f4] ring-2 ring-[#66c0f4]/50 scale-102'
                    : 'border-[#2a475e] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={mediaUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* About This Game Description Card */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="border-b border-[#2a475e] pb-3">
              <h2 className="text-xl font-black text-white tracking-wide">
                About This Game
              </h2>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {game.detailedDescription || game.description}
            </p>

            {/* Game Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#2a475e]/60">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Single-player &amp; Story Campaign</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Full Controller &amp; Steam Deck Support</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Cloud Saves &amp; Auto-Sync</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Gacor Achievements Unlocked</span>
              </div>
            </div>
          </div>

          {/* System Requirements Tabbed Card */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2a475e] pb-3">
              <h2 className="text-xl font-black text-white tracking-wide">
                System Requirements
              </h2>
              <div className="flex items-center space-x-2 bg-[#171a21] p-1 rounded-lg border border-[#2a475e]">
                <button
                  onClick={() => setActiveReqTab('minimum')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                    activeReqTab === 'minimum' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Minimum
                </button>
                <button
                  onClick={() => setActiveReqTab('recommended')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                    activeReqTab === 'recommended' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Recommended
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
              <div className="bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/70 space-y-1.5">
                <div className="flex items-center space-x-2 text-gray-400 font-semibold">
                  <Monitor className="w-3.5 h-3.5 text-[#66c0f4]" />
                  <span>Operating System (OS)</span>
                </div>
                <p className="text-white font-medium">
                  {game.systemRequirements[activeReqTab].os}
                </p>
              </div>

              <div className="bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/70 space-y-1.5">
                <div className="flex items-center space-x-2 text-gray-400 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-[#66c0f4]" />
                  <span>Processor (CPU)</span>
                </div>
                <p className="text-white font-medium">
                  {game.systemRequirements[activeReqTab].processor}
                </p>
              </div>

              <div className="bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/70 space-y-1.5">
                <div className="flex items-center space-x-2 text-gray-400 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Memory (RAM)</span>
                </div>
                <p className="text-white font-medium">
                  {game.systemRequirements[activeReqTab].ram}
                </p>
              </div>

              <div className="bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/70 space-y-1.5">
                <div className="flex items-center space-x-2 text-gray-400 font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Graphics (GPU)</span>
                </div>
                <p className="text-white font-medium">
                  {game.systemRequirements[activeReqTab].gpu}
                </p>
              </div>

              <div className="bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/70 space-y-1.5 sm:col-span-2">
                <div className="flex items-center space-x-2 text-gray-400 font-semibold">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Storage Requirement</span>
                </div>
                <p className="text-white font-medium">
                  {game.systemRequirements[activeReqTab].storage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Game Meta Sidebar & Purchase Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Cover & Title Card */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-xl space-y-4">
            <img 
              src={game.coverImage} 
              alt={game.title} 
              className="w-full aspect-[16/10] object-cover rounded-xl shadow-lg border border-[#2a475e]"
            />

            <div>
              <h1 className="text-2xl font-black text-white leading-tight">
                {game.title}
              </h1>
              <p className="text-xs text-gray-300 mt-1.5">
                {game.tagline}
              </p>
            </div>

            {/* Rating Summary Bar */}
            <div className="p-3 bg-[#171a21] rounded-xl border border-[#2a475e]/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">All Reviews:</span>
                <span className="text-emerald-400 font-bold">
                  {game.ratingText} ({game.ratingScore}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#202b3b] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#66c0f4]" 
                  style={{ width: `${game.ratingScore}%` }} 
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>{game.positiveReviews.toLocaleString()} positive</span>
                <span>{game.totalReviews.toLocaleString()} total reviews</span>
              </div>
            </div>

            {/* Quick Metadata Info */}
            <div className="space-y-2 text-xs text-gray-300 border-t border-[#2a475e]/60 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Release Date:</span>
                <span className="text-white font-medium">{game.releaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Developer:</span>
                <span className="text-[#66c0f4] font-medium">{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Publisher:</span>
                <span className="text-white font-medium">{game.publisher}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Supported OS:</span>
                <div className="flex items-center space-x-1.5 text-gray-300">
                  {game.platforms.includes('Windows') && <span title="Windows"><Monitor className="w-3.5 h-3.5" /></span>}
                  {game.platforms.includes('macOS') && <span title="macOS"><Apple className="w-3.5 h-3.5" /></span>}
                  {game.platforms.includes('Linux') && <span title="Linux"><Layers className="w-3.5 h-3.5" /></span>}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-[#2a475e]/60 pt-3">
              <span className="text-xs text-gray-400 block mb-1.5">Popular User Tags:</span>
              <div className="flex flex-wrap gap-1">
                {game.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold bg-[#171a21] text-gray-300 px-2 py-0.5 rounded border border-[#2a475e]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Purchase Card */}
          <div className="bg-gradient-to-b from-[#1b2838] to-[#171a21] border-2 border-[#66c0f4]/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <h3 className="text-lg font-black text-white">
              Buy {game.title}
            </h3>

            {/* Price Box */}
            <div className="flex items-center justify-between bg-[#171a21] p-3 rounded-xl border border-[#2a475e]">
              <div>
                {priceInfo.isFree ? (
                  <span className="text-xl font-black text-emerald-400">Free to Play</span>
                ) : game.discount > 0 ? (
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#a4d007] text-gray-950 font-black text-sm px-2 py-0.5 rounded font-mono">
                      -{game.discount}%
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">{priceInfo.original}</span>
                      <span className="text-xl font-black text-white">{priceInfo.final}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xl font-black text-white">{priceInfo.original}</span>
                )}
              </div>

              {/* Wishlist quick button */}
              <button
                onClick={() => toggleWishlist(game.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  inWishlist
                    ? 'bg-pink-500/20 text-pink-400 border-pink-500/40 hover:bg-pink-500/30'
                    : 'bg-[#202b3b] text-gray-300 border-[#2a475e] hover:text-white hover:bg-[#2a475e]'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Action CTAs */}
            <div className="space-y-2.5">
              {owned ? (
                <button
                  onClick={() => goToPage('library')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg cursor-pointer transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>Already in Your Library • Play Now</span>
                </button>
              ) : (
                <>
                  <button
                    id="game-detail-buy-now-btn"
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#a4d007]/20 cursor-pointer transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>

                  {!inCart ? (
                    <button
                      id="game-detail-add-cart-btn"
                      onClick={() => addToCart(game.id)}
                      className="w-full py-2.5 bg-[#202b3b] hover:bg-[#2a475e] text-white font-semibold text-xs rounded-xl border border-[#2a475e] flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-[#66c0f4]" />
                      <span>Add to Shopping Cart</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => goToPage('cart')}
                      className="w-full py-2.5 bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/40 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>View in Cart</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Customer Reviews Section */}
      <section id="game-reviews-section" className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a475e] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#66c0f4]" />
              <span>Customer Reviews ({gameReviews.length})</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Overall Sentiment: <strong className="text-emerald-400">{game.ratingText}</strong> ({positivePercentage}% positive)
            </p>
          </div>

          <button
            onClick={() => {
              if (!currentUser) {
                setAuthModalOpen(true);
              } else {
                setReviewModalOpen(true);
              }
            }}
            className="px-4 py-2 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {gameReviews.length > 0 ? (
            gameReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-[#171a21] border border-[#2a475e]/70 rounded-xl p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={rev.userAvatar} 
                      alt={rev.userName} 
                      className="w-9 h-9 rounded-lg object-cover ring-1 ring-[#66c0f4]/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{rev.userName}</span>
                        {rev.isPositive ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                            <ThumbsUp className="w-3 h-3" /> Recommended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded font-semibold">
                            <ThumbsDown className="w-3 h-3" /> Not Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {rev.hoursPlayedAtReview} hours recorded • Posted {rev.createdAt}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed pl-12">
                  {rev.comment}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-[#2a475e]/40 pl-12">
                  <span>Was this review helpful?</span>
                  <button
                    onClick={() => voteReviewHelpful(rev.id)}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-[#202b3b] hover:bg-[#2a475e] text-gray-200 rounded-lg border border-[#2a475e] cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-gray-400" />
                    <span>Yes ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-xs">
              No written reviews yet for this game. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </section>

      {/* Review Modal Form */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">
              Write a Review for {game.title}
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  Do you recommend this game to others?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewIsPositive(true)}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-bold cursor-pointer ${
                      reviewIsPositive 
                        ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500' 
                        : 'bg-[#171a21] text-gray-400 border-[#2a475e]'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Yes, Recommended</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewIsPositive(false)}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-bold cursor-pointer ${
                      !reviewIsPositive 
                        ? 'bg-rose-600/30 text-rose-300 border-rose-500' 
                        : 'bg-[#171a21] text-gray-400 border-[#2a475e]'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>No, Not Recommended</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Rating Score (1 to 5 Stars)
                </label>
                <select
                  value={reviewScore}
                  onChange={(e) => setReviewScore(Number(e.target.value))}
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) Masterpiece</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) Great Game</option>
                  <option value={3}>⭐⭐⭐ (3/5) Average</option>
                  <option value={2}>⭐⭐ (2/5) Disappointing</option>
                  <option value={1}>⭐ (1/5) Broken / Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Describe what you liked or disliked
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details about performance, gameplay loop, narrative, and graphics..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#66c0f4]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 bg-[#202b3b] text-gray-300 text-xs font-bold rounded-xl border border-[#2a475e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#66c0f4] text-gray-950 text-xs font-black rounded-xl shadow cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
