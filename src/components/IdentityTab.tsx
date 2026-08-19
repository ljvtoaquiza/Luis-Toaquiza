import React, { useState, useRef } from 'react';
import { PlayerProfile, ThemeMode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, RefreshCw, CheckCircle2, ShieldCheck, QrCode, Download, Sparkles } from 'lucide-react';

interface IdentityTabProps {
  player: PlayerProfile;
  theme: ThemeMode;
}

export const IdentityTab: React.FC<IdentityTabProps> = ({ player, theme }) => {
  const isDark = theme === 'dark';
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('Hace 12 segundos');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showQrZoom, setShowQrZoom] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  const handleRefreshPass = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed('Recién actualizado');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className={`absolute top-[-10%] left-[-20%] w-72 h-72 rounded-full blur-[80px] pointer-events-none ${
          isDark ? 'bg-[#0b5fa5]/20' : 'bg-[#1D3557]/10'
        }`} 
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-64 h-64 rounded-full blur-[60px] pointer-events-none ${
          isDark ? 'bg-[#FF6B35]/15' : 'bg-[#F4A261]/15'
        }`} 
      />

      <div className="px-4 flex-1 flex flex-col justify-center items-center gap-6 z-10 w-full max-w-md mx-auto py-6">
        {/* Header Text */}
        <div className="text-center space-y-1 w-full">
          <h2 className={`text-2xl font-bold tracking-tight ${
            isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
          }`}>
            Digital Pass
          </h2>
          <p className={`text-sm ${
            isDark ? 'text-[#c1c7d2]' : 'text-gray-500'
          }`}>
            Present at venue entry
          </p>
        </div>

        {/* The 3D Digital ID Card */}
        <div 
          className="w-full relative group perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card glow */}
          <div 
            className={`absolute inset-0 blur-xl rounded-2xl transition-colors duration-500 ${
              isDark ? 'bg-[#0b5fa5]/25 group-hover:bg-[#0b5fa5]/40' : 'bg-[#1D3557]/15 group-hover:bg-[#1D3557]/25'
            }`} 
          />

          <motion.div
            ref={cardRef}
            animate={{
              rotateX: tiltStyle.rotateX,
              rotateY: tiltStyle.rotateY,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative w-full rounded-2xl overflow-hidden shadow-2xl preserve-3d border transition-colors duration-300 ${
              isDark 
                ? 'bg-[#32353a] border-[#414751]/80 ring-1 ring-white/10' 
                : 'bg-white border-gray-200/80 ring-1 ring-black/5'
            }`}
            style={{ minHeight: '490px' }}
          >
            {/* Front of Pass */}
            {!isFlipped ? (
              <div className="flex flex-col h-full">
                {/* Banner */}
                <div className="h-24 bg-gradient-to-r from-[#0b5fa5] via-[#1D3557] to-[#0e60a6] relative overflow-hidden p-4">
                  {/* Decorative grid pattern */}
                  <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid-pattern)" />
                  </svg>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {player.leagueName}
                      </span>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-0.5 flex items-center gap-1.5 shadow-sm border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-white tracking-wide">
                        {player.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-6 pt-0 relative flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative -mt-12 mb-3">
                    <div className={`w-24 h-24 rounded-full p-1 shadow-xl relative z-10 ${
                      isDark ? 'bg-[#32353a]' : 'bg-white'
                    }`}>
                      <img 
                        src={player.avatarUrl} 
                        alt={player.name} 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Verified badge */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#F4A261] rounded-full flex items-center justify-center shadow-md z-20 border-2 border-white">
                      <span className="material-symbols-outlined text-[14px] text-white font-bold">verified</span>
                    </div>
                  </div>

                  {/* Player info */}
                  <div className="text-center mb-5 w-full">
                    <h3 className={`text-2xl font-bold tracking-tight mb-0.5 ${
                      isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
                    }`}>
                      {player.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#F4A261]">
                      {player.position} • #{player.number}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 w-full gap-3 mb-5">
                    <div className={`flex flex-col items-center p-3 rounded-xl border shadow-sm ${
                      isDark 
                        ? 'bg-[#191c20] border-[#414751]/50' 
                        : 'bg-gray-50 border-gray-200/80'
                    }`}>
                      <span className={`material-symbols-outlined mb-1 text-[20px] ${
                        isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
                      }`}>
                        shield
                      </span>
                      <span className={`text-[11px] uppercase tracking-wider mb-0.5 font-medium ${
                        isDark ? 'text-[#8b919c]' : 'text-gray-500'
                      }`}>
                        Club
                      </span>
                      <span className={`text-sm font-bold text-center ${
                        isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
                      }`}>
                        {player.club}
                      </span>
                    </div>

                    <div className={`flex flex-col items-center p-3 rounded-xl border shadow-sm ${
                      isDark 
                        ? 'bg-[#191c20] border-[#414751]/50' 
                        : 'bg-gray-50 border-gray-200/80'
                    }`}>
                      <span className={`material-symbols-outlined mb-1 text-[20px] ${
                        isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
                      }`}>
                        tag
                      </span>
                      <span className={`text-[11px] uppercase tracking-wider mb-0.5 font-medium ${
                        isDark ? 'text-[#8b919c]' : 'text-gray-500'
                      }`}>
                        Pass ID
                      </span>
                      <span className={`text-sm font-bold text-center font-mono ${
                        isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
                      }`}>
                        {player.passId}
                      </span>
                    </div>
                  </div>

                  {/* QR Code with interactive preview */}
                  <div 
                    onClick={() => setShowQrZoom(true)}
                    className={`p-3 rounded-2xl shadow-sm border cursor-pointer group/qr transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isDark 
                        ? 'bg-[#111418] border-[#414751]' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <img 
                        src={player.qrUrl} 
                        alt="Pass QR Code" 
                        className="w-full h-full object-contain rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#0b5fa5]/10 opacity-0 group-hover/qr:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                        <span className="bg-black/70 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <QrCode className="w-3 h-3" /> Ampliar
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={`text-[11px] mt-2.5 flex items-center gap-1 font-medium ${
                    isDark ? 'text-[#8b919c]' : 'text-gray-500'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Scan for validation • {lastRefreshed}
                  </p>

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="mt-3 text-[11px] font-semibold text-[#a2c9ff] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Ver reverso y datos médicos
                  </button>
                </div>
              </div>
            ) : (
              /* Back of Pass */
              <div className="p-6 flex flex-col justify-between h-full min-h-[490px]">
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-[#414751]">
                    <div>
                      <h4 className="text-base font-bold text-[#a2c9ff] dark:text-[#a2c9ff]">
                        Credencial Oficial de Cancha
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Liga Amateur Interparroquial</p>
                    </div>
                    <button 
                      onClick={() => setIsFlipped(false)}
                      className="text-xs bg-gray-100 dark:bg-[#191c20] text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg font-medium"
                    >
                      Volver al frente
                    </button>
                  </div>

                  <div className="space-y-3.5 my-5 text-left text-xs">
                    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#32353a]">
                      <span className="text-gray-500 dark:text-gray-400">Tipo de Sangre:</span>
                      <span className="font-bold text-red-500">{player.bloodType}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#32353a]">
                      <span className="text-gray-500 dark:text-gray-400">Contacto de Emergencia:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{player.emergencyContact}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#32353a]">
                      <span className="text-gray-500 dark:text-gray-400">Válido Hasta:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{player.validUntil}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-[#32353a]">
                      <span className="text-gray-500 dark:text-gray-400">Dorsal Oficial:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{player.dorsal}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-100 dark:bg-[#191c20] rounded-xl border border-gray-200 dark:border-[#414751] text-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-gray-400 block mb-1">
                      HASH CRIPTOGRÁFICO DE VERIFICACIÓN
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                      SHA256-SSOC-9941-8472-X01
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-[#414751] flex justify-between items-center text-[11px] text-gray-400">
                  <span>Reglamento FEF / Confa</span>
                  <span>Firma Autorizada</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-1">
          <button
            id="btn-export-id"
            onClick={() => setShowExportModal(true)}
            className={`flex-1 active:scale-95 transition-all duration-200 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm border ${
              isDark
                ? 'bg-[#272a2f] text-[#e1e2e9] hover:bg-[#32353a] border-[#414751]'
                : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <Share2 className="w-4 h-4 text-[#a2c9ff] dark:text-[#a2c9ff]" />
            Export ID
          </button>

          <button
            id="btn-refresh-id"
            onClick={handleRefreshPass}
            disabled={isRefreshing}
            className={`flex-1 active:scale-95 transition-all duration-200 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md ${
              isDark
                ? 'bg-[#0b5fa5] text-white hover:bg-[#0e60a6]'
                : 'bg-[#1D3557] text-white hover:bg-[#14263f]'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Actualizando...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* QR Code Zoom Modal */}
      <AnimatePresence>
        {showQrZoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white dark:bg-[#1d2024] p-6 rounded-2xl max-w-xs w-full text-center border border-gray-200 dark:border-[#32353a] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-left">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">Escaneo en Cancha</h4>
                  <p className="text-xs text-gray-500">Muestra al vocal de mesa</p>
                </div>
                <button
                  onClick={() => setShowQrZoom(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-inner flex justify-center mb-4">
                <img 
                  src={player.qrUrl} 
                  alt="QR Zoom" 
                  className="w-52 h-52 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Pase Activo • Habilitado para Jugar
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Export / Share Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white dark:bg-[#1d2024] p-6 rounded-2xl max-w-sm w-full border border-gray-200 dark:border-[#32353a] shadow-2xl text-left"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Compartir Carnet Digital</h4>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Exporta tu credencial digital autorizada para presentar en ingresos o enviar al delegado del club.
              </p>

              <div className="p-3 bg-gray-50 dark:bg-[#111418] rounded-xl border border-gray-200 dark:border-[#32353a] flex items-center gap-3 mb-5">
                <img 
                  src={player.avatarUrl} 
                  alt="Player" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#1D3557]" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{player.name}</div>
                  <div className="text-xs text-[#F4A261] font-semibold">{player.club} • #{player.number}</div>
                  <div className="text-[10px] text-gray-400 font-mono">ID: {player.passId}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    alert('¡Carnet digital guardado en tu dispositivo!');
                    setShowExportModal(false);
                  }}
                  className="w-full bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" /> Guardar como Imagen / PDF
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Enlace de validación copiado al portapapeles.');
                    setShowExportModal(false);
                  }}
                  className="w-full bg-gray-100 dark:bg-[#272a2f] text-gray-800 dark:text-gray-200 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Share2 className="w-4 h-4" /> Copiar Enlace Seguro
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
