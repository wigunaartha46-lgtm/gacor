import { Game, Review, User, CommunityPost, Order } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'game-1',
    title: 'Cyberpulse 2088: Neon Reckoning',
    tagline: 'An open-world cyberpunk thriller where neural implants determine survival.',
    description: 'Immerse yourself into Neo-Kyoto in a sprawling open-world action RPG. Hack synaptic networks, customize your cyberware, and make alliances with underground syndicates.',
    detailedDescription: `Step into Neo-Kyoto in 2088, where sovereign mega-corporations control the rain-slicked skies and street syndicates rule the subterranean alleys. As Jax Vance, a rogue cybernetic investigator framed for digital treason, you must navigate high-stakes corporate espionage and intense kinetic gunplay.

Key Features:
- Seamless Open World: Traverse towering megatowers, neon arcades, and underground bio-labs without loading screens.
- Modular Cyberware System: Over 140 neural modifications, reflex enhancers, and optical cloaks.
- Branching Narratives: 6 distinctive endings dictated by political allegiance and personal ethics.
- Dynamic Ray-Traced Audio & Visuals: Full HDR illumination with pulse-pounding synthwave soundtrack.`,
    developer: 'Synapse Dynamics Studio',
    publisher: 'Aether Interactive',
    price: 59.99,
    discount: 30, // on sale $41.99
    genres: ['Action', 'RPG', 'Open World', 'Cyberpunk'],
    platforms: ['Windows', 'macOS', 'Linux'],
    modes: ['Single Player'],
    releaseDate: '2025-11-14',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 94,
    ratingText: 'Very Positive',
    totalReviews: 24890,
    positiveReviews: 23400,
    tags: ['Cyberpunk', 'Story Rich', 'Action RPG', 'Sci-fi', 'Atmospheric'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        ram: '12 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580',
        storage: '85 GB SSD space'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-12700K / AMD Ryzen 7 7800X3D',
        ram: '32 GB RAM',
        gpu: 'NVIDIA GeForce RTX 4070 12GB / AMD Radeon RX 7800 XT',
        storage: '85 GB NVMe SSD space'
      }
    },
    isFeatured: true,
    isTopSeller: true,
    isDiscountEvent: true,
    discountEndsInHours: 42
  },
  {
    id: 'game-2',
    title: 'Eldritch Void: Shadows of Aethelgard',
    tagline: 'Defy ancient cosmic terrors in a punishing souls-like dark fantasy.',
    description: 'A grimdark action RPG challenging players to master brutal combat timings, explore shattered cathedrals, and harvest ancient titan blood.',
    detailedDescription: `Aethelgard has fallen into eternal twilight. As a Vessel of Ash, journey through ruined gothic citadels, subterranean crypts, and frozen mountain passes haunted by aberrations.

Combat Mechanics:
- Frame-Precision Parry & Stance Breaking: Timing is everything against 30+ unforgiving boss encounters.
- 12 Weapon Disciplines: Colossal swords, catalyst staves, scythes, and dual bleed daggers.
- Eldritch Invocations: Sacrifice sanity for cataclysmic arcane spells.`,
    developer: 'Grimthorn Games',
    publisher: 'Nocturne Entertainment',
    price: 69.99,
    discount: 15,
    genres: ['RPG', 'Action', 'Dark Fantasy', 'Souls-like'],
    platforms: ['Windows', 'Linux'],
    modes: ['Single Player', 'Co-op', 'Online PvP'],
    releaseDate: '2026-02-10',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 97,
    ratingText: 'Overwhelmingly Positive',
    totalReviews: 41200,
    positiveReviews: 40050,
    tags: ['Souls-like', 'Dark Fantasy', 'Difficult', 'Masterpiece', 'RPG'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1070 8GB',
        storage: '60 GB available space'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-10700 / AMD Ryzen 7 5800X',
        ram: '32 GB RAM',
        gpu: 'NVIDIA GeForce RTX 3080 10GB',
        storage: '60 GB SSD space'
      }
    },
    isFeatured: true,
    isTopSeller: true,
    isNewRelease: true
  },
  {
    id: 'game-3',
    title: 'Astra Frontier: Solar Vanguard',
    tagline: 'Command fleet formations and colonize uncharted planetary sectors in real-time 4X strategy.',
    description: 'Build your interstellar empire, research quantum warp tech, and command hundreds of armada capital ships in cinematic space warfare.',
    developer: 'Cosmic Forge Interactive',
    publisher: 'Stellar Gateways Corp',
    price: 44.99,
    discount: 50,
    genres: ['Strategy', 'Simulation', 'Sci-fi', 'Space'],
    platforms: ['Windows', 'macOS', 'Linux'],
    modes: ['Single Player', 'Multiplayer', 'Online PvP'],
    releaseDate: '2025-08-22',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 89,
    ratingText: 'Very Positive',
    totalReviews: 12500,
    positiveReviews: 11125,
    tags: ['4X', 'Space', 'Strategy', 'Multiplayer', 'Sci-fi'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit / macOS 12 Monterey',
        processor: 'Intel Core i3-9100 / Apple M1',
        ram: '8 GB RAM',
        gpu: 'GTX 960 / Metal compatible GPU',
        storage: '35 GB available space'
      },
      recommended: {
        os: 'Windows 11 64-bit / macOS Sonoma',
        processor: 'Intel Core i7-11700 / Apple M2 Pro',
        ram: '16 GB RAM',
        gpu: 'RTX 2060 / Metal 3',
        storage: '35 GB SSD'
      }
    },
    isFeatured: true,
    isDiscountEvent: true,
    discountEndsInHours: 18
  },
  {
    id: 'game-4',
    title: 'Apex Strike: Global Protocol',
    tagline: 'Precision tactical 5v5 FPS with destruction physics and high-stakes bomb defusal.',
    description: 'Competitive tactical shooter focusing on gunplay mastery, utility deployment, and dynamic site destruction. Free to download and play with seasonal esports operations.',
    developer: 'Vanguard Studios',
    publisher: 'Gacor Publishing',
    price: 0.00,
    discount: 0,
    genres: ['Action', 'Multiplayer', 'Casual', 'Sports'],
    platforms: ['Windows'],
    modes: ['Multiplayer', 'Online PvP', 'Co-op'],
    releaseDate: '2025-03-12',
    coverImage: 'https://images.unsplash.com/photo-1552824792-c07a3014a51e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1552824792-c07a3014a51e?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1552824792-c07a3014a51e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 91,
    ratingText: 'Very Positive',
    totalReviews: 89400,
    positiveReviews: 81350,
    tags: ['FPS', 'Tactical', 'Competitive', 'Multiplayer', 'Free to Play'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i3-6100 / AMD FX-6300',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 750 Ti 2GB',
        storage: '40 GB SSD'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i5-11400F / AMD Ryzen 5 5600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2060 6GB / GTX 1660 Super',
        storage: '40 GB NVMe'
      }
    },
    isTopSeller: true,
    isFreeToPlay: true
  },
  {
    id: 'game-5',
    title: 'Hollow Haven: Cozy Valley',
    tagline: 'Plant enchanted flora, craft artisanal elixirs, and befriend magical spirit villagers.',
    description: 'An idyllic life simulator packed with peaceful seasonal festivals, greenhouse optimization, cozy home decorating, and ancient spirit folklore.',
    developer: 'Moonlit Sprout',
    publisher: 'Wholesome Pixels',
    price: 19.99,
    discount: 20,
    genres: ['Simulation', 'Casual', 'Indie', 'Adventure'],
    platforms: ['Windows', 'macOS', 'Linux'],
    modes: ['Single Player', 'Co-op', 'Local Multiplayer'],
    releaseDate: '2026-01-05',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 98,
    ratingText: 'Overwhelmingly Positive',
    totalReviews: 18700,
    positiveReviews: 18320,
    tags: ['Cozy', 'Farming Sim', 'Relaxing', 'Crafting', 'Indie'],
    systemRequirements: {
      minimum: {
        os: 'Windows 7/8/10 or macOS 10.14',
        processor: '2.0 GHz Dual Core',
        ram: '4 GB RAM',
        gpu: 'Intel Iris Pro / GeForce 8800',
        storage: '4 GB available space'
      },
      recommended: {
        os: 'Windows 10/11 or macOS 13',
        processor: 'Quad Core 3.0 GHz',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 1050',
        storage: '4 GB SSD'
      }
    },
    isNewRelease: true
  },
  {
    id: 'game-6',
    title: 'Velocity X: Hyper Drift',
    tagline: 'High-octane arcade drift racing through rain-drenched coastal highways and mountain passes.',
    description: 'Customize over 90 tuned hypercars, master drifting physics at 200 MPH, and conquer online multiplayer touge time trials.',
    developer: 'Apex Horizon Labs',
    publisher: 'Velocity Media',
    price: 39.99,
    discount: 40,
    genres: ['Racing', 'Sports', 'Action'],
    platforms: ['Windows'],
    modes: ['Single Player', 'Multiplayer', 'Online PvP'],
    releaseDate: '2025-09-18',
    coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 86,
    ratingText: 'Very Positive',
    totalReviews: 8900,
    positiveReviews: 7650,
    tags: ['Racing', 'Automobile Sim', 'Arcade', 'Multiplayer', 'Fast-Paced'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-4460',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GTX 970',
        storage: '45 GB storage'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-8700K',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 3060',
        storage: '45 GB NVMe SSD'
      }
    },
    isDiscountEvent: true,
    discountEndsInHours: 24
  },
  {
    id: 'game-7',
    title: 'Phantasm 1986: Silent Echoes',
    tagline: 'Survive against psychotic cultists and paranormal horrors in an isolated VHS-style asylum.',
    description: 'Psychological survival horror using authentic retro analog grain filters, claustrophobic sound design, dynamic flashlight battery mechanics, and terrifying AI stalkers.',
    developer: 'Nightmare Logic',
    publisher: 'Dread Vault Works',
    price: 24.99,
    discount: 25,
    genres: ['Horror', 'Indie', 'Adventure'],
    platforms: ['Windows', 'Linux'],
    modes: ['Single Player'],
    releaseDate: '2025-10-31',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 92,
    ratingText: 'Very Positive',
    totalReviews: 6420,
    positiveReviews: 5900,
    tags: ['Horror', 'Psychological Horror', 'Survival Horror', 'Atmospheric'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        processor: 'Intel Core i5-6400',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1050 Ti',
        storage: '20 GB space'
      },
      recommended: {
        os: 'Windows 11',
        processor: 'Intel Core i7-9700',
        ram: '16 GB RAM',
        gpu: 'NVIDIA RTX 2060',
        storage: '20 GB SSD'
      }
    }
  },
  {
    id: 'game-8',
    title: 'Chronicles of Chronos: Rewind',
    tagline: 'Manipulate time, gravity, and quantum loops in mind-bending multidimensional puzzle chambers.',
    description: 'Winner of multiple indie innovation awards. Unravel the collapse of the temporal foundation with your chronometer glove, reversing physics and solving non-linear paradoxes.',
    developer: 'Paradox Loop Games',
    publisher: 'Quantum Prism',
    price: 14.99,
    discount: 0,
    genres: ['Puzzle', 'Indie', 'Strategy'],
    platforms: ['Windows', 'macOS', 'Linux'],
    modes: ['Single Player'],
    releaseDate: '2026-02-18',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 96,
    ratingText: 'Overwhelmingly Positive',
    totalReviews: 5300,
    positiveReviews: 5100,
    tags: ['Puzzle', 'Time Manipulation', 'Sci-fi', 'Indie', 'Singleplayer'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 / macOS 11',
        processor: '2.4 GHz Dual Core',
        ram: '4 GB RAM',
        gpu: 'Intel UHD 630 or better',
        storage: '8 GB'
      },
      recommended: {
        os: 'Windows 11 / macOS 13',
        processor: 'Quad Core 3.2 GHz',
        ram: '8 GB RAM',
        gpu: 'GTX 1060 / Apple Silicon',
        storage: '8 GB SSD'
      }
    },
    isNewRelease: true
  },
  {
    id: 'game-9',
    title: 'Mythic Arena: Clash of Champions',
    tagline: '5v5 legendary heroes battle for ancient power in competitive isometric action.',
    description: 'Select from 60+ divine demigods, tactical spellcasters, and mythical beasts in strategic lanes. Play 100% free with fair competitive balance.',
    developer: 'Rift Gate Studios',
    publisher: 'Gacor Publishing',
    price: 0.00,
    discount: 0,
    genres: ['Action', 'Strategy', 'Multiplayer'],
    platforms: ['Windows', 'macOS'],
    modes: ['Multiplayer', 'Online PvP', 'Co-op'],
    releaseDate: '2024-05-10',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ratingScore: 84,
    ratingText: 'Very Positive',
    totalReviews: 120400,
    positiveReviews: 101200,
    tags: ['MOBA', 'Free to Play', 'Competitive', 'Multiplayer', 'Strategy'],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 / macOS 11',
        processor: 'Intel Core i3-4150',
        ram: '6 GB RAM',
        gpu: 'Intel HD 4600 / GeForce GT 730',
        storage: '25 GB'
      },
      recommended: {
        os: 'Windows 11 / macOS 13',
        processor: 'Intel Core i5-8400',
        ram: '16 GB RAM',
        gpu: 'GTX 1650 4GB',
        storage: '25 GB SSD'
      }
    },
    isFreeToPlay: true,
    isTopSeller: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    gameId: 'game-1',
    userId: 'user-2',
    userName: 'Kenshiro_Gamer',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    isPositive: true,
    ratingScore: 5,
    comment: 'The environmental storytelling and neon lighting in Neo-Kyoto is hands down the best cyber atmosphere since Blade Runner. Combat feels crisp, especially the synaptic hacking abilities in mid-air dash!',
    createdAt: '2026-03-01',
    helpfulCount: 342,
    hoursPlayedAtReview: 58.4
  },
  {
    id: 'rev-2',
    gameId: 'game-1',
    userId: 'user-3',
    userName: 'Sari_Valkyrie',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    isPositive: true,
    ratingScore: 5,
    comment: 'Performance is surprisingly solid on mid-range hardware! Got 90fps on RTX 3060 with DLSS quality. Highly recommend doing all syndicate detective sidequests.',
    createdAt: '2026-02-26',
    helpfulCount: 189,
    hoursPlayedAtReview: 31.2
  },
  {
    id: 'rev-3',
    gameId: 'game-2',
    userId: 'user-1',
    userName: 'ArthaWiguna',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    isPositive: true,
    ratingScore: 5,
    comment: 'This game ruined other action RPGs for me. The parry timing is tight but completely fair. When you finally defeat the Archon of Cinders, the adrenaline rush is unmatched!',
    createdAt: '2026-02-15',
    helpfulCount: 512,
    hoursPlayedAtReview: 94.6
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    authorName: 'ArthaWiguna',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    category: 'guides',
    title: 'Complete Parrying & Boss Weakness Guide for Eldritch Void',
    content: 'After 100 hours in Aethelgard, here is the breakdown of all elemental affinities and poise threshold mechanics you need to defeat Chapter 3 bosses without taking damage.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gameTag: 'Eldritch Void: Shadows of Aethelgard',
    likes: 284,
    commentsCount: 46,
    createdAt: '2026-03-10'
  },
  {
    id: 'post-2',
    authorId: 'user-2',
    authorName: 'NeonDrifter',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    category: 'screenshots',
    title: 'Rain-soaked rooftop view at 4K Ultra Settings',
    content: 'Took this capture from the Zenith Megatower rooftop right after the sunset storm in Cyberpulse 2088.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    gameTag: 'Cyberpulse 2088: Neon Reckoning',
    likes: 412,
    commentsCount: 31,
    createdAt: '2026-03-14'
  },
  {
    id: 'post-3',
    authorId: 'admin-1',
    authorName: 'Gacor Editorial',
    authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    category: 'news',
    title: 'Gacor Spring Cyber Sale is Live! Save up to 75% on Top Titles',
    content: 'Our biggest seasonal event has launched! Featuring flash sales, community badges, and verified developer Q&A streams throughout the week.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    gameTag: 'Platform News',
    likes: 890,
    commentsCount: 125,
    createdAt: '2026-03-20'
  }
];

export const DEMO_USER: User = {
  id: 'user-1',
  username: 'ArthaWiguna',
  email: 'wigunaartha46@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=180&q=80',
  role: 'user',
  walletBalance: 125.50,
  gamesOwned: ['game-2', 'game-4'], // Eldritch Void & Apex Strike
  wishlist: ['game-1', 'game-3', 'game-5'], // Cyberpulse, Astra Frontier, Hollow Haven
  installedGames: ['game-2'],
  favoriteGames: ['game-2'],
  playtimeHours: {
    'game-2': 94.6,
    'game-4': 48.2
  },
  bio: 'PC enthusiast & souls-like combat aficionado. Exploring immersive worlds & competitive shooters.',
  country: 'Indonesia',
  createdAt: '2024-01-15'
};

export const DEMO_ADMIN: User = {
  id: 'admin-1',
  username: 'GacorAdmin',
  email: 'admin@gacor.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80',
  role: 'admin',
  walletBalance: 999.00,
  gamesOwned: ['game-1', 'game-2', 'game-3', 'game-4', 'game-5', 'game-6'],
  wishlist: [],
  installedGames: ['game-1'],
  favoriteGames: ['game-1'],
  playtimeHours: { 'game-1': 120.0 },
  bio: 'Gacor Storefront Operations & Catalog Curation Lead.',
  country: 'Global',
  createdAt: '2023-01-01'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    invoiceNumber: 'GH-2026-98124',
    userId: 'user-1',
    customerName: 'Artha Wiguna',
    customerEmail: 'wigunaartha46@gmail.com',
    items: [
      {
        gameId: 'game-2',
        title: 'Eldritch Void: Shadows of Aethelgard',
        price: 69.99,
        discount: 15,
        finalPrice: 59.49,
        coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 69.99,
    discountTotal: 10.50,
    totalPrice: 59.49,
    paymentMethod: 'QRIS',
    paymentProvider: 'QRIS Direct',
    status: 'Completed',
    createdAt: '2026-02-12'
  },
  {
    id: 'ord-1002',
    invoiceNumber: 'GH-2026-98311',
    userId: 'user-2',
    customerName: 'Kenshiro Tanaka',
    customerEmail: 'kenshiro@example.com',
    items: [
      {
        gameId: 'game-6',
        title: 'Velocity X: Hyper Drift',
        price: 39.99,
        discount: 40,
        finalPrice: 23.99,
        coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 39.99,
    discountTotal: 16.00,
    totalPrice: 23.99,
    paymentMethod: 'E-Wallet',
    paymentProvider: 'GoPay',
    status: 'Completed',
    createdAt: '2026-03-05'
  }
];
