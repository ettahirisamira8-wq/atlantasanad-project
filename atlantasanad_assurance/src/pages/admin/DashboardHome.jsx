import React, { useState, useEffect } from 'react';
import { FileText, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function DashboardHome() {
    const [stats, setStats] = useState({ totalDevis: 0, totalMessages: 0, pendingDevis: 0 });
    const [recentDevis, setRecentDevis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // جلب البيانات من الباكيند مع حماية الـ contacts في حالة عدم وجود المسار بعد
                const [devisRes, contactRes] = await Promise.all([
                    api.get('/devis'),
                    api.get('/contacts').catch(() => ({ data: [] }))
                ]);
                
                // التأكد من قراءة البيانات بالشكل الصحيح سواء كانت Array مباشرة أو مغلفة
                const devisData = Array.isArray(devisRes.data) ? devisRes.data : (devisRes.data.data || []);
                const contactData = Array.isArray(contactRes.data) ? contactRes.data : (contactRes.data.data || []);
                
                // حساب الطلبات التي في الانتظار (إذا لم يتوفر الـ status نعتبرها En attente كافتراضي)
                const pending = devisData.filter(d => (d.status || 'En attente') === 'En attente').length;

                setStats({
                    totalDevis: devisData.length,
                    totalMessages: contactData.length,
                    pendingDevis: pending
                });
                
                // عرض آخر 5 طلبات في الجدول
                setRecentDevis(devisData.slice(0, 5));
            } catch (err) {
                console.error("Problème lors du chargement des indicateurs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const cards = [
        { title: 'Total Devis Reçus', value: stats.totalDevis, icon: FileText, color: 'bg-blue-500 text-blue-600 bg-opacity-10' },
        { title: 'Messages Clients', value: stats.totalMessages, icon: Mail, color: 'bg-emerald-500 text-emerald-600 bg-opacity-10' },
        { title: 'Demandes en Attente', value: stats.pendingDevis, icon: Clock, color: 'bg-amber-500 text-amber-600 bg-opacity-10' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Rapport de Performance</h1>
                <p className="text-slate-500 text-sm mt-1">Données centralisées du système en temps réel</p>
            </div>

            {/* Grille de Widgets Statistiques */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400 truncate">{card.title}</p>
                            <p className="mt-2 text-3xl font-bold text-slate-800">{card.value}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${card.color.split(' ')[0]} ${card.color.split(' ')[1]} bg-opacity-10`}>
                            <card.icon className="h-6 w-6" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Raccourcis Opérationnels */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/admin/devis" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50/50 group border border-slate-100 transition-colors">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Traiter les devis clients</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/admin/contacts" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50/50 group border border-slate-100 transition-colors">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600">Consulter la messagerie</span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Tableau des Entrées Récentes */}
            <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Dernières Demandes de Devis</h3>
                    <Link to="/admin/devis" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Voir tout</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Téléphone</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type d'Assurance</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {recentDevis.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-slate-400">Aucune demande enregistrée actuellement.</td>
                                </tr>
                            ) : (
                                recentDevis.map((devis) => (
                                    <tr key={devis.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-700">{devis.nom}</td>
                                        <td className="px-6 py-4 text-slate-500">{devis.telephone}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-md text-xs">
                                                {devis.type_assurance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full ${
                                                (devis.status || 'En attente') === 'En attente' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                                            }`}>
                                                <Clock className="h-3 w-3" />
                                                {devis.status || 'En attente'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}