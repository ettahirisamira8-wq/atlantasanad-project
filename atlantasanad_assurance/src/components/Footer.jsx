import React from 'react';
import { ShieldAlert, ArrowUpCircle } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  
  const handleScrollToTop = () => {
    setActiveTab('accueil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1329] text-slate-400 text-xs py-12 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800/60">
          
          {/* Logo Frame Replication */}
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-black tracking-widest text-xs uppercase">
              ATLANTA<span className="text-[#FF7A00]">SANAD</span>
            </div>
            <span className="text-slate-600 font-bold">|</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Biougra Bureau Direct</span>
          </div>

          {/* Quick Legal Access Array links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">Nos Garanties</a>
            <a href="#agences" className="hover:text-white transition-colors">Nos Agences</a>
            <a href="#contact" className="hover:text-white transition-colors">E-Devis Express</a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <ShieldAlert size={12} className="text-[#FF7A00]" /> Intermédiaire agréé par l'ACAPS
            </span>
          </div>

          {/* Back to top vector action */}
          <button 
            onClick={handleScrollToTop}
            className="text-slate-500 hover:text-[#FF7A00] transition-colors p-1"
            title="Retour en haut de page"
          >
            <ArrowUpCircle size={22} />
          </button>
        </div>

        {/* Sub-Footer Meta-Zone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-normal text-slate-600">
          <p>© 2026 AtlantaSanad Biougra. Tous droits réservés.</p>
          <p className="tracking-wide">Développement UI/UX conforme aux directives de la marque AtlantaSanad Assurance.</p>
        </div>

      </div>
    </footer>
  );
}