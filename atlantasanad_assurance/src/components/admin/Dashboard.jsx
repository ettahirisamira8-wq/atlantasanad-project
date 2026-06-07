import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { FileText, MessageSquare, Clock, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [devis, setDevis] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get('/devis'), api.get('/contacts')])
      .then(([d, c]) => { setDevis(d.data.data); setContacts(c.data.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const pending = devis.filter(d => d.status === 'en_attente').length

  const stats = [
    { label: 'Total Devis', value: devis.length, icon: FileText, color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'En Attente', value: pending, icon: Clock, color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Messages', value: contacts.length, icon: MessageSquare, color: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600' },
    { label: 'Traités', value: devis.length - pending, icon: CheckCircle, color: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0D1B3E]">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble — AtlantaSanad Biougra</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className={`w-11 h-11 ${s.light} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon size={22} className={s.text} />
                </div>
                <p className="text-3xl font-black text-[#0D1B3E]">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link to="/admin/devis" className="bg-gradient-to-br from-[#1565C0] to-[#0D1B3E] rounded-2xl p-6 text-white flex items-center justify-between hover:shadow-lg transition-all">
              <div>
                <p className="font-black text-lg">Gérer les Devis</p>
                <p className="text-blue-200 text-sm mt-1">{devis.length} demandes au total</p>
              </div>
              <ArrowRight size={24} className="text-blue-200" />
            </Link>
            <Link to="/admin/contacts" className="bg-gradient-to-br from-[#00838F] to-[#004D54] rounded-2xl p-6 text-white flex items-center justify-between hover:shadow-lg transition-all">
              <div>
                <p className="font-black text-lg">Gérer les Contacts</p>
                <p className="text-teal-200 text-sm mt-1">{contacts.length} messages reçus</p>
              </div>
              <ArrowRight size={24} className="text-teal-200" />
            </Link>
          </div>

          {/* Recent Devis Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#1565C0]" />
                <h2 className="font-bold text-[#0D1B3E]">Dernières demandes de devis</h2>
              </div>
              <Link to="/admin/devis" className="text-sm text-[#1565C0] hover:underline font-medium">Voir tout →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Nom','Téléphone','Type','Statut','Date'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {devis.slice(0, 5).map(d => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-[#0D1B3E]">{d.nom}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{d.telephone}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{d.type_assurance}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}