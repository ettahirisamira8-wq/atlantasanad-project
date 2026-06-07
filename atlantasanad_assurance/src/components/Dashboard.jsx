import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Dashboard({ onLogout }) {
  const [devis, setDevis] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('devis');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [devisRes, contactsRes] = await Promise.all([
        api.get('/devis'),
        api.get('/contacts')
      ]);
      setDevis(devisRes.data.data);
      setContacts(contactsRes.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce devis?')) return;
    await api.delete(`/devis/${id}`);
    setDevis(devis.filter(d => d.id !== id));
  };

  const handleLogout = async () => {
    await api.post('/logout');
    localStorage.removeItem('atlanta_token');
    localStorage.removeItem('atlanta_role');
    onLogout();
  };

  return (
    <div style={{minHeight:'100vh', background:'#F8FAFC'}}>
      
      {/* Header */}
      <div style={{background:'#004B87', padding:'16px 32px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <span style={{fontSize:'24px'}}>🛡️</span>
          <div>
            <h1 style={{color:'white', fontSize:'16px', fontWeight:'900', margin:0}}>AtlantaSanad</h1>
            <p style={{color:'rgba(255,255,255,0.6)', fontSize:'11px', margin:0}}>Dashboard Administrateur</p>
          </div>
        </div>
        <button onClick={handleLogout}
          style={{background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.2)', padding:'8px 20px', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:'700'}}>
          Déconnexion
        </button>
      </div>

      {/* Stats */}
      <div style={{padding:'32px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{background:'white', borderRadius:'12px', padding:'24px', border:'1px solid #E2E8F0', borderLeft:'4px solid #004B87'}}>
          <p style={{color:'#64748b', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', margin:'0 0 8px'}}>Total Devis</p>
          <p style={{fontSize:'36px', fontWeight:'900', color:'#004B87', margin:0}}>{devis.length}</p>
        </div>
        <div style={{background:'white', borderRadius:'12px', padding:'24px', border:'1px solid #E2E8F0', borderLeft:'4px solid #E01A4F'}}>
          <p style={{color:'#64748b', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', margin:'0 0 8px'}}>En Attente</p>
          <p style={{fontSize:'36px', fontWeight:'900', color:'#E01A4F', margin:0}}>{devis.filter(d => d.status === 'en_attente').length}</p>
        </div>
        <div style={{background:'white', borderRadius:'12px', padding:'24px', border:'1px solid #E2E8F0', borderLeft:'4px solid #25D366'}}>
          <p style={{color:'#64748b', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', margin:'0 0 8px'}}>Messages Contact</p>
          <p style={{fontSize:'36px', fontWeight:'900', color:'#25D366', margin:0}}>{contacts.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{padding:'0 32px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{display:'flex', gap:'8px', marginBottom:'24px'}}>
          <button onClick={() => setActiveTab('devis')}
            style={{padding:'10px 24px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'700', fontSize:'13px', background: activeTab === 'devis' ? '#004B87' : 'white', color: activeTab === 'devis' ? 'white' : '#64748b'}}>
            📋 Devis ({devis.length})
          </button>
          <button onClick={() => setActiveTab('contacts')}
            style={{padding:'10px 24px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'700', fontSize:'13px', background: activeTab === 'contacts' ? '#004B87' : 'white', color: activeTab === 'contacts' ? 'white' : '#64748b'}}>
            💬 Contacts ({contacts.length})
          </button>
        </div>

        {loading ? (
          <div style={{textAlign:'center', padding:'48px', color:'#64748b'}}>Chargement...</div>
        ) : (
          <div style={{background:'white', borderRadius:'12px', border:'1px solid #E2E8F0', overflow:'hidden'}}>
            {activeTab === 'devis' && (
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Nom</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Téléphone</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Type</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Status</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Date</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {devis.map((d, i) => (
                    <tr key={d.id} style={{borderTop:'1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : '#FAFAFA'}}>
                      <td style={{padding:'12px 16px', fontSize:'13px', fontWeight:'600', color:'#1E293B'}}>{d.nom}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', color:'#64748b'}}>{d.telephone}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', color:'#64748b'}}>{d.type_assurance}</td>
                      <td style={{padding:'12px 16px'}}>
                        <span style={{background:'#FEF3C7', color:'#92400E', padding:'4px 10px', borderRadius:'999px', fontSize:'11px', fontWeight:'700'}}>
                          {d.status}
                        </span>
                      </td>
                      <td style={{padding:'12px 16px', fontSize:'12px', color:'#94A3B8'}}>{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{padding:'12px 16px'}}>
                        <button onClick={() => handleDelete(d.id)}
                          style={{background:'#FEE2E2', color:'#991B1B', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'12px', fontWeight:'700'}}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'contacts' && (
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Nom</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Email</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Sujet</th>
                    <th style={{padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:'700', color:'#64748b', textTransform:'uppercase'}}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={c.id} style={{borderTop:'1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : '#FAFAFA'}}>
                      <td style={{padding:'12px 16px', fontSize:'13px', fontWeight:'600', color:'#1E293B'}}>{c.nom}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', color:'#64748b'}}>{c.email}</td>
                      <td style={{padding:'12px 16px', fontSize:'13px', color:'#64748b'}}>{c.sujet}</td>
                      <td style={{padding:'12px 16px', fontSize:'12px', color:'#94A3B8'}}>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}