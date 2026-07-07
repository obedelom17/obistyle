"use client";
import { useState } from "react";

type Produit = {
  id: string;
  nom: string;
  prix: number;
  devise: string;
  categorie: string;
  description: string;
  image_url: string;
};

const MOT_DE_PASSE = "@gbebavi6";

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const IconPackage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function Admin() {
  const [connecte, setConnecte] = useState(false);
  const [mdp, setMdp] = useState("");
  const [erreurMdp, setErreurMdp] = useState(false);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState(false);
  const [form, setForm] = useState({ nom: "", prix: "", devise: "FCFA", categorie: "", description: "", image_url: "" });

  const seConnecter = () => {
    if (mdp === MOT_DE_PASSE) { setConnecte(true); chargerProduits(); }
    else { setErreurMdp(true); setTimeout(() => setErreurMdp(false), 2000); }
  };

  const chargerProduits = async () => {
    const res = await fetch("/api/produits");
    const data = await res.json();
    if (Array.isArray(data)) setProduits(data);
  };

  const ajouterProduit = async () => {
    if (!form.nom || !form.prix || !form.categorie) {
      setMessage("Remplis nom, prix et catégorie.");
      setMessageOk(false);
      return;
    }
    setChargement(true);
    const res = await fetch("/api/produits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, prix: parseInt(form.prix) })
    });
    if (res.ok) {
      setMessage("Produit ajouté avec succès.");
      setMessageOk(true);
      setForm({ nom: "", prix: "", devise: "FCFA", categorie: "", description: "", image_url: "" });
      chargerProduits();
    } else {
      const err = await res.json();
      setMessage(err.error || "Erreur serveur.");
      setMessageOk(false);
    }
    setChargement(false);
    setTimeout(() => setMessage(""), 4000);
  };

  const supprimerProduit = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/produits/${id}`, { method: "DELETE" });
    chargerProduits();
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(212,163,89,0.04)",
    border: "1.5px solid rgba(212,163,89,0.15)",
    borderRadius: "12px", padding: "13px 18px",
    fontSize: "14px", outline: "none",
    fontFamily: "'Jost', sans-serif",
    color: "#fdf6ec", transition: "border-color 0.2s, box-shadow 0.2s"
  } as React.CSSProperties;

  const labelStyle = {
    fontSize: "11px", fontWeight: 700,
    color: "rgba(212,163,89,0.5)", letterSpacing: "2px",
    textTransform: "uppercase" as const, display: "block", marginBottom: "10px"
  };

  if (!connecte) return (
    <div style={{
      minHeight: "100vh", background: "#0a0500",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", fontFamily: "'Jost', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Jost:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes shake { 0%,100% { transform:translateX(0); } 20%,60% { transform:translateX(-6px); } 40%,80% { transform:translateX(6px); } }
        input:focus { border-color: rgba(212,163,89,0.6) !important; box-shadow: 0 0 0 3px rgba(212,163,89,0.1) !important; }
      `}</style>
      <div style={{
        background: "linear-gradient(145deg, #1a0a00, #120800)",
        border: "1px solid rgba(212,163,89,0.15)",
        borderRadius: "28px", padding: "56px 48px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        textAlign: "center",
        animation: "fadeUp 0.6s cubic-bezier(0.23,1,0.32,1)"
      }}>
        <div style={{
          width: "60px", height: "60px",
          background: "linear-gradient(135deg, #d4a359, #8b5e20)",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", color: "#0a0500",
          animation: "float 4s ease-in-out infinite"
        }}>
          <IconLock />
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", color: "#d4a359", marginBottom: "6px", letterSpacing: "4px" }}>
          OBI STYLE
        </div>
        <p style={{ color: "rgba(212,163,89,0.4)", fontSize: "11px", letterSpacing: "5px", marginBottom: "40px", textTransform: "uppercase" }}>
          Espace Admin
        </p>
        <input
          type="password" placeholder="Mot de passe" value={mdp}
          onChange={e => { setMdp(e.target.value); setErreurMdp(false); }}
          onKeyDown={e => e.key === "Enter" && seConnecter()}
          style={{
            ...inputStyle,
            borderColor: erreurMdp ? "#e74c3c" : "rgba(212,163,89,0.2)",
            marginBottom: "12px", letterSpacing: "2px",
            animation: erreurMdp ? "shake 0.4s ease" : "none"
          }}
        />
        {erreurMdp && <p style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}>Mot de passe incorrect</p>}
        <button onClick={seConnecter} style={{
          width: "100%",
          background: "linear-gradient(135deg, #d4a359, #b8882e)",
          color: "#0a0500", border: "none",
          padding: "16px", borderRadius: "14px",
          fontSize: "15px", fontWeight: 700,
          cursor: "pointer", fontFamily: "'Jost', sans-serif",
          letterSpacing: "2px", textTransform: "uppercase"
        }}>
          Connexion
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0500", fontFamily: "'Jost', sans-serif", color: "#fdf6ec" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Jost:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input:focus, textarea:focus, select:focus { border-color: rgba(212,163,89,0.6) !important; box-shadow: 0 0 0 3px rgba(212,163,89,0.1) !important; }
      `}</style>

      <nav style={{
        background: "rgba(10,5,0,0.95)", backdropFilter: "blur(20px)",
        padding: "0 clamp(16px,3vw,48px)", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(212,163,89,0.1)",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#d4a359", letterSpacing: "3px" }}>OBI STYLE</div>
          <div style={{
            background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.2)",
            color: "rgba(212,163,89,0.7)", padding: "3px 12px", borderRadius: "20px",
            fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase"
          }}>Admin</div>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a href="/" style={{ color: "rgba(212,163,89,0.5)", fontSize: "13px", textDecoration: "none", letterSpacing: "1px" }}>
            ← Boutique
          </a>
          <button onClick={() => setConnecte(false)} style={{
            background: "rgba(212,163,89,0.08)", border: "1px solid rgba(212,163,89,0.2)",
            color: "rgba(212,163,89,0.7)", padding: "8px 20px",
            borderRadius: "20px", cursor: "pointer",
            fontSize: "12px", fontFamily: "'Jost', sans-serif",
            letterSpacing: "1px", textTransform: "uppercase"
          }}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px clamp(16px,3vw,32px)" }}>

        {/* FORM */}
        <div style={{
          background: "linear-gradient(145deg, #1a0a00, #120800)",
          border: "1px solid rgba(212,163,89,0.1)",
          borderRadius: "24px", padding: "clamp(24px,4vw,44px)",
          marginBottom: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          animation: "fadeUp 0.5s ease"
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px,3vw,30px)", color: "#fdf6ec",
            marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px"
          }}>
            <span style={{ color: "#d4a359" }}><IconPlus /></span> Ajouter un produit
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { label: "Nom du produit *", key: "nom", placeholder: "Ex: Pagne Wax Premium", type: "text" },
              { label: "Prix *", key: "prix", placeholder: "Ex: 8500", type: "number" },
              { label: "Catégorie *", key: "categorie", placeholder: "Pagnes, Vêtements, Sacs…", type: "text" },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={inputStyle} />
              </div>
            ))}

            <div>
              <label style={labelStyle}>Devise</label>
              <select value={form.devise} onChange={e => setForm({ ...form, devise: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="FCFA">FCFA</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>URL de l'image</label>
              <input type="url" placeholder="https://..." value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                style={inputStyle} />
              {form.image_url && (
                <img src={form.image_url} alt="Aperçu" style={{
                  marginTop: "12px", height: "140px", borderRadius: "12px",
                  objectFit: "cover", border: "1px solid rgba(212,163,89,0.2)"
                }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              )}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="Décris le produit..." value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                style={{ ...inputStyle, resize: "vertical" as const }} />
            </div>
          </div>

          {message && (
            <div style={{
              marginTop: "20px", padding: "16px 20px", borderRadius: "12px",
              textAlign: "center", fontWeight: 600, fontSize: "14px",
              background: messageOk ? "rgba(39,174,96,0.12)" : "rgba(231,76,60,0.12)",
              border: `1px solid ${messageOk ? "rgba(39,174,96,0.3)" : "rgba(231,76,60,0.3)"}`,
              color: messageOk ? "#2ecc71" : "#e74c3c"
            }}>
              {message}
            </div>
          )}

          <button onClick={ajouterProduit} disabled={chargement} style={{
            marginTop: "24px", width: "100%",
            background: chargement ? "rgba(212,163,89,0.3)" : "linear-gradient(135deg, #d4a359, #b8882e)",
            color: "#0a0500", border: "none",
            padding: "18px", borderRadius: "14px",
            fontSize: "15px", fontWeight: 700,
            cursor: chargement ? "not-allowed" : "pointer",
            fontFamily: "'Jost', sans-serif",
            letterSpacing: "2px", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}>
            <IconPlus />
            {chargement ? "Ajout en cours…" : "Ajouter le produit"}
          </button>
        </div>

        {/* LIST */}
        <div style={{
          background: "linear-gradient(145deg, #1a0a00, #120800)",
          border: "1px solid rgba(212,163,89,0.1)",
          borderRadius: "24px", padding: "clamp(24px,4vw,44px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          animation: "fadeUp 0.5s ease 0.1s both"
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px,3vw,30px)", color: "#fdf6ec",
            marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px"
          }}>
            <span style={{ color: "#d4a359" }}><IconPackage /></span>
            Produits
            <span style={{
              background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.2)",
              color: "#d4a359", padding: "3px 14px", borderRadius: "20px", fontSize: "14px"
            }}>{produits.length}</span>
          </h2>

          {produits.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgba(253,246,236,0.2)", padding: "48px", fontSize: "16px" }}>
              Aucun produit
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {produits.map((p, i) => (
                <div key={p.id} style={{
                  display: "flex", gap: "16px", alignItems: "center",
                  background: "rgba(212,163,89,0.04)",
                  border: "1px solid rgba(212,163,89,0.08)",
                  borderRadius: "16px", padding: "16px",
                  animation: `fadeUp 0.4s ease ${i * 0.05}s both`
                }}>
                  <img
                    src={p.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100"}
                    alt={p.nom}
                    style={{
                      width: "64px", height: "64px", borderRadius: "12px",
                      objectFit: "cover", border: "1px solid rgba(212,163,89,0.15)", flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: "#fdf6ec", fontSize: "15px", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.nom}
                    </p>
                    <p style={{ color: "#d4a359", fontWeight: 700, marginBottom: "6px" }}>
                      {p.prix.toLocaleString()} {p.devise}
                    </p>
                    <span style={{
                      fontSize: "10px",
                      background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.2)",
                      color: "rgba(212,163,89,0.7)", padding: "2px 10px", borderRadius: "20px",
                      fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase"
                    }}>
                      {p.categorie}
                    </span>
                  </div>
                  <button onClick={() => supprimerProduit(p.id)} style={{
                    background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.2)",
                    color: "#e74c3c", cursor: "pointer",
                    width: "40px", height: "40px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", flexShrink: 0
                  }}>
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
