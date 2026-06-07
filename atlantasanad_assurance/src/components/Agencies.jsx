import React from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function Agencies() {
  const geographicalNodes = [
    {
      title: "Bureau Direct Biougra",
      address: "Derb Hammad 1, Avenue Sidi Said, Biougra",
      tel: "05 28 81 90 53",
      email: "bd.biougra@atlantasanad.ma",
      badge: "Siège Principal",
      topBorder: "border-t-[#004B87]"
    },
    {
      title: "Assurances Mouhdi",
      address: "Hay Berhichi, Route Taous, Ait Amira, Biougra",
      tel: "05 28 81 25 65",
      email: "ag.mouhdi@atlantasanad.ma",
      badge: "Agent Général Agréé",
      topBorder: "border-t-[#E01A4F]"
    }
  ];

  return (
    <section id="agences" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black tracking-widest text-[#E01A4F] uppercase block">Bureaux Physiques Directs</span>
          <h2 className="text-3xl font-black text-[#004B87] tracking-tight">Agences de Proximité à Biougra</h2>
          <div className="w-12 h-1 bg-[#004B87] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {geographicalNodes.map((node, index) => (
            <div key={index} className={`bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm border-t-4 ${node.topBorder}`}>
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-600">
                    {node.badge}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <Clock size={13} /> Lun - Ven 8:30 - 16:30
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#004B87] flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#FF7A00]" /> {node.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-semibold flex items-start gap-2.5 leading-relaxed">
                    <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <span>{node.address}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200/60">
                <a href={`tel:${node.tel.replace(/\s/g, '')}`} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-left group hover:border-[#004B87] transition-colors">
                  <Phone size={15} className="text-[#004B87]" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Téléphone</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-[#004B87] transition-colors">{node.tel}</span>
                  </div>
                </a>
                <a href={`mailto:${node.email}`} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-left group hover:border-[#004B87] transition-colors overflow-hidden">
                  <Mail size={15} className="text-[#E01A4F]" />
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">E-mail agence</span>
                    <span className="text-xs font-black text-slate-700 group-hover:text-[#004B87] transition-colors block truncate">{node.email}</span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section - هنا فين رديناها تفاعلية وحقيقية 🌍 */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-[#004B87] px-6 py-4 flex items-center gap-2">
            <MapPin size={18} className="text-white" />
            <span className="text-white font-black text-sm uppercase tracking-wider">Localisation – Biougra</span>
          </div>
          <div className="w-full h-[450px] relative bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.9748684784964!2d-9.3752538!3d30.2093077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3ba4eeaaaaaaa%3A0xc31eb5c94fa1be24!2sAssurances%20Mouhdi%20Agent%20AtlantaSanad!5e0!3m2!1sfr!2sma!4v1717600000000!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Réelle Google Maps - AtlantaSanad Biougra"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}