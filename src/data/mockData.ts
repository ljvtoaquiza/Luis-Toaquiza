import { PlayerProfile, MatchItem, PaymentItem, TransactionHistoryItem, ReceiptData, PlayerStats } from '../types';

export const INITIAL_PLAYER: PlayerProfile = {
  name: 'Carlos Ruiz',
  position: 'Forward',
  club: 'Leones F.C.',
  passId: 'CR-8472-A',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_OIzI0NIs71mOftF-_IfzXyY-_IgpY_WN6F35e_SpWkAMLIVQrnZ_F-Fx30Z4VORJO0OEpa6S3D-Wd1cUGrexoX2xxN7OTKHgvu5j2eNXy-FxkFELMuZW1Nx2WQ3tt_SMoBRydN08OMl5rZ5Mx7nQKXrHXWWR85xKQm_C1iHkvL8GvlqUTWUljwPjGpvHxY_12-bheJ8Yyyt4H1zob_pcd-XshUcGK4J04TCKTmKHdYGw1xseloAHA',
  qrUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU46SPozoBvsN-L6zjJqhf9VfhLkHPWkYfPr9FJOa-_pf3qTFG7TzvHtYGqg5RM77Vqtt-hFW0O3CcTG541ScDrXTVOjXkt3pAPxbldItTzFgvXTY8gphpZw32KsSnpZA44RJHjXpPOTnpgJd6QA75DtkK-Mvi-wJVcUcaL2OSJzlL6T-1c-bDEgo13UsMENfYNj3CTo-dfQWjZg4C7karcqo8TrEJrMle1AV9VSagRokjhyHVN3V39g',
  qrFingerprintUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU46SPozoBvsN-L6zjJqhf9VfhLkHPWkYfPr9FJOa-_pf3qTFG7TzvHtYGqg5RM77Vqtt-hFW0O3CcTG541ScDrXTVOjXkt3pAPxbldItTzFgvXTY8gphpZw32KsSnpZA44RJHjXpPOTnpgJd6QA75DtkK-Mvi-wJVcUcaL2OSJzlL6T-1c-bDEgo13UsMENfYNj3CTo-dfQWjZg4C7karcqo8TrEJrMle1AV9VSagRokjhyHVN3V39g',
  verified: true,
  status: 'ACTIVE',
  leagueName: 'INTERLIGAS VERIFIED',
  number: 8,
  dorsal: '08 - DELANTERO',
  emergencyContact: '+593 99 876 5432',
  validUntil: 'Diciembre 2026',
  bloodType: 'O+'
};

export const INITIAL_MATCHES: MatchItem[] = [
  {
    id: 'm1',
    homeTeam: {
      name: 'Leones F.C.',
      shortName: 'Leones F.C.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsRt3uqj3I2E5VfvRz_lma81uEWNHVrZ11EMunrrOvugYxpippTlptB49HyoxRmmbtBbtTBbaZZrPTZBA8epk0rMyuwaK9A_BwwVL09p5UXqPyawTc8GAEtjhZfAubuvIpYWH8_Eh_ZjBqqc3VjFOS3c63uvUxpdirPV-nVb58WO-qH6SyD9aN3tkRgKkGCSxDLf71l7kuO_60cmfC31C0t23eltwRu94UQ2o5ORKTEfhw4AZoHxeZfg'
    },
    awayTeam: {
      name: 'Águilas Reales',
      shortName: 'Águilas R.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3IwupXlAIpsBnu9fx8I0-njADeAIMrR_OIhkJwCnKOCxaA6NUwpHpjf3pSateid-u4jSpqQscs3he4X871yLf4aFQwqFYQcfRm8DJwUCeh9amunpfVK7sFOuhu1FUlex2xOsG_XbnOnY24anFbrEFSZkB2ncr5WX0AhZOAAAw5Zw38eKC9TSUN7AfBJp_vzINir1T7ShtmQgHqgvGMzhvMq-RrlCiQtKxNaI05xBEj0lPVtm2lvtVvg'
    },
    dateText: 'Sáb, 14 Oct',
    timeText: '10:00 AM',
    venue: 'Cancha 1 - Sede Ppal.',
    status: 'SCHEDULED',
    details: {
      referee: 'Marco Antonio Rodríguez',
      fieldNumber: 'Cancha 1 (Césped Sintético)',
      surface: 'Sintética Grado FIFA 2',
      weather: 'Soleado - 24°C',
      temperature: '24°C',
      kitHomeColor: 'Azul Marino / Dorado',
      kitAwayColor: 'Blanco / Plateado',
      myStatus: 'CONFIRMED'
    }
  },
  {
    id: 'm2',
    homeTeam: {
      name: 'Rayos F.C.',
      shortName: 'Rayos F.C.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBshauvvfG7_GojZJvsDFOP1w-LT_OC1sk2RhFdtCogmHkyR799aQILY_xY_xoP7D6L58MVRO4CYqv3xk_K93V0XAgG5FO3a4r_dOnrd_QMZYwODrPlWLXh8KHi-xeXpMMvcowNFYxW2vNrV0ikl4uoEDDqCTXWuUrjjRdipAWCRDjo2gNDK_XCU9yLDV9m1isGR8DcbXOAifERITc2Ox68PnYp_9YXoe6Q1JUsFNkzuMblIBhZgV_ZSg'
    },
    awayTeam: {
      name: 'Leones F.C.',
      shortName: 'Leones F.C.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgQ9QUAPJh2EnJXzRRjNYK0HByYOnFK49ILiE8yXLd81gJEUNQth0MydH_Vxq_SMZvdlmFyOxJbCLVePo13hCo6sYsauo4xuXdApVSNvkyfSuyEO5BYwK9ExDD0UCSAS-13ikXFYjtDStanrkSRKwa5eprF_hJcvojLsZWqR90JvXyjA15dDc9qL38KToZpu19ZqvRsTv3678dMEnoC9HhpBLsnjpak05A1XKzUi9gMYJlNNgtODWSUQ'
    },
    dateText: 'Dom, 22 Oct',
    timeText: '18:30 PM',
    venue: 'Cancha 3 - Norte',
    status: 'SCHEDULED',
    details: {
      referee: 'Guillermo Guerrero',
      fieldNumber: 'Cancha 3 (Iluminación LED)',
      surface: 'Césped Natural',
      weather: 'Despejado - 19°C',
      temperature: '19°C',
      kitHomeColor: 'Negro / Cyan',
      kitAwayColor: 'Azul Marino / Dorado',
      myStatus: 'PENDING'
    }
  },
  {
    id: 'm3',
    homeTeam: {
      name: 'Por Definir',
      shortName: 'TBD'
    },
    awayTeam: {
      name: 'Leones F.C.',
      shortName: 'Leones F.C.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5fOKb_3B--_GYuTdE6qYFjMC_P3S2OLLRFL_zgFnB09vfErIkLD-Ge-x_jsFZ84geYFuyjnayQIPKoVJefD9XrtKwI82rwMgUhf8dlmQMX9Eoi82yV6K-aX8ymLchVtWVayqStcJxcb8xL0rTVu5mqayVlon10l20t9NNbqkrf_Igu1zUM5xt0BMoHbVN3wRR00qEH-LHiFzNvdMEkBp2JyT4mlPKnlEOLfAgDV1ic-EWOika3DQIJQ'
    },
    dateText: 'Jue, 26 Oct',
    timeText: '20:00 PM',
    venue: 'Por definir',
    status: 'TBD',
    details: {
      referee: 'Por asignar',
      fieldNumber: 'Sede Central - Cancha Principal',
      surface: 'Sintética Pro',
      weather: 'Templado - 18°C',
      temperature: '18°C',
      kitHomeColor: 'TBD',
      kitAwayColor: 'Azul Marino',
      myStatus: 'PENDING'
    }
  }
];

export const INITIAL_RECEIPT: ReceiptData = {
  receiptId: '#8492',
  title: 'Recibo #8492',
  status: 'Completado',
  date: '12 Oct 2024, 18:45',
  items: [
    { name: 'Vocalía - J12', price: 5.00 },
    { name: 'Abono Multa (Tarjetas)', price: 10.00 }
  ],
  total: 15.00,
  paymentMethod: 'Deuna! Conectado',
  qrUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbJWlXBVyyYJGf9KeacRQU2rz1kHLvYcY6xAvNa9xkvWn4ZNRrGd4X6nysAFWL-6agXQ0i_9lmY_rFXHpw1EP687X4yuJaCueoB72GdKzHz4d8ZQNGmGLIMq5kCFcm68jsblTkDTnweQzwFX8Vyy_KMklwgoGzqPvXkWcJMF7tHmIJKsl8UmOW2ChJUS_oQ39ynVbKe2Vq8DH5LSga9r0a53dnrrUaZZQ1kjlpA5FjyCNrmaYJHlSI_g'
};

export const INITIAL_TRANSACTIONS: TransactionHistoryItem[] = [
  {
    id: 'tx-1',
    title: 'Multa J14',
    timestamp: 'Hoy, 10:30 AM',
    amount: 15.00,
    status: 'Pendiente',
    type: 'multa'
  },
  {
    id: 'tx-2',
    title: 'Pago Semanal',
    timestamp: '12 Oct, 18:45',
    amount: 15.00,
    status: 'Completado',
    type: 'abono'
  },
  {
    id: 'tx-3',
    title: 'Inscripción Torneo Clausura',
    timestamp: '01 Oct, 09:15',
    amount: 25.00,
    status: 'Pendiente',
    type: 'inscripcion'
  },
  {
    id: 'tx-4',
    title: 'Vocalía J11',
    timestamp: '28 Sep, 17:30',
    amount: 5.00,
    status: 'Completado',
    type: 'vocalia'
  }
];

export const INITIAL_STATS: PlayerStats = {
  season: 'Season 2024',
  league: 'Fall League',
  fairPlayScore: 92,
  leagueRankPercentile: 5,
  goals: 14,
  goalsThisWeek: 2,
  assists: 8,
  matchesPlayed: 22,
  yellowCards: 2,
  redCards: 0,
  recentRatings: [
    { match: 'J10', vs: 'FC Halcones', rating: 7.2, date: '15 Sep', goals: 0, assists: 1 },
    { match: 'J11', vs: 'Atlético Sur', rating: 8.1, date: '22 Sep', goals: 1, assists: 0 },
    { match: 'J12', vs: 'Titanes', rating: 7.8, date: '29 Sep', goals: 1, assists: 1 },
    { match: 'J13', vs: 'Sparta FC', rating: 9.2, date: '05 Oct', goals: 2, assists: 1 },
    { match: 'J14', vs: 'FC Riverdale', rating: 9.5, date: '12 Oct', goals: 3, assists: 1 }
  ],
  lastReferee: {
    name: 'Árbitro Principal',
    match: 'Vs. FC Riverdale',
    date: 'Oct 12'
  }
};
