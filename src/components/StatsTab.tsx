import React, { useState } from 'react';
import { PlayerStats, ThemeMode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  TrendingUp, 
  Flag, 
  Calendar, 
  Gavel, 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Users,
  Trophy
} from 'lucide-react';

interface StatsTabProps {
  stats: PlayerStats;
  theme: ThemeMode;
}

export const StatsTab: React.FC<StatsTabProps> = ({ stats, theme }) => {
  const isDark = theme === 'dark';
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [refereeComment, setRefereeComment] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [activeTooltipIdx, setActiveTooltipIdx] = useState<number | null>(null);
  const [showSeasonAwards, setShowSeasonAwards] = useState(false);

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStar === 0) {
      alert('Por favor selecciona una calificación de 1 a 5 estrellas.');
      return;
    }
    setIsSubmittingRating(true);
    setTimeout(() => {
      setIsSubmittingRating(false);
      setRatingSubmitted(true);
      setTimeout(() => {
        setRatingSubmitted(false);
        setSelectedStar(0);
        setRefereeComment('');
      }, 4000);
    }, 1000);
  };

  // Fair play circular gauge calculations
  const circumference = 2 * Math.PI * 40; // ~251.3
  const strokeDashoffset = circumference - (stats.fairPlayScore / 100) * circumference;

  return (
    <div className="flex flex-col w-full min-h-screen pb-20">
      <div className="flex flex-col w-full px-4 pt-4 pb-6 gap-6 max-w-md mx-auto">
        
        {/* Header / Intro */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h2 className={`text-2xl font-extrabold tracking-tight ${
              isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
            }`}>
              Your Stats
            </h2>
            <p className={`text-sm ${
              isDark ? 'text-[#c1c7d2]' : 'text-gray-500'
            }`}>
              {stats.season} - {stats.league}
            </p>
          </div>

          <button
            onClick={() => setShowSeasonAwards(true)}
            aria-label="Ver reconocimientos"
            className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              isDark 
                ? 'bg-[#0b5fa5] text-[#bfd9ff] shadow-[#0b5fa5]/25 hover:bg-[#0e60a6]' 
                : 'bg-[#1D3557] text-white shadow-md hover:bg-[#15263d]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </button>
        </div>

        {/* Fair Play Score Card */}
        <div className={`w-full rounded-2xl p-5 shadow-sm relative overflow-hidden flex items-center justify-between border transition-all ${
          isDark 
            ? 'bg-[#1d2024] border-[#32353a]' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
            isDark ? 'bg-[#0b5fa5]/20' : 'bg-[#1D3557]/10'
          }`} />

          <div className="flex flex-col z-10 text-left">
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-[#8b919c]' : 'text-gray-500'
            }`}>
              Fair Play Score
            </h3>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-5xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.fairPlayScore}
              </span>
              <span className={`text-base font-semibold ${
                isDark ? 'text-[#8b919c]' : 'text-gray-400'
              }`}>
                / 100
              </span>
            </div>
            <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${
              isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
            }`}>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Top {stats.leagueRankPercentile}% in League
            </p>
          </div>

          {/* Circular Gauge SVG */}
          <div className="relative w-24 h-24 z-10 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                className={isDark ? 'text-[#32353a]' : 'text-gray-100'}
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              />
              {/* Animated Progress Circle */}
              <circle
                className={isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'}
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
                style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className={`material-symbols-outlined text-[30px] ${
                  isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Goals */}
          <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group border transition-all ${
            isDark 
              ? 'bg-[#1d2024] border-[#32353a]' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-[100px] transition-transform group-hover:scale-110 pointer-events-none ${
              isDark ? 'bg-[#0b5fa5]/15' : 'bg-[#1D3557]/10'
            }`} />
            <div className="flex justify-between items-start w-full relative z-10 text-left">
              <span className={`text-xs font-bold ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Goals
              </span>
              <span className={`material-symbols-outlined text-[20px] ${
                isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
              }`}>
                sports_score
              </span>
            </div>
            <div className="relative z-10 text-left">
              <span className={`text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.goals}
              </span>
              <span className="text-[11px] font-semibold text-emerald-500 block mt-0.5">
                +{stats.goalsThisWeek} this week
              </span>
            </div>
          </div>

          {/* Assists */}
          <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group border transition-all ${
            isDark 
              ? 'bg-[#1d2024] border-[#32353a]' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-[100px] transition-transform group-hover:scale-110 pointer-events-none ${
              isDark ? 'bg-[#F4A261]/15' : 'bg-[#F4A261]/15'
            }`} />
            <div className="flex justify-between items-start w-full relative z-10 text-left">
              <span className={`text-xs font-bold ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Assists
              </span>
              <span className="material-symbols-outlined text-[#F4A261] text-[20px]">
                handshake
              </span>
            </div>
            <div className="relative z-10 text-left">
              <span className={`text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.assists}
              </span>
              <span className={`text-[11px] font-medium block mt-0.5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Liga & Copas
              </span>
            </div>
          </div>

          {/* Matches Played */}
          <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group border transition-all ${
            isDark 
              ? 'bg-[#1d2024] border-[#32353a]' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-[100px] transition-transform group-hover:scale-110 pointer-events-none ${
              isDark ? 'bg-white/5' : 'bg-gray-100'
            }`} />
            <div className="flex justify-between items-start w-full relative z-10 text-left">
              <span className={`text-xs font-bold ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Matches
              </span>
              <span className={`material-symbols-outlined text-[20px] ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                calendar_month
              </span>
            </div>
            <div className="relative z-10 text-left">
              <span className={`text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.matchesPlayed}
              </span>
              <span className={`text-[11px] font-medium block mt-0.5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                100% Asistencia
              </span>
            </div>
          </div>

          {/* Discipline */}
          <div className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden border transition-all ${
            isDark 
              ? 'bg-[#1d2024] border-[#32353a]' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-start w-full text-left">
              <span className={`text-xs font-bold ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Discipline
              </span>
              <span className={`material-symbols-outlined text-[20px] ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                gavel
              </span>
            </div>
            <div className="flex gap-4 items-end justify-start">
              <div className="flex flex-col items-center">
                <span className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stats.yellowCards}
                </span>
                <div className="w-5 h-7 bg-[#FFD166] rounded-sm mt-1 shadow-sm opacity-90 border border-black/10" />
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stats.redCards}
                </span>
                <div className="w-5 h-7 bg-red-600 rounded-sm mt-1 shadow-sm opacity-90 border border-black/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Module (Match Rating Trend) */}
        <div className={`w-full rounded-2xl p-4 shadow-sm border transition-all text-left ${
          isDark 
            ? 'bg-[#1d2024] border-[#32353a]' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Match Rating Trend
            </h3>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
              isDark 
                ? 'text-gray-300 bg-[#111418] border-[#32353a]' 
                : 'text-gray-600 bg-gray-50 border-gray-200'
            }`}>
              Last 5 Matches
            </span>
          </div>

          <div className="h-36 w-full relative flex items-end justify-between px-3 pt-6 pb-2">
            {/* SVG Line & Area */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                className={isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'}
                d="M 5,80 L 25,60 L 50,70 L 75,30 L 95,20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
              <path
                className={isDark ? 'text-[#0b5fa5]/20' : 'text-[#1D3557]/10'}
                d="M 5,80 L 25,60 L 50,70 L 75,30 L 95,20 L 95,100 L 5,100 Z"
                fill="currentColor"
              />
            </svg>

            {/* Interactive Data points */}
            {stats.recentRatings.map((rating, idx) => {
              // Y position mapping
              const bottomPercents = ['20%', '40%', '30%', '70%', '80%'];
              const isHovered = activeTooltipIdx === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveTooltipIdx(idx)}
                  onMouseLeave={() => setActiveTooltipIdx(null)}
                  onClick={() => setActiveTooltipIdx(activeTooltipIdx === idx ? null : idx)}
                  className={`w-3.5 h-3.5 rounded-full border-2 cursor-pointer z-10 relative transition-transform ${
                    isHovered ? 'scale-150' : 'hover:scale-125'
                  } ${
                    isDark 
                      ? 'bg-[#a2c9ff] border-[#1d2024] shadow-[0_0_8px_#a2c9ff]' 
                      : 'bg-[#1D3557] border-white shadow-sm'
                  }`}
                  style={{ marginBottom: bottomPercents[idx] }}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none">
                      {rating.rating} pts ({rating.match})
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 px-1 border-t border-gray-100 dark:border-[#32353a] pt-2 mt-1">
            <span>J10 (7.2)</span>
            <span>J11 (8.1)</span>
            <span>J12 (7.8)</span>
            <span>J13 (9.2)</span>
            <span>J14 (9.5)</span>
          </div>
        </div>

        {/* Referee Rating Module */}
        <div className={`w-full rounded-2xl p-4 shadow-sm border transition-all text-left ${
          isDark 
            ? 'bg-[#1d2024] border-[#32353a]' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#32353a] text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <span className="material-symbols-outlined text-[20px]">sports</span>
            </div>
            <div>
              <h3 className={`text-sm font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Rate Last Match Referee
              </h3>
              <p className={`text-xs ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                {stats.lastReferee.match} • {stats.lastReferee.date}
              </p>
            </div>
          </div>

          {ratingSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300 block">
                ¡Calificación Enviada!
              </span>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                Tu evaluación anónima ayuda a mejorar el nivel arbitral de la liga.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitRating} className="flex flex-col gap-3">
              {/* Star Rating Group */}
              <div className="flex justify-center gap-1.5 py-1" id="star-rating">
                {[1, 2, 3, 4, 5].map((starNum) => {
                  const isFilled = (hoveredStar || selectedStar) >= starNum;
                  return (
                    <button
                      key={starNum}
                      type="button"
                      aria-label={`Rate ${starNum} stars`}
                      onClick={() => setSelectedStar(starNum)}
                      onMouseEnter={() => setHoveredStar(starNum)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className={`p-1 transition-transform hover:scale-110 ${
                        isFilled ? 'text-[#FFD166]' : isDark ? 'text-[#414751]' : 'text-gray-300'
                      }`}
                    >
                      <span 
                        className="material-symbols-outlined text-[32px]"
                        style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Textarea for comments */}
              <div className="relative">
                <textarea
                  value={refereeComment}
                  onChange={(e) => setRefereeComment(e.target.value)}
                  placeholder="Leave an anonymous comment..."
                  rows={3}
                  className={`w-full rounded-xl p-3 text-xs resize-none focus:outline-none transition-all border ${
                    isDark 
                      ? 'bg-[#111418] text-white border-[#32353a] focus:border-[#a2c9ff] placeholder-gray-500' 
                      : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-[#1D3557] placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingRating || selectedStar === 0}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                  selectedStar === 0
                    ? 'bg-gray-200 dark:bg-[#32353a] text-gray-400 cursor-not-allowed'
                    : isDark
                      ? 'bg-[#0b5fa5] hover:bg-[#0e60a6] text-white'
                      : 'bg-[#1D3557] hover:bg-[#15263d] text-white'
                }`}
              >
                {isSubmittingRating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                    Enviando evaluación...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit Rating
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Season Awards Modal */}
      <AnimatePresence>
        {showSeasonAwards && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1d2024] p-6 rounded-2xl max-w-sm w-full text-left border border-gray-200 dark:border-[#32353a] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Palmarés & Distinciones</h4>
                </div>
                <button
                  onClick={() => setShowSeasonAwards(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Goleador del Torneo (Puesto #2)</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">14 Goles convertidos en 22 partidos</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Distinción Fair Play</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">92 pts • 0 Tarjetas rojas acumuladas</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSeasonAwards(false)}
                className="w-full bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
