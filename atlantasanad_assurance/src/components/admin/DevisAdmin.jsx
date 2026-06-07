import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Search, Trash2, FileText, RefreshCw } from 'lucide-react'

export default function DevisAdmin() {
  const [devis, setDevis] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchDevis = () => {
    setLoading(true)
    api.get('/devis').then(r => setDevis(r.data.data)).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { fetchDevis() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce devis ?')) return
    await api.delete(`/devis/${id}`)
    setDevis(devis.filter(d => d.id !== id))
  }

  const filtered = devis.filter(d =>
    d.nom.toLowerCase().includes(search.toLowerCase()) ||
    d.type_assurance.toLowerCase().includes(search.toLowerCase()) ||
    d.telephone.includes(search)
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B3E]">Gestion des Devis</h1>
          <p className="text-gray-500 text-sm mt-1">{devis.length} demandes au total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1565C0] bg-white"
            />
          </div>
          <button onClick={fetchDevis} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <RefreshCw size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <FileText size={40} className="mb-2 opacity-30" />
            <p className="text-sm">Aucun devis trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['#','Nom','Téléphone','Email','Type Assurance','Message','Statut','Date','Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400">#{d.id}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[#0D1B3E] whitespace-nowrap">{d.nom}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{d.telephone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{d.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 whitespace-nowrap">
                        {d.type_assurance}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-[150px] truncate">{d.message || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(d.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}