import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Gamepad2, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit, 
  Percent, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Search,
  X,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { Game, Order, Review } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    games, 
    addGame, 
    updateGame, 
    deleteGame, 
    orders, 
    updateOrderStatus, 
    reviews, 
    deleteReview, 
    formatPrice, 
    currentUser, 
    goToPage,
    showNotification 
  } = useGameHub();

  const [adminTab, setAdminTab] = useState<'games' | 'orders' | 'reviews' | 'users'>('games');
  const [addGameModalOpen, setAddGameModalOpen] = useState(false);

  // New game form state
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('29.99');
  const [discount, setDiscount] = useState('0');
  const [genre, setGenre] = useState('Action');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');

  // Quick search in admin
  const [searchFilter, setSearchFilter] = useState('');

  // Simulated metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.status === 'Completed' ? o.totalPrice : 0), 0);
  const totalGamesCount = games.length;
  const totalOrdersCount = orders.length;
  const activeUsersCount = 1420;

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGame({
      title: title.trim(),
      tagline: tagline.trim() || 'Exciting newly published PC gaming title.',
      description: description.trim() || 'An immersive digital PC experience curated on Gacor.',
      developer: developer.trim() || 'Independent Studios',
      publisher: publisher.trim() || 'Gacor Direct',
      price: parseFloat(price) || 0,
      discount: parseInt(discount) || 0,
      genres: [genre, 'Indie'],
      platforms: ['Windows', 'macOS', 'Linux'],
      modes: ['Single Player'],
      releaseDate: new Date().toISOString().split('T')[0],
      coverImage: coverImage.trim(),
      bannerImage: coverImage.trim(),
      screenshots: [coverImage.trim()],
      trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      tags: [genre, 'Action', 'Featured'],
      systemRequirements: {
        minimum: {
          os: 'Windows 10 64-bit',
          processor: 'Quad Core 2.5 GHz',
          ram: '8 GB RAM',
          gpu: 'GTX 1050',
          storage: '20 GB space'
        },
        recommended: {
          os: 'Windows 11 64-bit',
          processor: 'Core i7 / Ryzen 7',
          ram: '16 GB RAM',
          gpu: 'RTX 3060',
          storage: '20 GB SSD'
        }
      },
      isFeatured: true
    });

    setTitle('');
    setTagline('');
    setDescription('');
    setAddGameModalOpen(false);
  };

  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    g.developer.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#1b2838] border border-amber-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white tracking-wide">
                Admin Control Center
              </h1>
              <span className="bg-amber-500/30 text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-500/40">
                Staff Access
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Live marketplace telemetry, catalog modifications, pricing discounts, and order statuses.
            </p>
          </div>
        </div>

        <button
          onClick={() => goToPage('store')}
          className="text-xs text-gray-300 hover:text-white px-3 py-1.5 bg-[#202b3b] border border-[#2a475e] rounded-xl flex items-center space-x-1 cursor-pointer"
        >
          <span>View Public Storefront</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Gross Sales</span>
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">{formatPrice(totalSales)}</p>
          <span className="text-[11px] text-emerald-400 font-semibold">↑ 18.4% this month</span>
        </div>

        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Games</span>
            <div className="p-2 bg-[#66c0f4]/20 rounded-lg text-[#66c0f4]">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">{totalGamesCount}</p>
          <span className="text-[11px] text-gray-400 font-medium">Digital Titles Published</span>
        </div>

        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Orders Count</span>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">{totalOrdersCount}</p>
          <span className="text-[11px] text-purple-300 font-medium">100% Fulfilled</span>
        </div>

        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Users</span>
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">{activeUsersCount.toLocaleString()}</p>
          <span className="text-[11px] text-amber-300 font-medium">Global Online Players</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center space-x-2 border-b border-[#2a475e] pb-3 text-xs">
        <button
          onClick={() => setAdminTab('games')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            adminTab === 'games' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Game Management ({games.length})
        </button>
        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            adminTab === 'orders' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Order Management ({orders.length})
        </button>
        <button
          onClick={() => setAdminTab('reviews')}
          className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
            adminTab === 'reviews' ? 'bg-[#66c0f4] text-gray-950' : 'text-gray-300 hover:bg-[#1b2838]'
          }`}
        >
          Review Moderation ({reviews.length})
        </button>
      </div>

      {/* TAB 1: Game Management */}
      {adminTab === 'games' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search games in catalog..."
                className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl pl-9 pr-3 py-2 text-xs text-white"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setAddGameModalOpen(true)}
              className="px-4 py-2 bg-[#a4d007] hover:bg-[#b2e209] text-gray-950 font-black text-xs rounded-xl shadow flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Game</span>
            </button>
          </div>

          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#171a21] text-gray-400 uppercase font-bold text-[10px] border-b border-[#2a475e]">
                  <tr>
                    <th className="p-4">Game</th>
                    <th className="p-4">Developer</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Discount</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a475e]/60">
                  {filteredGames.map(game => (
                    <tr key={game.id} className="hover:bg-[#202b3b]/60 transition-colors">
                      <td className="p-4 flex items-center space-x-3">
                        <img src={game.coverImage} alt={game.title} className="w-10 h-12 object-cover rounded shadow" />
                        <div>
                          <p className="font-bold text-white truncate max-w-xs">{game.title}</p>
                          <p className="text-[10px] text-gray-400">{game.genres.slice(0, 2).join(', ')}</p>
                        </div>
                      </td>

                      <td className="p-4 font-medium text-gray-300">
                        {game.developer}
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={game.price}
                          onBlur={(e) => updateGame(game.id, { price: parseFloat(e.target.value) || 0 })}
                          className="w-20 bg-[#171a21] border border-[#2a475e] rounded px-2 py-1 text-xs text-white"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            min="0"
                            max="90"
                            defaultValue={game.discount}
                            onBlur={(e) => updateGame(game.id, { discount: parseInt(e.target.value) || 0 })}
                            className="w-16 bg-[#171a21] border border-[#2a475e] rounded px-2 py-1 text-xs text-white font-mono"
                          />
                          <span className="text-gray-400">%</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-emerald-400 font-semibold">{game.ratingScore}%</span>
                        <span className="text-gray-400 text-[10px] block">({game.totalReviews} reviews)</span>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => deleteGame(game.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-[#171a21] rounded cursor-pointer"
                          title="Delete game from store"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Order Management */}
      {adminTab === 'orders' && (
        <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#171a21] text-gray-400 uppercase font-bold text-[10px] border-b border-[#2a475e]">
                <tr>
                  <th className="p-4">Invoice</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a475e]/60">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-[#202b3b]/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">
                      {order.invoiceNumber}
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-white">{order.customerName}</p>
                      <p className="text-[10px] text-gray-400">{order.customerEmail}</p>
                    </td>

                    <td className="p-4">
                      <span className="font-medium text-white">{order.items.length} titles</span>
                    </td>

                    <td className="p-4 font-bold text-emerald-400">
                      {formatPrice(order.totalPrice)}
                    </td>

                    <td className="p-4 text-gray-300">
                      {order.paymentMethod} ({order.paymentProvider || 'Standard'})
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : order.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-1.5">
                      {order.status !== 'Refunded' ? (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Refunded')}
                          className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Refund
                        </button>
                      ) : (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Completed')}
                          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Reopen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Review Moderation */}
      {adminTab === 'reviews' && (
        <div className="space-y-4">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#171a21] text-gray-400 uppercase font-bold text-[10px] border-b border-[#2a475e]">
                  <tr>
                    <th className="p-4">Author</th>
                    <th className="p-4">Game</th>
                    <th className="p-4">Recommendation</th>
                    <th className="p-4">Review Comment</th>
                    <th className="p-4 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a475e]/60">
                  {reviews.map(rev => {
                    const game = games.find(g => g.id === rev.gameId);
                    return (
                      <tr key={rev.id} className="hover:bg-[#202b3b]/60 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white">{rev.userName}</p>
                          <p className="text-[10px] text-gray-500">{rev.createdAt}</p>
                        </td>

                        <td className="p-4 font-semibold text-white">
                          {game?.title || 'Game'}
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rev.isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {rev.isPositive ? 'Recommended' : 'Negative'}
                          </span>
                        </td>

                        <td className="p-4 max-w-sm truncate text-gray-300">
                          {rev.comment}
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-[#171a21] rounded cursor-pointer"
                            title="Remove review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add New Game Modal */}
      {addGameModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#2a475e] pb-3">
              <h3 className="text-lg font-bold text-white">Publish New Game to Store</h3>
              <button onClick={() => setAddGameModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Game Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Neon Protocol: Zero Day"
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Short exciting catchphrase..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Developer</label>
                  <input
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    placeholder="Studio Name"
                    className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Publisher</label>
                  <input
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher Name"
                    className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Primary Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Racing">Racing</option>
                    <option value="Horror">Horror</option>
                    <option value="Indie">Indie</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Gameplay systems, features, story background..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddGameModalOpen(false)}
                  className="px-4 py-2 bg-[#202b3b] text-gray-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#a4d007] text-gray-950 rounded-xl font-black shadow cursor-pointer"
                >
                  Add Game to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
