import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Gamepad2, 
  Heart, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Settings, 
  CreditCard,
  Edit3,
  Award,
  LogOut,
  Save,
  Check
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const UserProfile: React.FC = () => {
  const { 
    currentUser, 
    games, 
    reviews, 
    currency, 
    setCurrency, 
    goToPage, 
    viewGameDetail, 
    logout, 
    loginAsAdmin, 
    loginAsDemoUser,
    showNotification 
  } = useGameHub();

  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'reviews' | 'settings'>('overview');
  const [bioText, setBioText] = useState(currentUser?.bio || '');
  const [isEditingBio, setIsEditingBio] = useState(false);

  if (!currentUser) {
    return (
      <div className="py-20 text-center text-white">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const ownedGames = games.filter(g => currentUser.gamesOwned.includes(g.id));
  const userReviews = reviews.filter(r => r.userId === currentUser.id);

  // Total playtime sum
  const totalPlaytimeHours = Object.values(currentUser.playtimeHours || {}).reduce((a, b) => a + b, 0);

  const handleSaveBio = () => {
    setIsEditingBio(false);
    showNotification('Profile bio updated!');
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#1b2838] via-[#202b3b] to-[#171a21] border border-[#2a475e] p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-[#66c0f4] shadow-2xl"
            />
            <span className={`absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow ${
              currentUser.role === 'admin'
                ? 'bg-amber-500 text-gray-950 font-black'
                : 'bg-[#66c0f4] text-gray-950 font-black'
            }`}>
              {currentUser.role}
            </span>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {currentUser.username}
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">{currentUser.email}</p>
              </div>

              {/* Wallet Pill */}
              <div className="bg-[#171a21] border border-[#2a475e] px-4 py-2 rounded-xl flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#a4d007]" />
                <span className="text-xs text-gray-300">Wallet:</span>
                <span className="text-sm font-black text-white">${currentUser.walletBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-1">
              {isEditingBio ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    className="flex-1 bg-[#171a21] border border-[#2a475e] rounded-lg px-3 py-1 text-xs text-white"
                  />
                  <button
                    onClick={handleSaveBio}
                    className="px-3 py-1 bg-[#66c0f4] text-gray-950 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
                  <span>{bioText || 'No bio written yet.'}</span>
                  <button 
                    onClick={() => setIsEditingBio(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-400 pt-1">
              <span>Country: <strong className="text-white">{currentUser.country || 'Indonesia'}</strong></span>
              <span>•</span>
              <span>Member since: <strong className="text-white">{currentUser.createdAt}</strong></span>
            </div>
          </div>
        </div>

        {/* 4 Key Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#2a475e]/60">
          <div className="bg-[#171a21]/80 border border-[#2a475e] rounded-xl p-3 text-center">
            <Gamepad2 className="w-5 h-5 mx-auto text-[#66c0f4] mb-1" />
            <span className="text-lg font-black text-white block">{currentUser.gamesOwned.length}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Games Owned</span>
          </div>

          <div className="bg-[#171a21]/80 border border-[#2a475e] rounded-xl p-3 text-center">
            <Heart className="w-5 h-5 mx-auto text-pink-400 mb-1" />
            <span className="text-lg font-black text-white block">{currentUser.wishlist.length}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Wishlist Items</span>
          </div>

          <div className="bg-[#171a21]/80 border border-[#2a475e] rounded-xl p-3 text-center">
            <MessageSquare className="w-5 h-5 mx-auto text-purple-400 mb-1" />
            <span className="text-lg font-black text-white block">{userReviews.length}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Reviews Written</span>
          </div>

          <div className="bg-[#171a21]/80 border border-[#2a475e] rounded-xl p-3 text-center">
            <Clock className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
            <span className="text-lg font-black text-white block">{totalPlaytimeHours.toFixed(1)}h</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Hours Played</span>
          </div>
        </div>
      </div>

      {/* Profile Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-[#2a475e] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            activeTab === 'overview' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            activeTab === 'games' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Owned Games ({ownedGames.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            activeTab === 'reviews' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          My Reviews ({userReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            activeTab === 'settings' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Recent Games Showcase */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#2a475e] pb-3">
              <h2 className="text-base font-bold text-white">Recent Gaming Activity</h2>
              <button
                onClick={() => goToPage('library')}
                className="text-xs text-[#66c0f4] hover:underline"
              >
                Go to Library →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ownedGames.slice(0, 4).map(game => (
                <div 
                  key={game.id}
                  onClick={() => viewGameDetail(game.id)}
                  className="flex items-center space-x-3 bg-[#171a21] p-3 rounded-xl border border-[#2a475e]/60 hover:border-[#66c0f4] cursor-pointer transition-all"
                >
                  <img src={game.coverImage} alt={game.title} className="w-14 h-16 object-cover rounded-lg shadow" />
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm truncate">{game.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {currentUser.playtimeHours[game.id] || 0} hours played
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Active License</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Owned Games */}
      {activeTab === 'games' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedGames.map(game => (
            <div
              key={game.id}
              onClick={() => viewGameDetail(game.id)}
              className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-4 flex items-center space-x-3 hover:border-[#66c0f4] cursor-pointer transition-all"
            >
              <img src={game.coverImage} alt={game.title} className="w-16 h-20 object-cover rounded-lg shadow" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-sm truncate">{game.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{game.genres[0]}</p>
                <div className="mt-2 flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentUser.playtimeHours[game.id] || 0} hrs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {userReviews.length > 0 ? (
            userReviews.map(rev => {
              const game = games.find(g => g.id === rev.gameId);
              return (
                <div key={rev.id} className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{game?.title || 'Unknown Game'}</span>
                    <span className="text-xs text-emerald-400 font-semibold">{rev.isPositive ? 'Recommended' : 'Not Recommended'}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                  <p className="text-[10px] text-gray-500">Posted on {rev.createdAt} • {rev.helpfulCount} helpful votes</p>
                </div>
              );
            })
          ) : (
            <div className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-8 text-center text-xs text-gray-400">
              You haven't written any game reviews yet.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white border-b border-[#2a475e] pb-3">
            Account Preferences
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Display Currency</p>
                <p className="text-gray-400">Switch between USD ($) and Indonesian Rupiah (Rp)</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${currency === 'USD' ? 'bg-[#66c0f4] text-gray-950' : 'bg-[#171a21] text-gray-300'}`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('IDR')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${currency === 'IDR' ? 'bg-[#66c0f4] text-gray-950' : 'bg-[#171a21] text-gray-300'}`}
                >
                  IDR (Rp)
                </button>
              </div>
            </div>

            <div className="border-t border-[#2a475e]/60 pt-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Switch Demo Profile</p>
                <p className="text-gray-400">Toggle between regular gamer profile and store admin dashboard access</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={loginAsDemoUser}
                  className="px-3 py-1.5 bg-[#202b3b] hover:bg-[#2a475e] text-white rounded-lg font-semibold"
                >
                  Gamer View
                </button>
                <button
                  onClick={loginAsAdmin}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-lg font-bold"
                >
                  Admin View
                </button>
              </div>
            </div>

            <div className="border-t border-[#2a475e]/60 pt-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-rose-400">Sign Out</p>
                <p className="text-gray-400">Log out of your current session</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-bold rounded-lg cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
