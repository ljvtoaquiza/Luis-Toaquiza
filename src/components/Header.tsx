import React from 'react';
import { ThemeMode, PlayerProfile } from '../types';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  player: PlayerProfile;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  player,
  onOpenProfile
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
      isDark 
        ? 'bg-[#111418]/80 backdrop-blur-xl border-b border-[#272a2f]/60 shadow-[0_1px_12px_rgba(0,0,0,0.3)]' 
        : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
    } pt-safe`}>
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b5fa5] to-[#1D3557] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[20px]">sports_soccer</span>
          </div>
          <h1 className={`text-xl font-bold tracking-tight ${
            isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
          }`}>
            SocialSoccer
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isDark 
                ? 'bg-[#1d2024] text-[#a2c9ff] hover:bg-[#272a2f] border border-[#32353a]' 
                : 'bg-gray-100 text-[#1D3557] hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            id="profile-header-btn"
            onClick={onOpenProfile}
            aria-label="Ver perfil de jugador"
            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all active:scale-95 flex items-center justify-center ${
              isDark 
                ? 'border-[#a2c9ff]/40 bg-[#0b5fa5] shadow-sm shadow-[#a2c9ff]/20' 
                : 'border-[#1D3557]/30 bg-[#1D3557] shadow-sm'
            }`}
          >
            {player.avatarUrl ? (
              <img 
                src={player.avatarUrl} 
                alt={player.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
