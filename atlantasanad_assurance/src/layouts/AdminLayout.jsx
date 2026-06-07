import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Mail, LogOut, Menu, X, Shield, Bell, Home } from 'lucide-react';
import api from '../api/axios';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/devis', name: 'Gestion des Devis', icon: FileText },
        { path: '/admin/contacts', name: 'Messages Clients', icon: Mail },
    ];

    // 🟢 Had l-function gha-t-sta3mel useNavigate dakhliyan f React Router bch trj3ek l l-site direct
    const handleRedirectToSite = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            console.error('Erreur lors de la révocation du token à distance');
        } finally {
            localStorage.removeItem('atlanta_token');
            localStorage.removeItem('admin_user');
            navigate('/admin/login');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar pour Desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4 gap-2 mb-8">
                        <Shield className="h-6 w-6 text-blue-500" />
                        <span className="text-xl font-bold tracking-wider text-white">
                            Atlanta<span className="text-amber-500">Sanad</span>
                        </span>
                    </div>
                    <nav className="flex-1 px-3 space-y-1">
                        
                        {/* 🟢 Bouton Desktop kheddam b navigate('/') */}
                        <button
                            onClick={handleRedirectToSite}
                            className="w-full group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-150 text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 mb-4 cursor-pointer"
                        >
                            <Home className="mr-3 h-5 w-5 text-emerald-400" />
                            ← Retour au site
                        </button>

                        <div className="h-px bg-slate-700/50 my-3"></div>

                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex p-4 border-t border-slate-700/50">
                    <button
                        onClick={handleLogout}
                        className="w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-400" />
                        Déconnexion
                    </button>
                </div>
            </div>

            {/* Version Mobile de la Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 md:hidden">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-slate-900 border-r border-slate-700">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button onClick={() => setSidebarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center px-4 gap-2 mb-6">
                            <Shield className="h-6 w-6 text-blue-500" />
                            <span className="text-xl font-bold text-white">AtlantaSanad</span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            
                            {/* 🟢 Bouton Mobile kheddam b navigate('/') */}
                            <button
                                onClick={handleRedirectToSite}
                                className="w-full flex items-center px-4 py-3 text-base font-bold rounded-xl text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 mb-3 cursor-pointer"
                            >
                                <Home className="mr-4 h-6 w-6 text-emerald-400" />
                                ← Retour au site
                            </button>

                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-4 py-3 text-base font-medium rounded-xl ${
                                            isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                                        }`}
                                    >
                                        <Icon className="mr-4 h-6 w-6" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="p-4 border-t border-slate-800">
                            <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-base font-medium rounded-xl text-red-400 hover:bg-red-500/10">
                                <LogOut className="mr-4 h-6 w-6" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Conteneur Principal */}
            <div className="md:pl-64 flex flex-col flex-1 w-full">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 shadow-sm">
                    <button onClick={() => setSidebarOpen(true)} className="px-4 border-r border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex-1 flex justify-between px-4 md:px-0">
                        <div className="flex items-center">
                            <span className="text-slate-500 text-sm font-medium">Agence : Bureau Direct Biougra</span>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6 gap-4">
                            <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors">
                                <Bell className="h-5 w-5" />
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 font-semibold flex items-center justify-center border border-blue-200">
                                    AD
                                </div>
                                <span className="hidden sm:inline-block text-sm font-semibold text-slate-700">Administrateur</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}