import React from 'react';
import { Car, HeartPulse, Home, FileText, Users, ArrowUpRight } from 'lucide-react';
import promoImg from '../assets/images/promo.jpg';

// زدنا هنا حماية (= () => {}) باش يلا ما كانتش ممررة يخدم البوطون بلا مشاكل
export default function Services({ onProductSelect = () => {} }) {
  const insuranceProducts = [
    {
      id: 'auto',
      icon: <Car className="text-[#004B87]" size={26} />,
      title: "Assurance Automobile",
      desc: "Garanties RC, protection bris de glace, vol, incendie et solutions tous risques avec remorquage prioritaire 24h/7j.",
      badge: "Indispensable"
    },
    {
      id: 'sante',
      icon: <HeartPulse className="text-[#E01A4F]" size={26} />,
      title: "Assurance Santé",
      desc: "Couverture complémentaire optimale pour la prise en charge rapide de vos frais médicaux et pharmaceutiques.",
      badge: "Famille"
    },
    {
      id: 'hab',
      icon: <Home className="text-[#004B87]" size={26} />,
      title: "Assurance Habitation",
      desc: "Sécurisez vos locaux résidentiels et votre mobilier contre les dégâts des eaux, sinistres et intrusions.",
      badge: "Sécurité"
    },
    {
      id: 'sinistre',
      icon: <FileText className="text-[#FF7A00]" size={26} />,
      title: "Déclaration de Sinistres",
      desc: "Gestion de proximité à Biougra. Constats, instruction instantanée de vos dossiers d'indemnisation.",
      badge: "Service Client"
    },
    {
      id: 'assistance',
      icon: <Users className="text-[#004B87]" size={26} />,
      title: "Assistance Clients",
      desc: "Accompagnement de pointe pour la modification de vos options de couverture et les bilans de risques professionnels.",
      badge: "Conseil"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black tracking-widest text-[#E01A4F] uppercase block">Garanties Métiers & Particuliers</span>
          <h2 className="text-3xl font-black text-[#004B87] tracking-tight">Nos Solutions d'Assurance</h2>
          <div className="w-12 h-1 bg-[#FF7A00] mx-auto rounded-full" />
        </div>

        {/* Promo Banner */}
        <div className="rounded-2xl overflow-hidden mb-12 relative">
          <img 
            src={promoImg} 
            alt="AtlantaSanad Assurance" 
            className="w-full object-cover"
            style={{height:'280px'}}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004B87]/80 to-transparent flex items-center px-10">
            <div>
              <h3 className="text-white font-black text-2xl mb-2">Rejoignez-nous</h3>
              <p className="text-white/80 text-sm">Développez un Point de Vente Exclusif AtlantaSanad</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insuranceProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {prod.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#004B87] mb-2.5 group-hover:text-[#E01A4F] transition-colors">
                  {prod.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  {prod.desc}
                </p>
              </div>
              <button
                onClick={() => onProductSelect(prod.title)}
                className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#004B87] uppercase tracking-wider group-hover:text-[#FF7A00] transition-colors"
              >
                <span>Calculer ma prime</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}