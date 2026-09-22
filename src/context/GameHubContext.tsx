import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Game, 
  Review, 
  User, 
  CartItem, 
  Order, 
  CommunityPost, 
  NavigationPage, 
  PaymentMethod 
} from '../types';
import { 
  INITIAL_GAMES, 
  INITIAL_REVIEWS, 
  INITIAL_COMMUNITY_POSTS, 
  DEMO_USER, 
  DEMO_ADMIN, 
  INITIAL_ORDERS 
} from '../data/initialData';

interface GameHubContextType {
  // Navigation & Page State
  activePage: NavigationPage;
  goToPage: (page: NavigationPage, gameId?: string) => void;
  selectedGameId: string | null;
  viewGameDetail: (gameId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  
  // Games Catalog
  games: Game[];
  selectedGame: Game | null;
  addGame: (newGame: any) => void;
  updateGame: (gameId: string, fields: Partial<Game>) => void;
  deleteGame: (gameId: string) => void;

  // Currency & Formatting
  currency: 'USD' | 'IDR';
  setCurrency: (c: 'USD' | 'IDR') => void;
  formatPrice: (priceUSD: number) => string;
  formatDiscountPrice: (priceUSD: number, discountPct: number) => {
    original: string;
    final: string;
    savings: string;
    percentage: number;
    isFree: boolean;
  };

  // Auth & User
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => void;
  loginAsDemoUser: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (gameId: string) => void;
  removeFromCart: (gameId: string) => void;
  isInCart: (gameId: string) => boolean;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscountTotal: number;
  cartFinalTotal: number;

  // Wishlist
  wishlistGameIds: string[];
  addToWishlist: (gameId: string) => void;
  removeFromWishlist: (gameId: string) => void;
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;

  // Library & Gaming
  isOwned: (gameId: string) => boolean;
  isInstalled: (gameId: string) => boolean;
  isFavorite: (gameId: string) => boolean;
  toggleFavorite: (gameId: string) => void;
  installGame: (gameId: string) => void;
  uninstallGame: (gameId: string) => void;
  playGame: (gameId: string) => void;
  stopPlayingGame: () => void;
  currentlyPlayingGameId: string | null;
  playingDurationSeconds: number;

  // Orders & Checkout
  orders: Order[];
  processCheckout: (method: PaymentMethod, provider?: string) => Promise<Order>;
  lastCompletedOrder: Order | null;
  updateOrderStatus: (orderId: string, status: 'Completed' | 'Pending' | 'Refunded') => void;

  // Reviews
  reviews: Review[];
  addReview: (gameId: string, ratingScore: number, isPositive: boolean, comment: string) => void;
  voteReviewHelpful: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Community
  communityPosts: CommunityPost[];
  addCommunityPost: (post: { category: CommunityPost['category']; title: string; content: string; imageUrl?: string; gameTag?: string }) => void;
  likeCommunityPost: (postId: string) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const GameHubContext = createContext<GameHubContextType | undefined>(undefined);

const IDR_RATE = 15800; // 1 USD = 15,800 IDR

export const GameHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<NavigationPage>('store');
  const [selectedGameId, setSelectedGameId] = useState<string | null>('game-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Data collections (with localStorage fallback for demo persistence)
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('gamehub_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('gamehub_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('gamehub_posts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gamehub_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // User & Auth
  const [users, setUsers] = useState<User[]>([DEMO_USER, DEMO_ADMIN]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gamehub_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'IDR'>('USD');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gamehub_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Playing state
  const [currentlyPlayingGameId, setCurrentlyPlayingGameId] = useState<string | null>(null);
  const [playingDurationSeconds, setPlayingDurationSeconds] = useState(0);

  // Orders
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // Notification toast
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gamehub_games', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('gamehub_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gamehub_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('gamehub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gamehub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gamehub_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gamehub_cart', JSON.stringify(cart));
  }, [cart]);

  // Game timer simulation
  useEffect(() => {
    let interval: any;
    if (currentlyPlayingGameId) {
      interval = setInterval(() => {
        setPlayingDurationSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setPlayingDurationSeconds(0);
    }
    return () => clearInterval(interval);
  }, [currentlyPlayingGameId]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const goToPage = (page: NavigationPage, gameId?: string) => {
    if (gameId) {
      setSelectedGameId(gameId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewGameDetail = (gameId: string) => {
    setSelectedGameId(gameId);
    setActivePage('game-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedGame = games.find(g => g.id === selectedGameId) || games[0] || null;

  // Currency Formatter
  const formatPrice = (priceUSD: number): string => {
    if (priceUSD === 0) return 'Free';
    if (currency === 'IDR') {
      const idrAmount = Math.round(priceUSD * IDR_RATE);
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idrAmount);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceUSD);
  };

  const formatDiscountPrice = (priceUSD: number, discountPct: number) => {
    if (priceUSD === 0) {
      return { original: 'Free', final: 'Free to Play', savings: '$0', percentage: 0, isFree: true };
    }
    const finalUSD = discountPct > 0 ? priceUSD * (1 - discountPct / 100) : priceUSD;
    const savingsUSD = priceUSD - finalUSD;

    return {
      original: formatPrice(priceUSD),
      final: formatPrice(finalUSD),
      savings: formatPrice(savingsUSD),
      percentage: discountPct,
      isFree: false
    };
  };

  // Auth
  const login = (email: string, _pass: string): boolean => {
    if (email.toLowerCase().includes('admin')) {
      setCurrentUser(DEMO_ADMIN);
      setAuthModalOpen(false);
      showNotification(`Welcome back, ${DEMO_ADMIN.username}! (Admin)`);
      return true;
    }
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      setAuthModalOpen(false);
      showNotification(`Welcome back, ${matched.username}!`);
      return true;
    }
    // Allow login with demo user if fallback
    setCurrentUser(DEMO_USER);
    setAuthModalOpen(false);
    showNotification(`Welcome back, ${DEMO_USER.username}!`);
    return true;
  };

  const register = (username: string, email: string, _pass: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      username,
      email,
      avatar: `https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80`,
      role: 'user',
      walletBalance: 50.00,
      gamesOwned: ['game-1'],
      wishlist: ['game-3'],
      installedGames: ['game-1'],
      favoriteGames: ['game-1'],
      playtimeHours: { 'game-1': 1.2 },
      country: 'Indonesia',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    showNotification(`Account created! Welcome to Gacor, ${username}!`);
  };

  const loginAsDemoUser = () => {
    setCurrentUser(DEMO_USER);
    setAuthModalOpen(false);
    showNotification('Logged in as ' + DEMO_USER.username);
  };

  const loginAsAdmin = () => {
    setCurrentUser(DEMO_ADMIN);
    setAuthModalOpen(false);
    showNotification('Logged in with Admin privileges');
  };

  const logout = () => {
    setCurrentUser(null);
    showNotification('Logged out successfully');
  };

  // Cart operations
  const addToCart = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    if (currentUser?.gamesOwned.includes(gameId)) {
      showNotification(`You already own ${game.title} in your Library!`);
      return;
    }

    if (cart.some(item => item.gameId === gameId)) {
      showNotification(`${game.title} is already in your cart.`);
      return;
    }

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${gameId}`,
      gameId,
      game,
      addedAt: new Date().toISOString()
    };
    setCart(prev => [...prev, newItem]);
    showNotification(`Added ${game.title} to Cart`);
  };

  const removeFromCart = (gameId: string) => {
    setCart(prev => prev.filter(item => item.gameId !== gameId));
    showNotification('Item removed from cart');
  };

  const isInCart = (gameId: string) => cart.some(item => item.gameId === gameId);

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.game.price, 0);
  const cartFinalTotal = cart.reduce((sum, item) => {
    const discounted = item.game.price * (1 - item.game.discount / 100);
    return sum + discounted;
  }, 0);
  const cartDiscountTotal = cartSubtotal - cartFinalTotal;

  // Wishlist operations
  const wishlistGameIds = currentUser?.wishlist || [];

  const addToWishlist = (gameId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (currentUser.wishlist.includes(gameId)) return;

    const game = games.find(g => g.id === gameId);
    setCurrentUser(prev => prev ? {
      ...prev,
      wishlist: [...prev.wishlist, gameId]
    } : null);

    showNotification(`Added ${game?.title || 'Game'} to Wishlist`);
  };

  const removeFromWishlist = (gameId: string) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? {
      ...prev,
      wishlist: prev.wishlist.filter(id => id !== gameId)
    } : null);
    showNotification('Removed from Wishlist');
  };

  const toggleWishlist = (gameId: string) => {
    if (isInWishlist(gameId)) {
      removeFromWishlist(gameId);
    } else {
      addToWishlist(gameId);
    }
  };

  const isInWishlist = (gameId: string) => {
    return wishlistGameIds.includes(gameId);
  };

  // Library operations
  const isOwned = (gameId: string) => {
    return !!currentUser?.gamesOwned.includes(gameId);
  };

  const isInstalled = (gameId: string) => {
    return !!currentUser?.installedGames.includes(gameId);
  };

  const isFavorite = (gameId: string) => {
    return !!currentUser?.favoriteGames?.includes(gameId);
  };

  const toggleFavorite = (gameId: string) => {
    if (!currentUser) return;
    const isFav = currentUser.favoriteGames?.includes(gameId);
    const updated = isFav 
      ? currentUser.favoriteGames.filter(id => id !== gameId)
      : [...(currentUser.favoriteGames || []), gameId];
    
    setCurrentUser(prev => prev ? { ...prev, favoriteGames: updated } : null);
    showNotification(isFav ? 'Removed from Favorites' : 'Marked as Favorite');
  };

  const installGame = (gameId: string) => {
    if (!currentUser) return;
    const game = games.find(g => g.id === gameId);
    setCurrentUser(prev => prev ? {
      ...prev,
      installedGames: [...new Set([...prev.installedGames, gameId])]
    } : null);
    showNotification(`Installed ${game?.title || 'Game'} successfully! Ready to play.`);
  };

  const uninstallGame = (gameId: string) => {
    if (!currentUser) return;
    const game = games.find(g => g.id === gameId);
    setCurrentUser(prev => prev ? {
      ...prev,
      installedGames: prev.installedGames.filter(id => id !== gameId)
    } : null);
    showNotification(`Uninstalled ${game?.title || 'Game'}`);
  };

  const playGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!isInstalled(gameId)) {
      installGame(gameId);
    }
    setCurrentlyPlayingGameId(gameId);
    showNotification(`Launching ${game?.title || 'Game'}... Enjoy!`);
  };

  const stopPlayingGame = () => {
    if (currentlyPlayingGameId && currentUser) {
      const game = games.find(g => g.id === currentlyPlayingGameId);
      const hoursPlayed = (playingDurationSeconds / 3600);
      const currentHours = currentUser.playtimeHours[currentlyPlayingGameId] || 0;

      setCurrentUser(prev => prev ? {
        ...prev,
        playtimeHours: {
          ...prev.playtimeHours,
          [currentlyPlayingGameId]: Number((currentHours + Math.max(0.1, hoursPlayed)).toFixed(1))
        }
      } : null);
      showNotification(`Session finished for ${game?.title}. Progress saved.`);
    }
    setCurrentlyPlayingGameId(null);
  };

  // Checkout process
  const processCheckout = async (method: PaymentMethod, provider?: string): Promise<Order> => {
    if (!currentUser) {
      throw new Error('Please login to complete checkout');
    }
    if (cart.length === 0) {
      throw new Error('Your cart is empty');
    }

    const orderId = `ord-${Date.now()}`;
    const invoiceNum = `GH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderItems = cart.map(item => ({
      gameId: item.game.id,
      title: item.game.title,
      price: item.game.price,
      discount: item.game.discount,
      finalPrice: Number((item.game.price * (1 - item.game.discount / 100)).toFixed(2)),
      coverImage: item.game.coverImage
    }));

    const newOrder: Order = {
      id: orderId,
      invoiceNumber: invoiceNum,
      userId: currentUser.id,
      customerName: currentUser.username,
      customerEmail: currentUser.email,
      items: orderItems,
      subtotal: cartSubtotal,
      discountTotal: cartDiscountTotal,
      totalPrice: cartFinalTotal,
      paymentMethod: method,
      paymentProvider: provider,
      status: 'Completed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Add purchased games to user's library and remove from wishlist
    const purchasedGameIds = cart.map(c => c.gameId);
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        gamesOwned: [...new Set([...prev.gamesOwned, ...purchasedGameIds])],
        wishlist: prev.wishlist.filter(id => !purchasedGameIds.includes(id)),
        installedGames: [...new Set([...prev.installedGames, ...purchasedGameIds])] // automatically ready
      };
    });

    setOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: 'Completed' | 'Pending' | 'Refunded') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showNotification(`Order ${orderId} status updated to ${status}`);
  };

  // Review actions
  const addReview = (gameId: string, ratingScore: number, isPositive: boolean, comment: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      gameId,
      userId: currentUser.id,
      userName: currentUser.username,
      userAvatar: currentUser.avatar,
      isPositive,
      ratingScore,
      comment,
      createdAt: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      hoursPlayedAtReview: currentUser.playtimeHours[gameId] || 12.5
    };

    setReviews(prev => [newReview, ...prev]);

    // Update game rating statistics
    setGames(prev => prev.map(g => {
      if (g.id === gameId) {
        const newTotal = g.totalReviews + 1;
        const newPositive = g.positiveReviews + (isPositive ? 1 : 0);
        const newScore = Math.round((newPositive / newTotal) * 100);
        return {
          ...g,
          totalReviews: newTotal,
          positiveReviews: newPositive,
          ratingScore: newScore,
          ratingText: newScore >= 90 ? 'Overwhelmingly Positive' : newScore >= 80 ? 'Very Positive' : 'Mostly Positive'
        };
      }
      return g;
    }));

    showNotification('Your review has been published!');
  };

  const voteReviewHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    showNotification('Marked review as helpful!');
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showNotification('Review removed');
  };

  // Community
  const addCommunityPost = (post: { category: CommunityPost['category']; title: string; content: string; imageUrl?: string; gameTag?: string }) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.username,
      authorAvatar: currentUser.avatar,
      category: post.category,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      gameTag: post.gameTag || 'General',
      likes: 1,
      commentsCount: 0,
      createdAt: 'Just now'
    };

    setCommunityPosts(prev => [newPost, ...prev]);
    showNotification('Community post published successfully!');
  };

  const likeCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  // Admin Game Management
  const addGame = (newGameData: any) => {
    const id = `game-${Date.now()}`;
    const completeGame: Game = {
      ...newGameData,
      id,
      ratingScore: 90,
      ratingText: 'Very Positive',
      totalReviews: 10,
      positiveReviews: 9
    };
    setGames(prev => [completeGame, ...prev]);
    showNotification(`New game "${completeGame.title}" created in catalog!`);
  };

  const updateGame = (gameId: string, fields: Partial<Game>) => {
    setGames(prev => prev.map(g => g.id === gameId ? { ...g, ...fields } : g));
    showNotification(`Game updated successfully`);
  };

  const deleteGame = (gameId: string) => {
    setGames(prev => prev.filter(g => g.id !== gameId));
    showNotification(`Game deleted from catalog`);
  };

  return (
    <GameHubContext.Provider
      value={{
        activePage,
        goToPage,
        selectedGameId,
        viewGameDetail,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        games,
        selectedGame,
        addGame,
        updateGame,
        deleteGame,
        currency,
        setCurrency,
        formatPrice,
        formatDiscountPrice,
        currentUser,
        login,
        register,
        loginAsDemoUser,
        loginAsAdmin,
        logout,
        authModalOpen,
        setAuthModalOpen,
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        cartSubtotal,
        cartDiscountTotal,
        cartFinalTotal,
        wishlistGameIds,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        isOwned,
        isInstalled,
        isFavorite,
        toggleFavorite,
        installGame,
        uninstallGame,
        playGame,
        stopPlayingGame,
        currentlyPlayingGameId,
        playingDurationSeconds,
        orders,
        processCheckout,
        lastCompletedOrder,
        updateOrderStatus,
        reviews,
        addReview,
        voteReviewHelpful,
        deleteReview,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        notification,
        showNotification
      }}
    >
      {children}
    </GameHubContext.Provider>
  );
};

export const useGameHub = () => {
  const context = useContext(GameHubContext);
  if (!context) {
    throw new Error('useGameHub must be used within a GameHubProvider');
  }
  return context;
};
