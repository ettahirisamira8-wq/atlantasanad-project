import { useState, useEffect } from 'react'
import api from '../../api/axios'
import { Search, Trash2, MessageSquare, RefreshCw, Eye, X } from 'lucide-react'

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchContacts = () => {
    setLoading(true)
    api.get('/contacts').then(r => setContacts(r.data.data)).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { fetchContacts() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    await api.delete(`/contacts/${id}`)
    setContacts(contacts.filter(c => c.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = contacts.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.sujet.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B3E]">Gestion des Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">{contacts.length} messages reçus</p>
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
          <button onClick={fetchContacts} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <RefreshCw size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <MessageSquare size={40} className="mb-2 opacity-30" />
              <p className="text-sm">Aucun message trouvé</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(c => (
                <div key={c.id} className={`p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${selected?.id === c.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelected(c)}>
                  <div className="w-10 h-10 bg-[#1565C0] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {c.nom[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-sm text-[#0D1B3E] truncate">{c.nom}</p>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-xs text-[#1565C0]">{c.email}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">{c.sujet}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={e => { e.stopPropagation(); setSelected(c) }} className="p-1.5 hover:bg-blue-100 text-blue-500 rounded-lg">
                      <Eye size={14} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); handleDelete(c.id) }} className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0D1B3E]">Détail du message</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="w-14 h-14 bg-[#1565C0] rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto">
                  {selected.nom[0].toUpperCase()}
                </div>
                <div className="text-center">
                  <p className="font-black text-[#0D1B3E]">{selected.nom}</p>
                  <p className="text-sm text-[#1565C0]">{selected.email}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Sujet</p>
                  <p className="text-sm font-semibold text-[#0D1B3E]">{selected.sujet}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Message</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {new Date(selected.created_at).toLocaleString('fr-FR')}
                </div>
                <button onClick={() => handleDelete(selected.id)}
                  className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                  <Trash2 size={15} /> Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 py-12">
              <MessageSquare size={40} className="mb-2" />
              <p className="text-sm">Sélectionner un message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}