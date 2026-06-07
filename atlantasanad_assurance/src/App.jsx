import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts et Pages Administrative
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import GestionDevis from './pages/admin/GestionDevis';
import GestionContacts from './pages/admin/GestionContacts';

// 🟢 Importation dyal GA3 l-components dyal l-site public nishan
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Agencies from './components/Agencies';
import Contact from './components/Contact';
import DigitalServices from './components/DigitalServices';
import Footer from './components/Footer';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* ----------------- DOSSIER PUBLIC (L-SITE L'AM KAML) ----------------- */}
                <Route path="/" element={
                    <div className="min-h-screen bg-white">
                        <Navbar />
                        <Hero />
                        <Services />
                        <DigitalServices />
                        <About />
                        <Agencies />
                        <Contact />
                        <Footer />
                    </div>
                } />

                {/* ----------------- DOSSIER ADMIN ----------------- */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route path="devis" element={<GestionDevis />} />
                    <Route path="contacts" element={<GestionContacts />} />
                </Route>

                {/* ----------------- REDIRECTION ----------------- */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}       