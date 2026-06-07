import React, { useState } from 'react';
import { Calculator, MessageCircle, FileCheck, Info } from 'lucide-react';

export default function DigitalServices({ onQuoteSelect }) {
  const [cvPower, setCvPower] = useState(7);
  const [totalPremium, setTotalPremium] = useState(2445);

  const calculatePremium = (powerValue) => {
    setCvPower(powerValue);
    const statutoryBaseline = 1500;
    setTotalPremium(statutoryBaseline + (powerValue * 135));
  };

  return (
    <section className="bg-gradient-to-br from-[#003B6F] to-[#061B30] text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block">
              Canaux e-Services Directs
            </span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">Accélérez Vos Démarches d'Assurance</h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Nous digitalisons vos requêtes contractuelles. Utilisez nos passerelles directes pour soumettre vos rapports d’expertise ou valider vos dossiers médicaux à distance.
            </p>
            
            <div className="space-y-3 pt-2">
              <a 
                href="https://wa.me/212528819053" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3.5 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                <div>
                  <h4 className="text-xs font-bold">Assistance WhatsApp Régionale</h4>
                  <p className="text-[10px] text-slate-400">Lien direct de proximité : 05 28 81 90 53</p>
                </div>
              </a>
              <div className="flex items-center gap-3.5 p-4 bg-white/5 border border-white/10 rounded-xl">
                <FileCheck size={18} className="text-[#FF7A00]" />
                <div>
                  <h4 className="text-xs font-bold">E-Suivi Dossiers Maladie</h4>
                  <p className="text-[10px] text-slate-400">Remboursements transparents en ligne</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Block */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-[#004B87] font-black text-xs uppercase tracking-wider mb-6">
              <Calculator size={16} className="text-[#FF7A00]" /> Estimateur de Cotisation Automobile Annuelle
            </div>
            
            <div className="space-y-6 text-left">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  <span>Puissance Fiscale Véhicule</span>
                  <span className="text-[#004B87] text-base font-black">{cvPower} CV</span>
                </div>
                <input 
                  type="range" min="4" max="12" value={cvPower}
                  onChange={(e) => calculatePremium(parseInt(e.target.value))}
                  className="w-full accent-[#004B87] h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tarification Globale Estimée</h4>
                  <p className="text-2xl font-black text-[#004B87] tracking-tight mt-0.5">
                    ~ {totalPremium} <span className="text-xs font-bold text-slate-500">DH / AN</span>
                  </p>
                </div>
                <button 
                  onClick={() => onQuoteSelect('Automobile')}
                  className="w-full sm:w-auto bg-[#E01A4F] text-white text-xs font-black uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all shadow-md"
                >
                  Souscrire ce Tarif
                </button>
              </div>

              <div className="flex items-start gap-2 text-[10px] text-slate-400 leading-normal">
                <Info size={14} className="text-[#FF7A00] shrink-0 mt-0.5" />
                <p>Donnée purement indicative. La validation finale du contrat nécessite l'étude de votre relevé d'informations d'assurance marocain en bureau physique.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}