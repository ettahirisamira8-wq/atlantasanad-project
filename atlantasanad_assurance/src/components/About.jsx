import React from 'react';
import { ShieldCheck, Target, Award } from 'lucide-react';
import building1 from '../assets/images/bureau.jpg';
import building2 from '../assets/images/building2.jpg';

export default function About() {
  const corporatePillars = [
    { icon: <ShieldCheck className="text-[#004B87]" size={20} />, text: "Solidité institutionnelle d'un leader national marocain de l'assurance." },
    { icon: <Target className="text-[#E01A4F]" size={20} />, text: "Parfaite maitrise des réalités économiques de la région Chtouka Ait Baha." },
    { icon: <Award className="text-[#FF7A00]" size={20} />, text: "Gestion des sinistres en agence sans intermédiaire pour un remboursement accéléré." }
  ];

  return (
    <section id="about" className="py-24 bg-[#F8FAFC] scroll-mt-16 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="text-xs font-black tracking-widest text-[#E01A4F] uppercase block">À Propos d'AtlantaSanad</span>
            <h2 className="text-3xl font-black text-[#004B87] tracking-tight">La Vie Nous Rapproche</h2>
            <div className="w-12 h-1 bg-[#FF7A00] rounded-full" />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-2">
              Issue de la consolidation de structures assurantielles majeures du Royaume, AtlantaSanad Assurance déploie des offres protectrices de haut niveau adaptées à la vie quotidienne et aux exigences professionnelles.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Au Bureau Direct de Biougra, nous perpétuons cette quête d'excellence opérationnelle en assurant un traitement bienveillant de vos dossiers de prévoyance et d'assistance.
            </p>

            {/* صور المبنى */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <img 
                src={building1} 
                alt="AtlantaSanad Biougra" 
                className="rounded-xl object-cover w-full h-40 shadow-md"
              />
              <img 
                src={building2} 
                alt="AtlantaSanad Bâtiment" 
                className="rounded-xl object-cover w-full h-40 shadow-md"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {corporatePillars.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start shadow-sm">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed pt-0.5 text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}