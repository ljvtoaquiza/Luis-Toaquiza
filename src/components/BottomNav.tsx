import React from 'react';
import { TabType, ThemeMode } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: ThemeMode;
  pendingPaymentsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  theme,
  pendingPaymentsCount = 1
}) => {
  const isDark = theme === 'dark';

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'identity', label: 'Identity', icon: 'fingerprint' },
    { id: 'matches', label: 'Matches', icon: 'sports_soccer' },
    { id: 'payments', label: 'Payments', icon: 'payments' },
    { id: 'stats', label: 'Stats', icon: 'monitoring' },
  ];

  return (
    <nav 
      className={`fixed bottom-0 inset-x-0 z-50 pb-safe transition-colors duration-300 ${
        isDark 
          ? 'bg-[#1d2024]/90 backdrop-blur-xl border-t border-[#32353a]/80 shadow-[0_-2px_16px_rgba(0,0,0,0.4)]' 
          : 'bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:scale-95 ${
                isActive
                  ? isDark 
                    ? 'text-[#a2c9ff]' 
                    : 'text-[#1D3557]'
                  : isDark 
                    ? 'text-[#8b919c] hover:text-[#c1c7d2]' 
                    : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span 
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}
                >
                  {tab.icon}
                </span>

                {/* Badge for Payments */}
                {tab.id === 'payments' && pendingPaymentsCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#E07A5F] ring-2 ring-[#1d2024]" />
                )}
              </div>
              
              <span className={`text-[12px] mt-1 font-medium tracking-tight ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}>
                {tab.label}
              </span>

              {/* Active subtle pill indicator */}
              {isActive && (
                <div 
                  className={`absolute top-0 w-8 h-1 rounded-full ${
                    isDark ? 'bg-[#a2c9ff]' : 'bg-[#1D3557]'
                  }`} 
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
