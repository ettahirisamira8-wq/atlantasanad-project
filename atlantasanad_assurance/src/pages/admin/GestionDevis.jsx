import React, { useState, useEffect } from 'react';
import { Search, Trash2, Calendar, FileText, AlertCircle, Phone, HelpCircle } from 'lucide-react';
import api from '../../api/axios';

export default function GestionDevis() {
    const [devis, setDevis] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('Tous');
    const [loading, setLoading] = useState(true);

    const fetchDevis = async () => {
        try {
            const response = await api.get('/devis');
            setDevis(response.data.data || []);
        } catch (err) {
            console.error("Échec du chargement de la base de données des devis.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDevis(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Confirmez-vous la suppression définitive de cette fiche de devis ?")) {
            try {
                await api.delete(`/devis/${id}`);
                setDevis(devis.filter(d => d.id !== id));
            } catch (err) {
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    const filteredDevis = devis.filter(item => {
        const matchesSearch = item.nom.toLowerCase().includes(search.toLowerCase()) || item.telephone.includes(search);
        const matchesFilter = filterType === 'Tous' || item.type_assurance === filterType;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Gestion des Demandes de Devis</h1>
                    <p className="text-sm text-slate-500">Consultez et purgez les formulaires remplis par les clients</p>
                </div>
            </div>

            {/* Outils de filtrage et recherche */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou numéro de téléphone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                </div>
                <div className="w-full md:w-64">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    >
                        <option value="Tous">Toutes les branches</option>
                        <option value="Automobile">Assurance Auto</option>
                        <option value="Santé">Assurance Santé</option>
                        <option value="Habitation">Assurance Habitation</option>
                    </select>
                </div>
            </div>

            {/* Conteneur de Table responsive */}
            <div className="bg-white shadow-sm rounded-xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <th className="px-6 py-3.5">Client</th>
                                <th className="px-6 py-3.5">Assurance</th>
                                <th className="px-6 py-3.5">Notes complémentaires</th>
                                <th className="px-6 py-3.5">Date de dépôt</th>
                                <th className="px-6 py-3.5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredDevis.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <AlertCircle className="h-8 w-8 text-slate-300" />
                                            <span>Aucun dossier ne correspond à vos critères de recherche.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredDevis.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{item.nom}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                <Phone className="h-3 w-3" /> {item.telephone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                <FileText className="h-3 w-3" /> {item.type_assurance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-slate-600" title={item.message}>
                                            {item.message || <span className="text-slate-300 italic">Aucune note fournie</span>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-xs">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(item.created_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Supprimer la fiche"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
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