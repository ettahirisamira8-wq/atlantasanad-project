import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('atlanta_token');

    // Si aucun token n'est stocké localement, refuser l'accès et rediriger vers la page d'authentification
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}