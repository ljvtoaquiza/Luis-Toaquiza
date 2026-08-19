import React, { useState } from 'react';
import { MatchItem, ThemeMode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sun, 
  ChevronRight, 
  Shield, 
  UserCheck, 
  X, 
  Check, 
  AlertCircle,
  Shirt,
  Navigation
} from 'lucide-react';

interface MatchesTabProps {
  matches: MatchItem[];
  theme: ThemeMode;
  onUpdateMatchRSVP: (matchId: string, status: 'CONFIRMED' | 'DECLINED' | 'PENDING') => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ 
  matches, 
  theme,
  onUpdateMatchRSVP 
}) => {
  const isDark = theme === 'dark';
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'LEAGUE'>('ALL');

  const filteredMatches = matches.filter(m => {
    if (filter === 'CONFIRMED') return m.details?.myStatus === 'CONFIRMED';
    return true;
  });

  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Header Section */}
      <div className="px-4 pt-4 pb-4 z-10 relative max-w-md mx-auto w-full">
        <div className="flex flex-col gap-1 text-left">
          <h1 className={`text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
          }`}>
            Próximos Partidos
          </h1>
          <p className={`text-sm leading-relaxed ${
            isDark ? 'text-[#c1c7d2]' : 'text-slate-500'
          }`}>
            Tu calendario de juego para las próximas semanas.
          </p>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'ALL'
                ? isDark ? 'bg-[#a2c9ff] text-[#00315b]' : 'bg-[#1D3557] text-white shadow-sm'
                : isDark ? 'bg-[#1d2024] text-gray-400 border border-[#32353a]' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Todos ({matches.length})
          </button>
          <button
            onClick={() => setFilter('CONFIRMED')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'CONFIRMED'
                ? isDark ? 'bg-[#a2c9ff] text-[#00315b]' : 'bg-[#1D3557] text-white shadow-sm'
                : isDark ? 'bg-[#1d2024] text-gray-400 border border-[#32353a]' : 'bg-gray-100 text-gray-600'
            }`}
          >
            ✓ Confirmados
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-4 flex flex-col gap-4 relative z-10 pb-6 max-w-md mx-auto w-full">
        {/* Weather Alert Banner */}
        <div className={`rounded-xl p-3 flex items-center gap-3 shadow-sm relative overflow-hidden backdrop-blur-md border ${
          isDark 
            ? 'bg-[#0b5fa5]/15 border-[#0b5fa5]/30' 
            : 'bg-[#1D3557]/10 border-[#1D3557]/15'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
            isDark ? 'bg-[#0b5fa5] text-white' : 'bg-[#1D3557]/20 text-[#1D3557]'
          }`}>
            <Sun className="w-5 h-5 text-amber-400 animate-[spin_12s_linear_infinite]" />
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-sm font-bold ${
              isDark ? 'text-[#e1e2e9]' : 'text-[#1D3557]'
            }`}>
              Condiciones Ideales
            </span>
            <span className={`text-xs ${
              isDark ? 'text-[#c1c7d2]' : 'text-slate-500'
            }`}>
              Soleado - Perfecto para jugar
            </span>
          </div>
          <div className="ml-auto shrink-0 mr-1">
            <span className={`text-sm font-extrabold ${
              isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
            }`}>
              24°C
            </span>
          </div>
        </div>

        {/* Match List */}
        <div className="flex flex-col gap-4">
          {filteredMatches.map((match, idx) => {
            const isTBD = match.status === 'TBD';
            const isFirst = idx === 0;

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-2xl shadow-md flex flex-col overflow-hidden border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#1d2024] border-[#32353a] hover:border-[#414751]'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                } ${isTBD ? 'opacity-70' : ''}`}
              >
                {/* Top Status Bar Color Accent */}
                <div 
                  className={`h-1 w-full ${
                    isFirst 
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#F4A261]' 
                      : isTBD 
                        ? 'bg-gray-400 dark:bg-[#414751]' 
                        : 'bg-[#0b5fa5] dark:bg-[#a2c9ff]'
                  }`} 
                />

                <div className="p-4 flex flex-col gap-4">
                  {/* Teams Row */}
                  <div className="flex justify-between items-center px-1">
                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden p-1 shadow-inner border ${
                        isDark ? 'bg-[#272a2f] border-[#32353a]' : 'bg-gray-100 border-gray-200'
                      }`}>
                        {match.homeTeam.logoUrl ? (
                          <img 
                            src={match.homeTeam.logoUrl} 
                            alt={match.homeTeam.name} 
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-[24px] text-gray-400">help</span>
                        )}
                      </div>
                      <span className={`text-xs font-bold text-center leading-tight line-clamp-1 ${
                        isDark ? 'text-[#e1e2e9]' : 'text-[#1D3557]'
                      }`}>
                        {match.homeTeam.shortName}
                      </span>
                    </div>

                    {/* Date / Time Central Pill */}
                    <div className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl shadow-inner border ${
                      isDark 
                        ? 'bg-[#111418] border-[#32353a]' 
                        : 'bg-gray-100 border-gray-200'
                    }`}>
                      <span className={`text-[11px] font-semibold ${
                        isDark ? 'text-[#c1c7d2]' : 'text-slate-500'
                      }`}>
                        {match.dateText}
                      </span>
                      <span className={`text-lg font-extrabold tracking-tight ${
                        isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
                      }`}>
                        {match.timeText}
                      </span>
                      {match.details?.myStatus === 'CONFIRMED' && (
                        <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 mt-0.5">
                          <Check className="w-2.5 h-2.5" /> Asistencia OK
                        </span>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden p-1 shadow-inner border ${
                        isDark ? 'bg-[#272a2f] border-[#32353a]' : 'bg-gray-100 border-gray-200'
                      }`}>
                        {match.awayTeam.logoUrl ? (
                          <img 
                            src={match.awayTeam.logoUrl} 
                            alt={match.awayTeam.name} 
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-[24px] text-gray-400">help</span>
                        )}
                      </div>
                      <span className={`text-xs font-bold text-center leading-tight line-clamp-1 ${
                        isDark ? 'text-[#e1e2e9]' : 'text-[#1D3557]'
                      }`}>
                        {match.awayTeam.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Location & Action Bottom */}
                  <div className={`flex justify-between items-center p-2.5 rounded-xl border ${
                    isDark 
                      ? 'bg-[#111418] border-[#32353a]' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-[#F4A261] shrink-0" />
                      <span className="text-xs font-medium truncate max-w-[170px]">
                        {match.venue}
                      </span>
                    </div>

                    {isTBD ? (
                      <button 
                        disabled
                        className="bg-gray-200 dark:bg-[#32353a] text-gray-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed"
                      >
                        Pronto
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedMatch(match)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-all ${
                          isDark
                            ? 'bg-[#0b5fa5] text-white hover:bg-[#0e60a6]'
                            : 'bg-[#1D3557] text-white hover:bg-[#152741]'
                        }`}
                      >
                        Detalles
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Match Details Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className={`w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 overflow-y-auto max-h-[90vh] shadow-2xl border ${
                isDark 
                  ? 'bg-[#1d2024] border-[#32353a] text-[#e1e2e9]' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-[#32353a]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4A261]">
                    Ficha Técnica del Partido
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {selectedMatch.homeTeam.shortName} vs {selectedMatch.awayTeam.shortName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Match overview */}
              <div className="my-4 p-4 rounded-xl bg-gray-50 dark:bg-[#111418] border border-gray-200 dark:border-[#32353a] flex justify-around items-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-1 overflow-hidden">
                    <img src={selectedMatch.homeTeam.logoUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold">{selectedMatch.homeTeam.shortName}</span>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-500 font-semibold">{selectedMatch.dateText}</div>
                  <div className="text-lg font-black text-[#0b5fa5] dark:text-[#a2c9ff]">{selectedMatch.timeText}</div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Oficial Liga</div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-1 overflow-hidden">
                    <img src={selectedMatch.awayTeam.logoUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold">{selectedMatch.awayTeam.shortName}</span>
                </div>
              </div>

              {/* Match specs */}
              <div className="space-y-2.5 text-xs text-left">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#191c20]">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" /> Sede y Cancha:
                  </span>
                  <span className="font-semibold">{selectedMatch.details.fieldNumber}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#191c20]">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-blue-500" /> Árbitro Principal:
                  </span>
                  <span className="font-semibold">{selectedMatch.details.referee}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#191c20]">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-500" /> Clima estimado:
                  </span>
                  <span className="font-semibold">{selectedMatch.details.weather}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-[#191c20]">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Shirt className="w-4 h-4 text-indigo-500" /> Uniforme Asignado:
                  </span>
                  <span className="font-semibold">{selectedMatch.details.kitHomeColor}</span>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-[#32353a]">
                <span className="text-xs font-bold block mb-2 text-left">
                  Tu Asistencia para este encuentro:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onUpdateMatchRSVP(selectedMatch.id, 'CONFIRMED');
                      setSelectedMatch(null);
                    }}
                    className="bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
                  >
                    <Check className="w-4 h-4" /> Voy a Jugar
                  </button>
                  <button
                    onClick={() => {
                      onUpdateMatchRSVP(selectedMatch.id, 'DECLINED');
                      setSelectedMatch(null);
                    }}
                    className="bg-gray-200 dark:bg-[#272a2f] text-gray-700 dark:text-gray-300 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <X className="w-4 h-4" /> No Podré Asistir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
