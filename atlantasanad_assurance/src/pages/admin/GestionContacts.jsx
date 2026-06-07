import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Calendar, User, Info, MessageSquare } from 'lucide-react';
import api from '../../api/axios';

export default function GestionContacts() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contacts');
            setMessages(response.data.data || []);
        } catch (err) {
            console.error("Erreur de récupération des messages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Évite l'ouverture automatique du modal au clic sur le bouton supprimer
        if (window.confirm("Supprimer définitivement ce message ?")) {
            try {
                await api.delete(`/contacts/${id}`);
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (err) {
                alert("Échec de la suppression.");
            }
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Boîte de Réception Clients</h1>
                <p className="text-sm text-slate-500">Lisez et gérez les questions et réclamations reçues</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Liste des messages à gauche */}
                <div className="lg:col-span-2 space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                    {messages.length === 0 ? (
                        <div className="bg-white p-8 text-center text-slate-400 rounded-xl border border-slate-100">
                            <Mail className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                            Aucun message en boîte de réception.
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                    selectedMessage?.id === msg.id
                                        ? 'border-blue-500 ring-1 ring-blue-500'
                                        : 'border-slate-100 hover:border-slate-300 shadow-sm'
                                }`}
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-slate-800">{msg.nom}</span>
                                        <span className="text-xs text-slate-400">• {msg.email}</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600">{msg.sujet}</div>
                                    <p className="text-xs text-slate-400 max-w-md truncate">{msg.message}</p>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                    <button
                                        onClick={(e) => handleDelete(msg.id, e)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Inspecteur de détails à droite */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col h-fit sticky top-24">
                    {selectedMessage ? (
                        <div className="space-y-5">
                            <div className="border-b border-slate-100 pb-4">
                                <span className="px-2.5 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 inline-flex items-center gap-1">
                                    <Info className="h-3 w-3" /> Fiche Message
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 mt-2">{selectedMessage.sujet}</h3>
                            </div>

                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    <span>Expéditeur : <strong className="text-slate-800">{selectedMessage.nom}</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">{selectedMessage.email}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    <span>Reçu le : {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed min-h-32 whitespace-pre-line">
                                <MessageSquare className="h-4 w-4 text-slate-400 mb-2" />
                                {selectedMessage.message}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 text-slate-400 text-sm flex flex-col items-center justify-center gap-2">
                            <Mail className="h-8 w-8 text-slate-300 animate-pulse" />
                            <span>Sélectionnez un message dans la liste de gauche pour en inspecter le contenu complet.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}