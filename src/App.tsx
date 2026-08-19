/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, ThemeMode, PlayerProfile, MatchItem, TransactionHistoryItem } from './types';
import { 
  INITIAL_PLAYER, 
  INITIAL_MATCHES, 
  INITIAL_RECEIPT, 
  INITIAL_TRANSACTIONS, 
  INITIAL_STATS 
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { IdentityTab } from './components/IdentityTab';
import { MatchesTab } from './components/MatchesTab';
import { PaymentsTab } from './components/PaymentsTab';
import { StatsTab } from './components/StatsTab';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('identity');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [player, setPlayer] = useState<PlayerProfile>(INITIAL_PLAYER);
  const [matches, setMatches] = useState<MatchItem[]>(INITIAL_MATCHES);
  const [balance, setBalance] = useState<number>(45.00);
  const [transactions, setTransactions] = useState<TransactionHistoryItem[]>(INITIAL_TRANSACTIONS);
  const [receipt, setReceipt] = useState(INITIAL_RECEIPT);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Sync document theme classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.style.backgroundColor = '#111418';
      document.body.style.color = '#e1e2e9';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#111827';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUpdateMatchRSVP = (matchId: string, status: 'CONFIRMED' | 'DECLINED' | 'PENDING') => {
    setMatches(prev => 
      prev.map(m => m.id === matchId ? {
        ...m,
        details: { ...m.details, myStatus: status }
      } : m)
    );
  };

  const handlePayBalance = (paidAmount: number, method: string) => {
    setBalance(0);
    const newTx: TransactionHistoryItem = {
      id: `tx-${Date.now()}`,
      title: 'Pago Total Liquidación',
      timestamp: 'Hoy, Recién pagado',
      amount: paidAmount,
      status: 'Completado',
      type: 'abono'
    };
    setTransactions(prev => [newTx, ...prev]);
    setReceipt(prev => ({
      ...prev,
      receiptId: `#${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Hoy, Recién pagado',
      total: paidAmount,
      paymentMethod: method,
      status: 'Completado'
    }));
  };

  const handleUpdatePlayer = (updated: Partial<PlayerProfile>) => {
    setPlayer(prev => ({ ...prev, ...updated }));
  };

  const pendingPaymentsCount = balance > 0 ? 1 : 0;

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#111418] text-[#e1e2e9]' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        player={player}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 pb-20 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
          {activeTab === 'identity' && (
            <IdentityTab player={player} theme={theme} />
          )}

          {activeTab === 'matches' && (
            <MatchesTab 
              matches={matches} 
              theme={theme} 
              onUpdateMatchRSVP={handleUpdateMatchRSVP}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsTab
              balance={balance}
              receipt={receipt}
              transactions={transactions}
              theme={theme}
              onPayBalance={handlePayBalance}
            />
          )}

          {activeTab === 'stats' && (
            <StatsTab stats={stats} theme={theme} />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        pendingPaymentsCount={pendingPaymentsCount}
      />

      {/* Profile & Settings Modal */}
      <ProfileModal
        player={player}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onUpdatePlayer={handleUpdatePlayer}
        theme={theme}
      />
    </div>
  );
}
