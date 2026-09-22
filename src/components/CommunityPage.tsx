import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Image, 
  BookOpen, 
  Newspaper, 
  Palette, 
  Heart, 
  PlusCircle, 
  Share2, 
  X, 
  Tag 
} from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';
import { CommunityCategory, CommunityPost } from '../types';

export const CommunityPage: React.FC = () => {
  const { 
    communityPosts, 
    addCommunityPost, 
    likeCommunityPost, 
    currentUser, 
    setAuthModalOpen,
    games 
  } = useGameHub();

  const [activeCategory, setActiveCategory] = useState<CommunityCategory>('all');
  const [modalOpen, setModalOpen] = useState(false);
  
  // New post fields
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('discussion');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newGameTag, setNewGameTag] = useState(games[0]?.title || 'General');

  const filteredPosts = communityPosts.filter(p => 
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) return;

    addCommunityPost({
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      imageUrl: newImageUrl.trim() || undefined,
      gameTag: newGameTag
    });

    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Community Header Banner */}
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">
              Gacor Community Hub
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Player guides, high-res 4K screenshots, game discussions, and official news updates.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (!currentUser) setAuthModalOpen(true);
            else setModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl shadow-md flex items-center space-x-2 cursor-pointer transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'All Feed', icon: Users },
          { id: 'discussion', label: 'Discussions', icon: MessageSquare },
          { id: 'screenshots', label: 'Screenshots', icon: Image },
          { id: 'artwork', label: 'Artwork', icon: Palette },
          { id: 'guides', label: 'Guides & Walkthroughs', icon: BookOpen },
          { id: 'news', label: 'Official News', icon: Newspaper },
        ].map(cat => {
          const Icon = cat.icon;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                active 
                  ? 'bg-[#66c0f4] text-gray-950 shadow-md' 
                  : 'bg-[#1b2838] border border-[#2a475e] text-gray-300 hover:text-white hover:bg-[#202b3b]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-[#1b2838] border border-[#2a475e]/70 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
          >
            {/* Header: Author & Tag */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#66c0f4]/40"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{post.authorName}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#202b3b] text-gray-300 border border-[#2a475e]">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{post.createdAt}</p>
                </div>
              </div>

              {post.gameTag && (
                <span className="text-[11px] font-semibold text-[#66c0f4] bg-[#66c0f4]/10 border border-[#66c0f4]/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span className="truncate max-w-[150px]">{post.gameTag}</span>
                </span>
              )}
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Attached Image if any */}
            {post.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-[#2a475e] max-h-96 aspect-video bg-[#171a21]">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Footer: Likes & Comments */}
            <div className="pt-3 border-t border-[#2a475e]/60 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => likeCommunityPost(post.id)}
                  className="flex items-center space-x-1.5 hover:text-pink-400 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                  <span className="font-semibold">{post.likes} Likes</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-[#66c0f4]" />
                  <span>{post.commentsCount} Comments</span>
                </div>
              </div>

              <button className="hover:text-white transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2a475e] pb-3">
              <h3 className="text-lg font-bold text-white">Create a Community Post</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Post Type</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="discussion">Discussion / Question</option>
                  <option value="screenshots">Screenshot</option>
                  <option value="artwork">Fan Artwork</option>
                  <option value="guides">Game Guide / Walkthrough</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Related Game</label>
                <select
                  value={newGameTag}
                  onChange={(e) => setNewGameTag(e.target.value)}
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="General">General Gaming Discussion</option>
                  {games.map(g => (
                    <option key={g.id} value={g.title}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Catchy headline for your post..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#66c0f4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share details, strategies, guides, or question..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#66c0f4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#66c0f4]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#202b3b] text-gray-300 text-xs font-bold rounded-xl border border-[#2a475e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#66c0f4] text-gray-950 text-xs font-black rounded-xl shadow cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
