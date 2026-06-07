import { useState, useEffect } from 'react';
import axios from 'axios'; // 🟢 L-import m7tout lfo9 nishan daba!

export default function Contact({ defaultProduct }) {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    type_assurance: defaultProduct || 'Automobile',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultProduct) {
      setFormData(p => ({ ...p, type_assurance: defaultProduct }));
    }
  }, [defaultProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🟢 Bypass direct l l-API dyal Laravel smoothly
      await axios.post('http://127.0.0.1:8000/api/devis', {
        nom: formData.nom,
        email: 'client@atlantasanad.ma', 
        telephone: formData.telephone,
        type_assurance: formData.type_assurance,
        message: formData.message
      });

      setStatus('success');
      setFormData({ nom: '', telephone: '', type_assurance: 'Automobile', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || (error.response?.data?.errors ? JSON.stringify(error.response.data.errors) : error.message);
      setStatus(`error:${errorMsg}`);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-black text-[#004B87] mb-8 text-center">
          Demande de Devis
        </h2>

        {status === 'success' && (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6 text-center font-bold">
            ✅ Demande envoyée avec succès!
          </div>
        )}

        {status && status.startsWith('error') && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl mb-6 text-center font-bold">
            ❌ {status.replace('error:', '')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            placeholder="Votre nom complet"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:border-[#004B87]"
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Votre téléphone"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:border-[#004B87]"
          />
          <select
            name="type_assurance"
            value={formData.type_assurance}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:border-[#004B87]"
          >
            <option>Automobile</option>
            <option>Habitation</option>
            <option>Santé</option>
            <option>Autre</option>
          </select>
          <textarea
            name="message"
            placeholder="Message (optionnel)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:border-[#004B87]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#004B87] text-white font-black py-4 rounded-xl hover:bg-[#003366] transition-all"
          >
            {loading ? 'Envoi...' : 'Envoyer la demande →'}
          </button>
        </form>
      </div>
    </section>
  );
}