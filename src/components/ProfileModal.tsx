import React, { useState } from 'react';
import { PlayerProfile, ThemeMode } from '../types';
import { motion } from 'motion/react';
import { User, Shield, Phone, Heart, Calendar, Hash, Check, X, QrCode } from 'lucide-react';

interface ProfileModalProps {
  player: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlayer: (updated: Partial<PlayerProfile>) => void;
  theme: ThemeMode;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  player,
  isOpen,
  onClose,
  onUpdatePlayer,
  theme
}) => {
  const isDark = theme === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(player.name);
  const [position, setPosition] = useState(player.position);
  const [club, setClub] = useState(player.club);
  const [emergencyContact, setEmergencyContact] = useState(player.emergencyContact);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdatePlayer({
      name,
      position,
      club,
      emergencyContact
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border text-left ${
          isDark 
            ? 'bg-[#1d2024] border-[#32353a] text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-[#32353a]">
          <h3 className="text-lg font-bold">Perfil del Jugador</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar & Header */}
        <div className="flex flex-col items-center my-4">
          <div className="relative">
            <img
              src={player.avatarUrl}
              alt={player.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#0b5fa5] dark:border-[#a2c9ff] shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#F4A261] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <Check className="w-3 h-3 text-white font-bold" />
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-extrabold text-lg">{player.name}</div>
            <div className="text-xs font-semibold text-[#F4A261]">{player.club} • #{player.number}</div>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3 text-xs mb-5">
          <div>
            <label className="block text-gray-400 font-semibold mb-1">Nombre Completo</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#111418] border border-gray-300 dark:border-[#414751]"
              />
            ) : (
              <div className="font-medium p-2 rounded-lg bg-gray-50 dark:bg-[#191c20]">{player.name}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-1">Posición Principal</label>
            {isEditing ? (
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#111418] border border-gray-300 dark:border-[#414751]"
              />
            ) : (
              <div className="font-medium p-2 rounded-lg bg-gray-50 dark:bg-[#191c20]">{player.position}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-1">Club Actual</label>
            {isEditing ? (
              <input
                type="text"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#111418] border border-gray-300 dark:border-[#414751]"
              />
            ) : (
              <div className="font-medium p-2 rounded-lg bg-gray-50 dark:bg-[#191c20]">{player.club}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-400 font-semibold mb-1">Contacto de Emergencia</label>
            {isEditing ? (
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#111418] border border-gray-300 dark:border-[#414751]"
              />
            ) : (
              <div className="font-medium p-2 rounded-lg bg-gray-50 dark:bg-[#191c20]">{player.emergencyContact}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 dark:bg-[#272a2f] text-gray-800 dark:text-gray-200 py-2.5 rounded-xl font-semibold text-xs"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Editar Datos del Jugador
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
