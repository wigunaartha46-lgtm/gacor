import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { GameCard } from './GameCard';
import { Platform, GameMode } from '../types';

const ALL_GENRES = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 
  'Sports', 'Racing', 'Horror', 'Puzzle', 'Indie', 'Multiplayer', 'Casual'
];

const ALL_PLATFORMS: Platform[] = ['Windows', 'macOS', 'Linux'];

const ALL_MODES: GameMode[] = [
  'Single Player', 'Multiplayer', 'Co-op', 'Online PvP', 'Local Multiplayer'
];

export const GameCatalog: React.FC = () => {
  const { 
    games, 
    searchQuery, 
    setSearchQuery, 
    selectedGenre, 
    setSelectedGenre 
  } = useGameHub();

  // Filter States
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedModes, setSelectedModes] = useState<GameMode[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'under15' | 'under30' | 'discounted'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'priceAsc' | 'priceDesc' | 'rating' | 'releaseDate'>('popularity');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Toggle helpers
  const toggleGenre = (genre: string) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
  };

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const toggleMode = (m: GameMode) => {
    setSelectedModes(prev => 
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre(null);
    setSelectedPlatforms([]);
    setSelectedModes([]);
    setPriceFilter('all');
    setMinRating(0);
    setSortBy('popularity');
  };

  // Filter & Sort Logic
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // 1. Text Search (name, developer, publisher, tags, genre)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesDev = game.developer.toLowerCase().includes(query);
        const matchesPub = game.publisher.toLowerCase().includes(query);
        const matchesTags = game.tags.some(t => t.toLowerCase().includes(query));
        const matchesGenre = game.genres.some(g => g.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDev && !matchesPub && !matchesTags && !matchesGenre) {
          return false;
        }
      }

      // 2. Genre Filter
      if (selectedGenre && !game.genres.includes(selectedGenre)) {
        return false;
      }

      // 3. Platform Filter (match if game supports ANY of selected platforms)
      if (selectedPlatforms.length > 0) {
        const hasPlatform = selectedPlatforms.some(p => game.platforms.includes(p));
        if (!hasPlatform) return false;
      }

      // 4. Mode Filter
      if (selectedModes.length > 0) {
        const hasMode = selectedModes.some(m => game.modes.includes(m));
        if (!hasMode) return false;
      }

      // 5. Price Filter
      const finalPrice = game.price * (1 - game.discount / 100);
      if (priceFilter === 'free' && game.price > 0) return false;
      if (priceFilter === 'under15' && finalPrice > 15) return false;
      if (priceFilter === 'under30' && finalPrice > 30) return false;
      if (priceFilter === 'discounted' && game.discount <= 0) return false;

      // 6. Rating Filter
      if (minRating > 0 && game.ratingScore < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.price * (1 - a.discount / 100);
      const priceB = b.price * (1 - b.discount / 100);

      switch (sortBy) {
        case 'popularity':
          return b.totalReviews - a.totalReviews;
        case 'priceAsc':
          return priceA - priceB;
        case 'priceDesc':
          return priceB - priceA;
        case 'rating':
          return b.ratingScore - a.ratingScore;
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'relevance':
        default:
          return 0;
      }
    });
  }, [games, searchQuery, selectedGenre, selectedPlatforms, selectedModes, priceFilter, minRating, sortBy]);

  const activeFiltersCount = 
    (selectedGenre ? 1 : 0) + 
    selectedPlatforms.length + 
    selectedModes.length + 
    (priceFilter !== 'all' ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header bar */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              Game Catalog &amp; Storefront
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore our full digital game database. Filter by genre, system platform, multiplayer mode, and price.
            </p>
          </div>

          {/* Quick Search inside Catalog */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag, publisher..."
              className="w-full bg-[#171a21] text-sm text-white placeholder-gray-400 pl-10 pr-9 py-2.5 rounded-xl border border-[#2a475e] focus:border-[#66c0f4] focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Tag Pills */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-3 border-t border-[#2a475e]/60 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Active filters:</span>
            {selectedGenre && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/30 text-xs font-semibold">
                Genre: {selectedGenre}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGenre(null)} />
              </span>
            )}
            {selectedPlatforms.map(p => (
              <span key={p} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                Platform: {p}
                <X className="w-3 h-3 cursor-pointer" onClick={() => togglePlatform(p)} />
              </span>
            ))}
            {selectedModes.map(m => (
              <span key={m} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                Mode: {m}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleMode(m)} />
              </span>
            ))}
            {priceFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Price: {priceFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceFilter('all')} />
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                Rating: {minRating}%+
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold ml-2 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Catalog Body: Sidebar Filters + Game Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Desktop Sidebar Filter Panel */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2a475e] pb-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-[#66c0f4]" />
              <span>Filters &amp; Tags</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'free', label: 'Free to Play' },
                { id: 'under15', label: 'Under $15' },
                { id: 'under30', label: 'Under $30' },
                { id: 'discounted', label: 'Special Discounts Only' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setPriceFilter(option.id as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    priceFilter === option.id
                      ? 'bg-[#66c0f4]/20 text-[#66c0f4] font-bold border border-[#66c0f4]/30'
                      : 'text-gray-300 hover:bg-[#202b3b]'
                  }`}
                >
                  <span>{option.label}</span>
                  {priceFilter === option.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Multi-Filter */}
          <div className="border-t border-[#2a475e]/60 pt-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
              Genre
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {ALL_GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`text-left px-2.5 py-1.5 rounded-md transition-colors cursor-pointer truncate ${
                    selectedGenre === genre
                      ? 'bg-[#66c0f4] text-gray-950 font-bold'
                      : 'text-gray-300 hover:bg-[#202b3b]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Filter */}
          <div className="border-t border-[#2a475e]/60 pt-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
              Platform OS
            </h4>
            <div className="space-y-1 text-xs">
              {ALL_PLATFORMS.map(platform => {
                const checked = selectedPlatforms.includes(platform);
                return (
                  <label
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:bg-[#202b3b] cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      checked ? 'bg-[#66c0f4] border-[#66c0f4] text-gray-950' : 'border-[#2a475e]'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{platform}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Mode Filter */}
          <div className="border-t border-[#2a475e]/60 pt-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
              Game Modes
            </h4>
            <div className="space-y-1 text-xs">
              {ALL_MODES.map(mode => {
                const checked = selectedModes.includes(mode);
                return (
                  <label
                    key={mode}
                    onClick={() => toggleMode(mode)}
                    className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:bg-[#202b3b] cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      checked ? 'bg-[#66c0f4] border-[#66c0f4] text-gray-950' : 'border-[#2a475e]'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{mode}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* User Review Rating Filter */}
          <div className="border-t border-[#2a475e]/60 pt-4">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
              User Reviews
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { min: 0, label: 'Any Rating' },
                { min: 80, label: 'Very Positive (80%+)' },
                { min: 90, label: 'Overwhelmingly Positive (90%+)' },
              ].map(opt => (
                <button
                  key={opt.min}
                  onClick={() => setMinRating(opt.min)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    minRating === opt.min
                      ? 'bg-[#66c0f4]/20 text-[#66c0f4] font-bold'
                      : 'text-gray-300 hover:bg-[#202b3b]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Results Column */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Controls Bar: Sort, Count, Layout switch, Mobile filter trigger */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow">
            
            <div className="flex items-center space-x-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 bg-[#202b3b] hover:bg-[#2a475e] text-xs font-bold text-white rounded-lg border border-[#2a475e] flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#66c0f4]" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <span className="text-xs font-medium text-gray-300">
                Found <strong className="text-white font-bold">{filteredGames.length}</strong> games
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Sorting Select */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#171a21] border border-[#2a475e] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#66c0f4]"
                >
                  <option value="popularity">Popularity / Top Sellers</option>
                  <option value="rating">User Rating (Highest)</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="relevance">Relevance</option>
                </select>
              </div>

              {/* Layout Switcher (Grid vs List) */}
              <div className="flex items-center bg-[#171a21] p-1 rounded-lg border border-[#2a475e]">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1 rounded ${layoutMode === 'grid' ? 'bg-[#202b3b] text-[#66c0f4]' : 'text-gray-400 hover:text-white'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`p-1 rounded ${layoutMode === 'list' ? 'bg-[#202b3b] text-[#66c0f4]' : 'text-gray-400 hover:text-white'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filter Slideout / Modal if triggered */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-[#1b2838] border border-[#2a475e] rounded-xl p-4 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center pb-2 border-b border-[#2a475e]">
                <span className="font-bold text-sm text-white">Mobile Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">Price</span>
                <div className="flex flex-wrap gap-1">
                  {['all', 'free', 'under15', 'under30', 'discounted'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPriceFilter(p as any)}
                      className={`text-xs px-2.5 py-1 rounded ${priceFilter === p ? 'bg-[#66c0f4] text-gray-950 font-bold' : 'bg-[#171a21] text-gray-300'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1">Genre</span>
                <div className="flex flex-wrap gap-1">
                  {ALL_GENRES.map(g => (
                    <button
                      key={g}
                      onClick={() => toggleGenre(g)}
                      className={`text-xs px-2 py-1 rounded ${selectedGenre === g ? 'bg-[#66c0f4] text-gray-950 font-bold' : 'bg-[#171a21] text-gray-300'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button onClick={resetFilters} className="text-xs text-rose-400 underline">Reset All</button>
                <button onClick={() => setMobileFilterOpen(false)} className="px-4 py-1.5 bg-[#66c0f4] text-gray-950 text-xs font-bold rounded">Apply</button>
              </div>
            </div>
          )}

          {/* Results Grid or List */}
          {filteredGames.length > 0 ? (
            layoutMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} layout="list" />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#171a21] flex items-center justify-center text-gray-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No games matched your criteria</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-1">
                Try widening your price range, clearing specific genre tags, or checking for typos in the search bar.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-5 py-2 rounded-xl bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
