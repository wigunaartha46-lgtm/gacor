export interface SystemSpec {
  os: string;
  processor: string;
  ram: string;
  gpu: string;
  storage: string;
}

export interface SystemRequirements {
  minimum: SystemSpec;
  recommended: SystemSpec;
}

export type Platform = 'Windows' | 'macOS' | 'Linux';

export type GameMode = 'Single Player' | 'Multiplayer' | 'Co-op' | 'Online PvP' | 'Local Multiplayer';

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription?: string;
  developer: string;
  publisher: string;
  price: number; // in USD (or formatted as IDR / USD)
  discount: number; // percentage (0 - 100)
  genres: string[];
  platforms: Platform[];
  modes: GameMode[];
  releaseDate: string;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  trailerUrl: string;
  ratingScore: number; // e.g. 94 (percentage)
  ratingText: string; // e.g. "Overwhelmingly Positive"
  totalReviews: number;
  positiveReviews: number;
  tags: string[];
  systemRequirements: SystemRequirements;
  isFeatured?: boolean;
  isTopSeller?: boolean;
  isNewRelease?: boolean;
  isDiscountEvent?: boolean;
  isFreeToPlay?: boolean;
  discountEndsInHours?: number;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isPositive: boolean;
  ratingScore: number; // 1-5
  comment: string;
  createdAt: string;
  helpfulCount: number;
  hoursPlayedAtReview: number;
}

export interface CartItem {
  id: string;
  gameId: string;
  game: Game;
  addedAt: string;
}

export type PaymentMethod = 'QRIS' | 'E-Wallet' | 'Bank Transfer' | 'Credit/Debit Card';

export interface Order {
  id: string;
  invoiceNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: {
    gameId: string;
    title: string;
    price: number;
    discount: number;
    finalPrice: number;
    coverImage: string;
  }[];
  subtotal: number;
  discountTotal: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentProvider?: string; // e.g. "BCA", "GoPay", "Visa"
  status: 'Completed' | 'Pending' | 'Refunded';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  walletBalance: number;
  gamesOwned: string[]; // game IDs
  wishlist: string[]; // game IDs
  installedGames: string[]; // game IDs
  favoriteGames: string[]; // game IDs
  playtimeHours: Record<string, number>; // gameId -> hours
  bio?: string;
  country?: string;
  createdAt: string;
}

export type CommunityCategory = 'all' | 'discussion' | 'screenshots' | 'artwork' | 'guides' | 'news';

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  category: 'discussion' | 'screenshots' | 'artwork' | 'guides' | 'news';
  title: string;
  content: string;
  imageUrl?: string;
  gameTag?: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
}

export type NavigationPage = 
  | 'store' 
  | 'catalog' 
  | 'game-detail' 
  | 'wishlist' 
  | 'cart' 
  | 'checkout' 
  | 'library' 
  | 'community' 
  | 'profile' 
  | 'admin'
  | 'about';
