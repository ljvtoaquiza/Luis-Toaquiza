export type TabType = 'identity' | 'matches' | 'payments' | 'stats';

export type ThemeMode = 'dark' | 'light';

export interface PlayerProfile {
  name: string;
  position: string;
  club: string;
  passId: string;
  avatarUrl: string;
  qrUrl: string;
  qrFingerprintUrl: string;
  verified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  leagueName: string;
  number: number;
  dorsal: string;
  emergencyContact: string;
  validUntil: string;
  bloodType: string;
}

export interface MatchItem {
  id: string;
  homeTeam: {
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  dateText: string;
  timeText: string;
  venue: string;
  status: 'SCHEDULED' | 'TBD' | 'COMPLETED' | 'LIVE';
  score?: {
    home: number;
    away: number;
  };
  details: {
    referee: string;
    fieldNumber: string;
    surface: string;
    weather: string;
    temperature: string;
    kitHomeColor: string;
    kitAwayColor: string;
    myStatus: 'CONFIRMED' | 'DECLINED' | 'PENDING';
  };
}

export interface PaymentItem {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'vocalia' | 'multa' | 'inscripcion' | 'otro';
  status: 'PENDING' | 'COMPLETED' | 'PROCESSING';
  dateText: string;
  category: string;
}

export interface TransactionHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  amount: number;
  status: 'Pendiente' | 'Completado';
  type: 'multa' | 'vocalia' | 'abono' | 'inscripcion';
}

export interface ReceiptData {
  receiptId: string;
  title: string;
  status: string;
  date: string;
  items: {
    name: string;
    price: number;
  }[];
  total: number;
  qrUrl: string;
  paymentMethod: string;
}

export interface PlayerStats {
  season: string;
  league: string;
  fairPlayScore: number;
  leagueRankPercentile: number;
  goals: number;
  goalsThisWeek: number;
  assists: number;
  matchesPlayed: number;
  yellowCards: number;
  redCards: number;
  recentRatings: {
    match: string;
    vs: string;
    rating: number;
    date: string;
    goals: number;
    assists: number;
  }[];
  lastReferee: {
    name: string;
    match: string;
    date: string;
  };
}
