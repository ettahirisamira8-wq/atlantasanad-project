import React from 'react';
import bureauImg from '../assets/images/bureau.jpg';

export default function Hero({ onQuoteClick }) {
  return (
    <section id="accueil" style={{minHeight:'100vh', background:'#071426', display:'flex', alignItems:'center', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', inset:0, backgroundImage:`url(${bureauImg})`, backgroundSize:'cover', backgroundPosition:'center', opacity:0.4}} />
      <div style={{position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,20,38,0.95), rgba(0,75,135,0.8))'}} />
      <div style={{position:'relative', zIndex:10, padding:'8rem 5% 4rem', maxWidth:'700px'}}>
        <div style={{display:'inline-block', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'white', fontSize:'11px', fontWeight:'bold', letterSpacing:'0.1em', padding:'6px 16px', borderRadius:'999px', marginBottom:'24px'}}>
          Bureau Direct Biougra – Agréé ACAPS
        </div>
        <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:'900', color:'white', lineHeight:1.1, marginBottom:'16px'}}>
          AtlantaSanad Assurance <br/>
          <span style={{color:'#FF7A00'}}>Votre Agence de Confiance à Biougra</span>
        </h1>
        <p style={{color:'rgba(255,255,255,0.8)', fontSize:'15px', marginBottom:'32px'}}>
          Bénéficiez de l'expertise de nos conseillers dédiés au cœur du Souss-Massa.
        </p>
        <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
          <button onClick={onQuoteClick} style={{background:'#E01A4F', color:'white', padding:'14px 32px', borderRadius:'12px', border:'none', fontWeight:'900', fontSize:'12px', letterSpacing:'0.05em', cursor:'pointer'}}>
            Demander un devis →
          </button>
          <a href="#agences" style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'14px 32px', borderRadius:'12px', fontWeight:'900', fontSize:'12px', letterSpacing:'0.05em', textDecoration:'none'}}>
            Nous Contacter
          </a>
        </div>
      </div>
    </section>
  );
}