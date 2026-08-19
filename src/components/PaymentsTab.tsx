import React, { useState } from 'react';
import { PaymentItem, TransactionHistoryItem, ReceiptData, ThemeMode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Wallet, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  Clock, 
  QrCode, 
  Download, 
  Share2, 
  Check, 
  PlusCircle, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';

interface PaymentsTabProps {
  balance: number;
  receipt: ReceiptData;
  transactions: TransactionHistoryItem[];
  theme: ThemeMode;
  onPayBalance: (amount: number, method: string) => void;
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({
  balance,
  receipt,
  transactions,
  theme,
  onPayBalance
}) => {
  const isDark = theme === 'dark';
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'deuna' | 'visa' | 'transfer'>('deuna');
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiptDetail, setShowReceiptDetail] = useState(false);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<string | null>(null);

  const handleQuickPayAll = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      onPayBalance(balance, selectedMethod === 'deuna' ? 'Deuna!' : 'Visa **** 4242');
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-20">
      <div className="flex flex-col w-full px-4 pt-4 pb-6 gap-6 max-w-md mx-auto">
        
        {/* Financial Overview Card */}
        <section className={`relative rounded-2xl p-6 shadow-xl overflow-hidden flex flex-col items-center text-center border transition-all duration-300 ${
          isDark 
            ? 'bg-[#272a2f] border-[#32353a]' 
            : 'bg-white border-gray-200 shadow-md'
        }`}>
          {/* Ambient Glow */}
          <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full blur-[45px] pointer-events-none ${
            isDark ? 'bg-[#0b5fa5]/35' : 'bg-[#1D3557]/20'
          }`} />
          <div className={`absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-[45px] pointer-events-none ${
            isDark ? 'bg-[#FF6B35]/25' : 'bg-[#F4A261]/25'
          }`} />

          <h2 className={`text-xs font-bold uppercase tracking-widest relative z-10 ${
            isDark ? 'text-[#c1c7d2]' : 'text-gray-500'
          }`}>
            Balance Pendiente
          </h2>

          <div className={`text-5xl font-extrabold tracking-tight mt-2 relative z-10 flex items-center justify-center ${
            isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
          }`}>
            <span className={`text-3xl mr-1 font-bold ${
              isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
            }`}>
              $
            </span>
            {balance > 0 ? balance.toFixed(2) : '0.00'}
          </div>

          {/* Pay Button */}
          <button
            id="btn-pagar"
            onClick={() => {
              if (balance <= 0) return;
              setShowPayModal(true);
            }}
            disabled={isPaying || balance <= 0}
            className={`mt-6 w-full font-bold text-sm py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 relative z-10 ${
              paymentSuccess
                ? 'bg-emerald-600 text-white'
                : balance <= 0
                  ? 'bg-gray-200 dark:bg-[#32353a] text-gray-400 cursor-not-allowed'
                  : isDark
                    ? 'bg-[#0b5fa5] hover:bg-[#0e60a6] text-white shadow-[#0b5fa5]/25'
                    : 'bg-[#1D3557] hover:bg-[#15263d] text-white shadow-md'
            }`}
          >
            {isPaying ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Procesando pago seguro...</span>
              </>
            ) : paymentSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>¡Pago Exitoso!</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>{balance > 0 ? 'Pagar Todo ($' + balance.toFixed(2) + ')' : 'Todo al Día'}</span>
              </>
            )}
          </button>
        </section>

        {/* Payment Methods Selector Carousel */}
        <section className="flex flex-col gap-2 text-left">
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#c1c7d2]' : 'text-gray-600'
            }`}>
              Método Preferido
            </h3>
            <span className="text-[11px] text-[#F4A261] font-semibold">2 vinculados</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 pt-1 snap-x hide-scrollbar">
            {/* Deuna! */}
            <div
              onClick={() => setSelectedMethod('deuna')}
              className={`snap-start shrink-0 rounded-xl p-3.5 flex items-center gap-3 w-48 shadow-sm cursor-pointer transition-all duration-200 border ${
                selectedMethod === 'deuna'
                  ? isDark
                    ? 'bg-[#1d2024] border-[#a2c9ff] ring-1 ring-[#a2c9ff]'
                    : 'bg-white border-[#1D3557] ring-1 ring-[#1D3557]'
                  : isDark
                    ? 'bg-[#191c20] border-[#32353a]'
                    : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isDark ? 'bg-[#0b5fa5]/20 text-[#a2c9ff]' : 'bg-[#1D3557]/10 text-[#1D3557]'
              }`}>
                <Wallet className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Deuna!
                </span>
                <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Conectado
                </span>
              </div>
            </div>

            {/* Visa */}
            <div
              onClick={() => setSelectedMethod('visa')}
              className={`snap-start shrink-0 rounded-xl p-3.5 flex items-center gap-3 w-48 shadow-sm cursor-pointer transition-all duration-200 border ${
                selectedMethod === 'visa'
                  ? isDark
                    ? 'bg-[#1d2024] border-[#a2c9ff] ring-1 ring-[#a2c9ff]'
                    : 'bg-white border-[#1D3557] ring-1 ring-[#1D3557]'
                  : isDark
                    ? 'bg-[#191c20] border-[#32353a]'
                    : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isDark ? 'bg-[#32353a] text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Visa
                </span>
                <span className={`text-[11px] font-mono ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  **** 4242
                </span>
              </div>
            </div>

            {/* Add method button */}
            <div
              onClick={() => alert('Opción de vincular tarjeta o banco habilitada.')}
              className={`snap-start shrink-0 rounded-xl p-3.5 flex items-center justify-center gap-2 w-36 border border-dashed cursor-pointer ${
                isDark ? 'border-gray-600 text-gray-400 hover:border-gray-400' : 'border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Agregar</span>
            </div>
          </div>
        </section>

        {/* Breakdown Categories (Bento Grid) */}
        <section className="grid grid-cols-2 gap-3">
          {/* Vocalías (Fixed) */}
          <div 
            onClick={() => setSelectedCategoryInfo('Vocalías')}
            className={`rounded-2xl p-4 flex flex-col justify-between aspect-square shadow-sm relative overflow-hidden border cursor-pointer active:scale-95 transition-all ${
              isDark 
                ? 'bg-[#1d2024] border-[#32353a]' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              isDark ? 'bg-[#0b5fa5]/20 text-[#a2c9ff]' : 'bg-[#1D3557]/10 text-[#1D3557]'
            }`}>
              <span className="material-symbols-outlined text-[20px]">sports</span>
            </div>
            <div className="text-left">
              <h4 className={`text-sm font-bold ${
                isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
              }`}>
                Vocalías
              </h4>
              <div className={`text-2xl font-extrabold tracking-tight mt-0.5 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                $5.00
              </div>
              <span className={`text-[11px] block mt-0.5 ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Fijo x Partido
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Multas */}
            <div 
              onClick={() => setSelectedCategoryInfo('Multas')}
              className={`rounded-2xl p-3.5 flex-1 flex flex-col justify-center shadow-sm border cursor-pointer active:scale-95 transition-all text-left ${
                isDark 
                  ? 'bg-rose-950/20 border-rose-800/40' 
                  : 'bg-red-50 border-red-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${
                  isDark ? 'text-rose-300' : 'text-red-800'
                }`}>
                  Multas
                </span>
                <span className="material-symbols-outlined text-rose-500 text-[18px]">warning</span>
              </div>
              <div className="text-2xl font-extrabold text-rose-500 mt-1 tracking-tight">
                $15.00
              </div>
            </div>

            {/* Inscripciones */}
            <div 
              onClick={() => setSelectedCategoryInfo('Inscripción')}
              className={`rounded-2xl p-3.5 flex-1 flex flex-col justify-center shadow-sm border cursor-pointer active:scale-95 transition-all text-left ${
                isDark 
                  ? 'bg-[#191c20] border-[#32353a]' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Inscripción
                </span>
                <span className={`material-symbols-outlined text-[18px] ${
                  isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
                }`}>
                  app_registration
                </span>
              </div>
              <div className={`text-2xl font-extrabold mt-1 tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                $25.00
              </div>
            </div>
          </div>
        </section>

        {/* Digital Ticket / Recent Receipt */}
        <section className={`rounded-2xl p-5 shadow-md flex flex-col relative border overflow-hidden transition-all text-left ${
          isDark 
            ? 'bg-[#1d2024] border-[#32353a]' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Top colored accent line */}
          <div className={`absolute top-0 left-0 w-full h-1.5 ${
            isDark ? 'bg-[#a2c9ff]' : 'bg-[#1D3557]'
          }`} />

          <div className="flex justify-between items-start mb-3 mt-1">
            <div className="flex flex-col">
              <span className={`text-[10px] uppercase font-bold tracking-widest ${
                isDark ? 'text-[#8b919c]' : 'text-gray-500'
              }`}>
                Último Pago
              </span>
              <span className={`text-lg font-extrabold mt-0.5 ${
                isDark ? 'text-[#e1e2e9]' : 'text-gray-900'
              }`}>
                Recibo {receipt.receiptId}
              </span>
            </div>
            <div className={`font-semibold text-xs px-2.5 py-1 rounded-full ${
              isDark 
                ? 'bg-[#0b5fa5]/25 text-[#a2c9ff] border border-[#0b5fa5]/40' 
                : 'bg-[#1D3557]/10 text-[#1D3557]'
            }`}>
              {receipt.status}
            </div>
          </div>

          {/* Dashed separator */}
          <svg className="my-2 opacity-25" height="2" width="100%">
            <line stroke="currentColor" strokeDasharray="6,6" strokeWidth="2" x1="0" x2="100%" y1="1" y2="1" />
          </svg>

          <div className="flex flex-col gap-2 my-1">
            {receipt.items.map((it, idx) => (
              <div key={idx} className={`flex justify-between items-center text-xs ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span>{it.name}</span>
                <span className="font-semibold">${it.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <svg className="my-2 opacity-25" height="2" width="100%">
            <line stroke="currentColor" strokeDasharray="6,6" strokeWidth="2" x1="0" x2="100%" y1="1" y2="1" />
          </svg>

          <div className="flex justify-between items-center mt-1">
            <span className={`text-base font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Total
            </span>
            <span className={`text-xl font-extrabold ${
              isDark ? 'text-[#a2c9ff]' : 'text-[#1D3557]'
            }`}>
              ${receipt.total.toFixed(2)}
            </span>
          </div>

          {/* QR Code Receipt Container */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <div 
              onClick={() => setShowReceiptDetail(true)}
              className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform"
            >
              <img 
                src={receipt.qrUrl} 
                alt="Receipt QR" 
                className="w-24 h-24 object-contain rounded-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5">Toca el QR para ver detalles completos del comprobante</span>
          </div>
        </section>

        {/* Transaction History List */}
        <section className="flex flex-col gap-3 text-left">
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#c1c7d2]' : 'text-gray-600'
            }`}>
              Historial de Transacciones
            </h3>
            <span className="text-[11px] text-gray-400">Ver todas</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {transactions.map((tx) => {
              const isPending = tx.status === 'Pendiente';
              return (
                <div
                  key={tx.id}
                  className={`rounded-xl p-3.5 flex items-center justify-between shadow-sm border transition-all ${
                    isDark 
                      ? 'bg-[#1d2024] border-[#32353a]' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isPending
                        ? 'bg-[#F4A261]/20 text-[#F4A261]'
                        : isDark
                          ? 'bg-[#0b5fa5]/20 text-[#a2c9ff]'
                          : 'bg-[#1D3557]/10 text-[#1D3557]'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">
                        {isPending ? 'schedule' : 'check_circle'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tx.title}
                      </span>
                      <span className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {tx.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-extrabold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      -${tx.amount.toFixed(2)}
                    </span>
                    <span className={`text-[11px] font-bold ${
                      isPending ? 'text-[#F4A261]' : 'text-emerald-500'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Pay Modal Simulator */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border text-left ${
                isDark ? 'bg-[#1d2024] border-[#32353a] text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold">Confirmar Pago</h4>
                  <p className="text-xs text-gray-500">Pasarela de Pagos Segura Interligas</p>
                </div>
                <button
                  onClick={() => setShowPayModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#111418] border border-gray-200 dark:border-[#32353a] mb-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Monto Total a Cancelar:</span>
                  <span className="font-bold text-gray-800 dark:text-white">${balance.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Método Seleccionado:</span>
                  <span className="font-semibold text-[#0b5fa5] dark:text-[#a2c9ff]">
                    {selectedMethod === 'deuna' ? 'Deuna! Débito Inmediato' : 'Visa **** 4242'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Encriptación bancaria de 256-bits
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Check className="w-4 h-4 text-[#0b5fa5]" /> Emisión de comprobante digital automático
                </div>
              </div>

              <button
                onClick={() => {
                  setShowPayModal(false);
                  handleQuickPayAll();
                }}
                className="w-full bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-3.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Pagar ${balance.toFixed(2)} Ahora
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Receipt Detail Modal */}
      <AnimatePresence>
        {showReceiptDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1d2024] p-6 rounded-2xl max-w-sm w-full text-left border border-gray-200 dark:border-[#32353a] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Comprobante de Pago</h4>
                  <p className="text-xs text-gray-500">Recibo Oficial #{receipt.receiptId}</p>
                </div>
                <button
                  onClick={() => setShowReceiptDetail(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#32353a] flex items-center justify-center text-gray-600 dark:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#111418] rounded-xl border border-gray-200 dark:border-[#32353a] space-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fecha y Hora:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{receipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Método de Pago:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{receipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estado:</span>
                  <span className="font-bold text-emerald-600">{receipt.status}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-center mb-4">
                <img src={receipt.qrUrl} alt="Comprobante" className="w-40 h-40 object-contain" />
              </div>

              <button
                onClick={() => {
                  alert('Comprobante descargado en PDF.');
                  setShowReceiptDetail(false);
                }}
                className="w-full bg-[#1D3557] dark:bg-[#0b5fa5] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Descargar Factura / PDF
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Info Dialog */}
      <AnimatePresence>
        {selectedCategoryInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1d2024] p-5 rounded-2xl max-w-xs w-full text-left border border-gray-200 dark:border-[#32353a] shadow-2xl"
            >
              <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                Detalle: {selectedCategoryInfo}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {selectedCategoryInfo === 'Vocalías' && 'Pago reglamentario obligatorio por arbitraje y mesa de control para cada jornada disputada ($5.00).'}
                {selectedCategoryInfo === 'Multas' && 'Sanción disciplinaria acumulada por tarjetas recibidas en la jornada J14 ($15.00).'}
                {selectedCategoryInfo === 'Inscripción' && 'Cuota correspondiente al registro en el Torneo Clausura 2024 ($25.00).'}
              </p>
              <button
                onClick={() => setSelectedCategoryInfo(null)}
                className="w-full bg-gray-100 dark:bg-[#272a2f] text-gray-800 dark:text-white py-2 rounded-xl text-xs font-semibold"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
