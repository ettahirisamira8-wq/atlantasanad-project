import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    
                    {/* 🔵 Logo Original AtlantaSanad */}
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
                                Atlanta<span className="text-amber-400">Sanad</span>
                            </span>
                            <span className="text-[10px] text-slate-300 font-bold tracking-widest uppercase -mt-1">
                                Assurance
                            </span>
                        </div>
                    </div>

                    {/* 🔵 Links dyal l-Site complete kma kano 9bel */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-white">
                        <a href="#hero" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all">Accueil</a>
                        <a href="#services" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all">Services</a>
                        <a href="#agencies" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all">Agences</a>
                        <a href="#about" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all">À Propos</a>
                        <a href="#contact" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all">Contact</a>
                    </div>

                    {/* 🔵 Boutons dial l-Ymn (Admin + Devis) */}
                    <div className="flex items-center gap-4">
                        
                        {/* 🔑 Bouton Admin dial s-sarout li kadi direct l l-Dashboard */}
                        <Link 
                            to="/admin/dashboard" 
                            className="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-amber-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-sm"
                        >
                            <Lock className="h-4 w-4 text-amber-400" />
                            <span>🔑 Admin</span>
                        </Link>

                        {/* 🟠 Bouton Devis Gratuit Original */}
                        <a 
                            href="#contact" 
                            className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#E06B00] text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all transform hover:scale-105"
                        >
                            Devis Gratuit
                        </a>
                    </div>

                </div>
            </div>
        </nav>
    );
}