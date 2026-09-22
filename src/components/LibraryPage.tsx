import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  Download, 
  Trash2, 
  Heart, 
  Clock, 
  HardDrive, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const LibraryPage: React.FC = () => {
  const { 
    games, 
    currentUser, 
    isInstalled, 
    isFavorite, 
    toggleFavorite, 
    installGame, 
    uninstallGame, 
    playGame, 
    stopPlayingGame, 
    currentlyPlayingGameId, 
    playingDurationSeconds,
    viewGameDetail, 
    goToPage 
  } = useGameHub();

  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'installed' | 'favorites'>('all');
  const [librarySearch, setLibrarySearch] = useState('');

  const ownedGameIds = currentUser?.gamesOwned || [];
  const ownedGames = games.filter(g => ownedGameIds.includes(g.id));

  // Filter based on tab and search
  const displayedGames = ownedGames.filter(g => {
    // Search
    if (librarySearch.trim()) {
      const match = g.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
                    g.genres.some(genre => genre.toLowerCase().includes(librarySearch.toLowerCase()));
      if (!match) return false;
    }

    if (activeTab === 'installed') return isInstalled(g.id);
    if (activeTab === 'favorites') return isFavorite(g.id);
    if (activeTab === 'recent') {
      const hours = currentUser?.playtimeHours[g.id] || 0;
      return hours > 0;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              My Game Library ({ownedGames.length} Titles Owned)
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Launch installed games, manage disk space, and explore your digital collection.
            </p>
          </div>
        </div>

        {/* Currently playing ticker */}
        {currentlyPlayingGameId && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 px-4 py-2 rounded-xl flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <span className="text-gray-400">Session Time: </span>
              <span className="font-mono font-bold text-white">
                {Math.floor(playingDurationSeconds / 60)}m {playingDurationSeconds % 60}s
              </span>
            </div>
            <button
              onClick={stopPlayingGame}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-bold cursor-pointer"
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs & Quick Search */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow text-xs">
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'all' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#202b3b]'
            }`}
          >
            All Games ({ownedGames.length})
          </button>

          <button
            onClick={() => setActiveTab('installed')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'installed' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#202b3b]'
            }`}
          >
            Installed ({currentUser?.installedGames.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'favorites' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#202b3b]'
            }`}
          >
            Favorites ({currentUser?.favoriteGames?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'recent' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#202b3b]'
            }`}
          >
            Recently Played
          </button>
        </div>

        {/* Quick Search in Library */}
        <div className="relative w-full sm:w-60">
          <input
            type="text"
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            placeholder="Search owned games..."
            className="w-full bg-[#171a21] border border-[#2a475e] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#66c0f4]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Games Shelf */}
      {displayedGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedGames.map(game => {
            const installed = isInstalled(game.id);
            const isPlayingThis = currentlyPlayingGameId === game.id;
            const hours = currentUser?.playtimeHours[game.id] || 0;
            const favorite = isFavorite(game.id);

            return (
              <div
                key={game.id}
                className={`bg-[#1b2838] border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all ${
                  isPlayingThis 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/40' 
                    : 'border-[#2a475e]/70 hover:border-[#66c0f4]/50'
                }`}
              >
                {/* Banner & Cover */}
                <div className="relative aspect-[16/9] overflow-hidden group">
                  <img
                    src={game.bannerImage || game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-transparent to-transparent opacity-80" />

                  {/* Favorite toggle button */}
                  <button
                    onClick={() => toggleFavorite(game.id)}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      favorite 
                        ? 'bg-pink-600 text-white shadow' 
                        : 'bg-black/50 text-gray-300 hover:text-pink-400'
                    }`}
                    title={favorite ? 'Favorited' : 'Add to Favorites'}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                  </button>

                  {/* Installed pill */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center space-x-2">
                    {installed ? (
                      <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-sm">
                        <CheckCircle2 className="w-3 h-3" /> Installed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-[#171a21]/80 text-gray-300 border border-[#2a475e] px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Cloud Ready
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => viewGameDetail(game.id)}
                      className="text-base font-bold text-white hover:text-[#66c0f4] transition-colors cursor-pointer truncate"
                    >
                      {game.title}
                    </h3>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#66c0f4]" />
                        <span>{hours.toFixed(1)} hrs on record</span>
                      </span>
                      <span>•</span>
                      <span>{game.genres[0]}</span>
                    </div>
                  </div>

                  {/* Action Buttons: Play / Install / Details */}
                  <div className="pt-3 border-t border-[#2a475e]/60 flex items-center justify-between gap-2">
                    {installed ? (
                      isPlayingThis ? (
                        <button
                          onClick={stopPlayingGame}
                          className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow transition-colors cursor-pointer"
                        >
                          <span>Exit Game</span>
                        </button>
                      ) : (
                        <button
                          id={`play-game-${game.id}`}
                          onClick={() => playGame(game.id)}
                          className="flex-1 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Play</span>
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => installGame(game.id)}
                        className="flex-1 py-2 px-3 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Install</span>
                      </button>
                    )}

                    <button
                      onClick={() => viewGameDetail(game.id)}
                      className="p-2 bg-[#202b3b] hover:bg-[#2a475e] text-gray-300 hover:text-white rounded-xl border border-[#2a475e] cursor-pointer"
                      title="Store Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {installed && (
                      <button
                        onClick={() => uninstallGame(game.id)}
                        className="p-2 text-gray-400 hover:text-rose-400 hover:bg-[#171a21] rounded-xl border border-[#2a475e] cursor-pointer"
                        title="Uninstall from PC"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-12 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#171a21] flex items-center justify-center text-gray-500">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Games in This Section</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Browse our game store to purchase and activate digital game licenses with lifetime access.
          </p>
          <button
            onClick={() => goToPage('store')}
            className="mt-2 px-6 py-2.5 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-colors inline-flex items-center space-x-2"
          >
            <span>Browse Games Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
