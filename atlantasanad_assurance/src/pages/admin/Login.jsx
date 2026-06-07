import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../api/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login', { email, password });
            if (response.data.status === 'success' || response.data.token) {
                localStorage.setItem('atlanta_token', response.data.token);
                localStorage.setItem('admin_user', JSON.stringify(response.data.user));
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Identifiants incorrects ou problème serveur.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Formes géométriques d'arrière-plan */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-800 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="sm:mx-auto w-full max-w-md relative z-10">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/30">
                        <Shield className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-wider text-white">
                        Atlanta<span className="text-amber-500">Sanad</span>
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Espace Administration
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Gestion sécurisée du Bureau Direct Biougra
                </p>
            </div>

            <div className="mt-8 sm:mx-auto w-full max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-slate-800 py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/50">
                    {error && (
                        <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-200">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300">
                                Adresse e-mail professionnelle
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="admin@atlantasanad.ma"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300">
                                Mot de passe
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <RefreshCw className="h-5 w-5 animate-spin" />
                                ) : (
                                    'Se connecter au Dashboard'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}