"use client";
import { useState, useEffect, useRef } from "react";

type Produit = {
  id: string;
  nom: string;
  prix: number;
  devise: string;
  categorie: string;
  description: string;
  image_url: string;
};

type PanierItem = Produit & { quantite: number };

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.59 2.72h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 17.5z"/>
  </svg>
);

const IconTruck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const IconScissors = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const IconMessage = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconStar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconPackage = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const IconEmptyCart = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const IconArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

const Diamond = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a0500">
    <polygon points="5,0 10,5 5,10 0,5"/>
  </svg>
);

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tous"]);
  const [categorieActive, setCategorieActive] = useState("Tous");
  const [panier, setPanier] = useState<PanierItem[]>([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const catalogueSection = useInView(0.1);
  const statsSection = useInView(0.2);
  const featureSection = useInView(0.2);

  useEffect(() => {
    fetch("/api/produits")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProduits(data);
          const cats = ["Tous", ...Array.from(new Set(data.map((p: Produit) => p.categorie)))];
          setCategories(cats);
        }
        setChargement(false);
      })
      .catch(() => setChargement(false));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setNavVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const produitsFiltres = (categorieActive === "Tous" ? produits : produits.filter(p => p.categorie === categorieActive))
    .filter(p => !searchTerm || p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const ajouterAuPanier = (produit: Produit) => {
    setPanier(prev => {
      const existe = prev.find(p => p.id === produit.id);
      if (existe) return prev.map(p => p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p);
      return [...prev, { ...produit, quantite: 1 }];
    });
    setAddedId(produit.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const retirerDuPanier = (id: string) => setPanier(prev => prev.filter(p => p.id !== id));
  const modifierQuantite = (id: string, delta: number) => {
    setPanier(prev => prev.map(p => p.id === id ? { ...p, quantite: Math.max(1, p.quantite + delta) } : p));
  };

  const totalPanier = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const totalItems = panier.reduce((a, p) => a + p.quantite, 0);

  const commanderViaWhatsApp = () => {
    const numero = "2290155963455";
    const lignes = panier.map(p => `• ${p.nom} x${p.quantite} = ${(p.prix * p.quantite).toLocaleString()} FCFA`).join("\n");
    const message = `Bonjour ! Je voudrais commander :\n\n${lignes}\n\n*Total : ${totalPanier.toLocaleString()} FCFA*\n\nMerci !`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const parallaxOffset = scrollY * 0.35;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: #0a0500; color: #fdf6ec; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a0a00; }
        ::-webkit-scrollbar-thumb { background: #d4a359; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes shimmer { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes rotate { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
        @keyframes pulse-gold { 0%,100% { box-shadow:0 0 0 0 rgba(212,163,89,0.4); } 50% { box-shadow:0 0 0 20px rgba(212,163,89,0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes glow { 0%,100% { text-shadow:0 0 10px rgba(212,163,89,0.3); } 50% { text-shadow:0 0 30px rgba(212,163,89,0.8), 0 0 60px rgba(212,163,89,0.4); } }
        @keyframes borderDance { 0% { background-position:0% 50%; } 100% { background-position:200% 50%; } }
        @keyframes waxPattern { 0% { background-position:0 0; } 100% { background-position:60px 60px; } }
        @keyframes cardReveal { from { opacity:0; transform:translateY(30px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes numberCount { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes panierSlide { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }
        @keyframes successPop { 0% { transform:scale(0.5); opacity:0; } 60% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes heroText1 { 0% { opacity:0; transform:translateY(60px) skewY(3deg); } 100% { opacity:1; transform:translateY(0) skewY(0deg); } }
        @keyframes heroText2 { 0% { opacity:0; transform:translateX(-40px); } 100% { opacity:1; transform:translateX(0); } }
        @keyframes particleFloat { 0%,100% { transform:translate(0,0) rotate(0deg); opacity:0.6; } 33% { transform:translate(30px,-20px) rotate(120deg); opacity:1; } 66% { transform:translate(-20px,10px) rotate(240deg); opacity:0.4; } }
        @keyframes lineGrow { from { width:0; } to { width:80px; } }
        @keyframes starTwinkle { 0%,100% { opacity:0.3; transform:scale(1); } 50% { opacity:1; transform:scale(1.3); } }

        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards; }
        .reveal { opacity:0; transform:translateY(40px); transition:all 0.8s cubic-bezier(0.23,1,0.32,1); }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .product-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease; cursor:pointer; }
        .product-card:hover { transform:translateY(-12px) scale(1.02); box-shadow:0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,163,89,0.2); }
        .product-card:hover .card-img { transform:scale(1.08); }
        .card-img { transition:transform 0.6s cubic-bezier(0.23,1,0.32,1); }
        .btn-gold { position:relative; overflow:hidden; transition:all 0.3s ease; }
        .btn-gold::before { content:''; position:absolute; top:50%; left:50%; width:0; height:0; background:rgba(255,255,255,0.15); border-radius:50%; transform:translate(-50%,-50%); transition:width 0.4s ease, height 0.4s ease; }
        .btn-gold:hover::before { width:200%; height:200%; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(212,163,89,0.4); }
        .btn-gold:active { transform:translateY(0) scale(0.98); }
        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#d4a359; transition:width 0.3s ease; }
        .nav-link:hover::after { width:100%; }
        .cat-btn { transition:all 0.3s cubic-bezier(0.23,1,0.32,1); }
        .cat-btn:hover { transform:scale(1.05); }
        .cat-btn.active { animation: pulse-gold 2s infinite; }
        .marquee-track { display:flex; width:max-content; animation:marquee 25s linear infinite; }
        .marquee-track:hover { animation-play-state:paused; }
        .loader { width:40px; height:40px; border:3px solid rgba(212,163,89,0.2); border-top-color:#d4a359; border-radius:50%; animation:spin 0.8s linear infinite; }
        .panier-panel { animation:panierSlide 0.4s cubic-bezier(0.23,1,0.32,1); }
        .panier-overlay { animation:overlayIn 0.3s ease; }
        .particle { position:absolute; width:4px; height:4px; background:#d4a359; border-radius:50%; animation:particleFloat 8s ease-in-out infinite; }
        .gradient-text { background:linear-gradient(135deg, #d4a359, #f0c87a, #d4a359); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:borderDance 4s linear infinite; }
        .glass { background:rgba(255,255,255,0.04); backdrop-filter:blur(20px); border:1px solid rgba(212,163,89,0.1); }
        .star { animation:starTwinkle 3s ease-in-out infinite; }
        .icon-gold { color: #d4a359; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0a0500" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.3s ease",
          background: scrollY > 50 ? "rgba(10,5,0,0.95)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(212,163,89,0.15)" : "none",
          padding: "0 clamp(16px, 4vw, 48px)",
          height: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #d4a359, #8b5e20)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              animation: "float 4s ease-in-out infinite"
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#0a0500">
                <polygon points="7,0 8.5,5 14,5 9.5,8 11,14 7,10.5 3,14 4.5,8 0,5 5.5,5"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, letterSpacing: "3px", color: "#fdf6ec", lineHeight: 1 }}>
                OBI STYLE
              </div>
              <div style={{ fontSize: "9px", color: "rgba(212,163,89,0.7)", letterSpacing: "5px", textTransform: "uppercase" }}>Mode Africaine</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={() => setSearchOpen(v => !v)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: "rgba(212,163,89,0.7)", padding: "8px",
              transition: "color 0.2s", display: "flex", alignItems: "center"
            }}>
              <IconSearch />
            </button>

            <button onClick={() => setPanierOuvert(true)} className="btn-gold" style={{
              background: totalItems > 0 ? "linear-gradient(135deg, #d4a359, #b8882e)" : "transparent",
              border: "1.5px solid #d4a359",
              color: totalItems > 0 ? "#1a0a00" : "#d4a359",
              padding: "10px 22px", borderRadius: "50px", cursor: "pointer",
              fontFamily: "'Jost', sans-serif", fontSize: "14px", fontWeight: 600,
              letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px",
              position: "relative"
            }}>
              <IconCart />
              {totalItems > 0 && <span style={{ fontWeight: 700 }}>{totalItems}</span>}
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: "-6px", right: "-6px",
                  width: "10px", height: "10px", background: "#d4a359",
                  borderRadius: "50%", animation: "pulse-gold 1.5s infinite"
                }} />
              )}
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{
            position: "fixed", top: "72px", left: 0, right: 0, zIndex: 999,
            background: "rgba(10,5,0,0.97)", borderBottom: "1px solid rgba(212,163,89,0.2)",
            padding: "16px clamp(16px,4vw,48px)",
            transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)"
          }}>
            <input
              autoFocus
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: "100%", maxWidth: "600px",
                background: "rgba(212,163,89,0.08)",
                border: "1px solid rgba(212,163,89,0.3)",
                borderRadius: "50px", padding: "12px 24px",
                color: "#fdf6ec", fontSize: "16px",
                fontFamily: "'Jost', sans-serif", outline: "none"
              }}
            />
          </div>
        )}

        {/* HERO */}
        <div style={{
          minHeight: "100vh", position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #0a0500 0%, #1a0800 30%, #2d1200 60%, #0a0500 100%)"
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: `radial-gradient(circle at 25% 25%, #d4a359 2px, transparent 2px), radial-gradient(circle at 75% 75%, #d4a359 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
            animation: "waxPattern 20s linear infinite"
          }} />
          <div style={{
            position: "absolute", top: "10%", right: "5%",
            width: "clamp(200px, 35vw, 500px)", height: "clamp(200px, 35vw, 500px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,163,89,0.12) 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", bottom: "5%", left: "-5%",
            width: "clamp(150px, 25vw, 400px)", height: "clamp(150px, 25vw, 400px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,163,89,0.08) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite reverse"
          }} />

          {[...Array(8)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${10 + i * 12}%`, top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 1.2}s`, animationDuration: `${6 + i * 0.8}s`,
              opacity: 0.5, width: i % 2 === 0 ? "3px" : "5px", height: i % 2 === 0 ? "3px" : "5px",
            }} />
          ))}

          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.2}px)`,
            width: "clamp(300px, 60vw, 700px)", height: "clamp(300px, 60vw, 700px)",
            border: "1px solid rgba(212,163,89,0.06)", borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.1}px)`,
            width: "clamp(200px, 45vw, 550px)", height: "clamp(200px, 45vw, 550px)",
            border: "1px solid rgba(212,163,89,0.04)", borderRadius: "50%",
            animation: "rotate 40s linear infinite"
          }}>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div key={deg} className="star" style={{
                position: "absolute", width: "5px", height: "5px",
                background: "#d4a359", borderRadius: "50%",
                top: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 45}% - 2.5px)`,
                left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 45}% - 2.5px)`,
                animationDelay: `${deg / 60}s`
              }} />
            ))}
          </div>

          <div style={{
            textAlign: "center", position: "relative", zIndex: 2,
            transform: `translateY(${parallaxOffset * -0.15}px)`,
            padding: "120px 24px 60px"
          }}>
            <div style={{
              fontSize: "clamp(10px, 1.5vw, 13px)", letterSpacing: "8px",
              color: "#d4a359", textTransform: "uppercase", marginBottom: "28px",
              fontWeight: 500, animation: "fadeIn 1s ease forwards",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px"
            }}>
              <Diamond /> Collection Exclusive <Diamond />
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px, 10vw, 110px)",
              fontWeight: 700, lineHeight: 0.95, marginBottom: "32px"
            }}>
              <div style={{ color: "#fdf6ec", display: "block", animation: "heroText1 1s cubic-bezier(0.23,1,0.32,1) 0.2s both" }}>
                L'Élégance
              </div>
              <div className="gradient-text" style={{ display: "block", fontStyle: "italic", animation: "heroText2 1s cubic-bezier(0.23,1,0.32,1) 0.5s both" }}>
                Africaine
              </div>
            </h1>

            <div style={{
              width: "80px", height: "2px",
              background: "linear-gradient(90deg, transparent, #d4a359, transparent)",
              margin: "0 auto 32px", animation: "lineGrow 1s ease 0.8s both"
            }} />

            <p style={{
              color: "rgba(253,246,236,0.6)", fontSize: "clamp(15px, 2vw, 18px)",
              maxWidth: "520px", margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 300,
              animation: "fadeUp 1s ease 0.7s both"
            }}>
              Pagnes wax, vêtements et sacs artisanaux soigneusement sélectionnés,<br />
              livrés partout dans le monde.
            </p>

            <div style={{
              display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
              animation: "fadeUp 1s ease 1s both"
            }}>
              <button
                onClick={() => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-gold"
                style={{
                  background: "linear-gradient(135deg, #d4a359, #b8882e)",
                  color: "#0a0500", border: "none",
                  padding: "18px 48px", borderRadius: "50px",
                  fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 700,
                  cursor: "pointer", letterSpacing: "2px", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif"
                }}>
                Découvrir la boutique
              </button>
              <a href="https://wa.me/2290155963455" target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "18px 32px", borderRadius: "50px",
                border: "1.5px solid rgba(212,163,89,0.4)",
                color: "rgba(212,163,89,0.8)", textDecoration: "none",
                fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 500,
                letterSpacing: "1px", fontFamily: "'Jost', sans-serif",
                transition: "all 0.3s ease"
              }} className="btn-gold">
                <IconPhone /> Nous contacter
              </a>
            </div>

            <div style={{
              marginTop: "80px", display: "flex", flexDirection: "column",
              alignItems: "center", gap: "8px", animation: "shimmer 2s ease-in-out infinite"
            }}>
              <div style={{ fontSize: "11px", letterSpacing: "4px", color: "rgba(212,163,89,0.4)", textTransform: "uppercase" }}>Défiler</div>
              <div style={{ color: "rgba(212,163,89,0.4)" }}><IconArrowDown /></div>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div style={{
          background: "linear-gradient(90deg, #d4a359, #c49040, #d4a359)",
          padding: "14px 0", overflow: "hidden", position: "relative"
        }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                {["Livraison Mondiale", "Qualité Artisanale", "Authenticité Garantie", "Fait au Togo", "Pagnes Wax", "Sacs Artisanaux", "Vêtements Ankara", "Mode Africaine"].map((t, j) => (
                  <span key={j} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    whiteSpace: "nowrap", padding: "0 24px"
                  }}>
                    <Diamond />
                    <span style={{
                      fontSize: "clamp(11px, 1.2vw, 13px)", letterSpacing: "3px",
                      color: "#1a0a00", fontWeight: 700, textTransform: "uppercase"
                    }}>{t}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div ref={statsSection.ref} style={{
          background: "linear-gradient(180deg, #0a0500 0%, #120800 100%)",
          padding: "80px clamp(16px,4vw,48px)"
        }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "48px", textAlign: "center"
          }}>
            {[
              { n: "500+", label: "Produits vendus", Icon: IconPackage },
              { n: "50+", label: "Clients satisfaits", Icon: IconStar },
              { n: "15+", label: "Pays livrés", Icon: IconGlobe },
              { n: "100%", label: "Authenticité", Icon: IconShield }
            ].map((s, i) => (
              <div key={i} className={`reveal ${statsSection.inView ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{
                  color: "#d4a359", marginBottom: "16px",
                  display: "flex", justifyContent: "center",
                  animation: `float ${4 + i}s ease-in-out infinite`
                }}>
                  <s.Icon />
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700,
                  color: "#d4a359", lineHeight: 1,
                  animation: statsSection.inView ? `numberCount 0.6s ease ${i * 0.15}s both` : "none"
                }}>{s.n}</div>
                <div style={{ color: "rgba(253,246,236,0.5)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "8px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div ref={featureSection.ref} style={{
          background: "#120800",
          borderTop: "1px solid rgba(212,163,89,0.08)",
          borderBottom: "1px solid rgba(212,163,89,0.08)",
          padding: "64px clamp(16px,4vw,48px)"
        }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "32px"
          }}>
            {[
              { Icon: IconTruck, title: "Livraison Internationale", desc: "Partout dans le monde, rapidement et en sécurité." },
              { Icon: IconScissors, title: "Artisanat Authentique", desc: "Chaque pièce est confectionnée à la main au Togo." },
              { Icon: IconMessage, title: "Commande WhatsApp", desc: "Simple et rapide, directement sur votre téléphone." },
              { Icon: IconShield, title: "Qualité Certifiée", desc: "Tissus et matériaux de premier choix sélectionnés." }
            ].map((f, i) => (
              <div key={i}
                className={`reveal glass ${featureSection.inView ? "visible" : ""}`}
                style={{ padding: "32px 24px", borderRadius: "20px", transitionDelay: `${i * 0.12}s`, textAlign: "center" }}>
                <div style={{
                  color: "#d4a359", marginBottom: "16px", display: "flex", justifyContent: "center",
                  animation: `float ${4 + i * 0.5}s ease-in-out infinite`
                }}>
                  <f.Icon />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: "#d4a359", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ color: "rgba(253,246,236,0.5)", fontSize: "14px", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CATALOGUE */}
        <div id="catalogue" ref={catalogueSection.ref} style={{
          background: "linear-gradient(180deg, #120800 0%, #0a0500 100%)",
          padding: "80px clamp(16px,4vw,48px)"
        }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className={`reveal ${catalogueSection.inView ? "visible" : ""}`}>
                <div style={{ fontSize: "11px", letterSpacing: "7px", color: "rgba(212,163,89,0.7)", textTransform: "uppercase", marginBottom: "16px" }}>
                  Notre sélection
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#fdf6ec", marginBottom: "16px" }}>
                  La <span className="gradient-text">Boutique</span>
                </h2>
                <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #d4a359, transparent)", margin: "0 auto" }} />
              </div>
            </div>

            {/* Filtres */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "56px" }}>
              {categories.map((cat, i) => (
                <button key={cat} onClick={() => setCategorieActive(cat)}
                  className={`cat-btn ${categorieActive === cat ? "active" : ""}`}
                  style={{
                    padding: "12px 28px", borderRadius: "50px",
                    border: categorieActive === cat ? "none" : "1.5px solid rgba(212,163,89,0.3)",
                    background: categorieActive === cat ? "linear-gradient(135deg, #d4a359, #b8882e)" : "rgba(212,163,89,0.05)",
                    color: categorieActive === cat ? "#0a0500" : "rgba(212,163,89,0.7)",
                    fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 700,
                    cursor: "pointer", letterSpacing: "2px", textTransform: "uppercase",
                    animation: catalogueSection.inView ? `fadeUp 0.5s ease ${i * 0.08}s both` : "none"
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid produits */}
            {chargement ? (
              <div style={{ textAlign: "center", padding: "100px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                <div className="loader" />
                <p style={{ color: "rgba(212,163,89,0.5)", letterSpacing: "3px", fontSize: "12px", textTransform: "uppercase" }}>Chargement</p>
              </div>
            ) : produitsFiltres.length === 0 ? (
              <div style={{ textAlign: "center", padding: "100px 20px", color: "rgba(253,246,236,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <IconSearch />
                </div>
                <p style={{ fontSize: "16px" }}>Aucun produit trouvé</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(260px, 28vw, 340px), 1fr))",
                gap: "clamp(16px, 2.5vw, 36px)"
              }}>
                {produitsFiltres.map((produit, i) => (
                  <div key={produit.id} className="product-card" style={{
                    background: "linear-gradient(145deg, #1a0a00, #120800)",
                    borderRadius: "24px", overflow: "hidden",
                    border: "1px solid rgba(212,163,89,0.1)",
                    animation: catalogueSection.inView ? `cardReveal 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 0.08}s both` : "none",
                    position: "relative"
                  }}>
                    <div style={{ position: "relative", overflow: "hidden", height: "clamp(220px, 25vw, 300px)" }}>
                      <img
                        src={produit.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"}
                        alt={produit.nom} className="card-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,5,0,0.7) 0%, transparent 50%)" }} />
                      <div style={{
                        position: "absolute", top: "16px", left: "16px",
                        background: "rgba(212,163,89,0.15)", backdropFilter: "blur(10px)",
                        border: "1px solid rgba(212,163,89,0.3)",
                        color: "#d4a359", padding: "4px 14px", borderRadius: "20px",
                        fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase"
                      }}>
                        {produit.categorie}
                      </div>
                      {addedId === produit.id && (
                        <div style={{
                          position: "absolute", inset: 0, background: "rgba(212,163,89,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          animation: "successPop 0.4s ease both"
                        }}>
                          <div style={{
                            background: "#d4a359", color: "#0a0500", borderRadius: "50%",
                            width: "64px", height: "64px",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <IconCheck />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "24px" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 22px)",
                        fontWeight: 700, color: "#fdf6ec", marginBottom: "8px", lineHeight: 1.2
                      }}>{produit.nom}</h3>
                      <p style={{ color: "rgba(253,246,236,0.45)", fontSize: "13px", lineHeight: 1.6, marginBottom: "20px" }}>
                        {produit.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                        <div>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: "#d4a359" }}>
                            {produit.prix.toLocaleString()}
                          </span>
                          <span style={{ fontSize: "12px", color: "rgba(212,163,89,0.5)", marginLeft: "5px" }}>{produit.devise}</span>
                        </div>
                        <button onClick={() => ajouterAuPanier(produit)} className="btn-gold" style={{
                          background: "linear-gradient(135deg, #d4a359, #b8882e)",
                          color: "#0a0500", border: "none",
                          padding: "12px 22px", borderRadius: "50px",
                          cursor: "pointer", fontFamily: "'Jost', sans-serif",
                          fontSize: "13px", fontWeight: 700, letterSpacing: "1px", whiteSpace: "nowrap"
                        }}>
                          + Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #1a0800 0%, #2d1400 50%, #1a0800 100%)",
          padding: "80px clamp(16px,4vw,48px)", textAlign: "center",
          position: "relative", overflow: "hidden",
          borderTop: "1px solid rgba(212,163,89,0.1)"
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg, #d4a359 0px, #d4a359 1px, transparent 0px, transparent 40px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ color: "#d4a359", marginBottom: "20px", display: "flex", justifyContent: "center", animation: "float 4s ease-in-out infinite" }}>
              <IconPhone />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#fdf6ec", marginBottom: "16px" }}>
              Commandez sur <span className="gradient-text">WhatsApp</span>
            </h2>
            <p style={{ color: "rgba(253,246,236,0.5)", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
              Ajoutez vos produits au panier et passez commande directement via WhatsApp. Simple, rapide, sécurisé.
            </p>
            <a href="https://wa.me/2290155963455" target="_blank" rel="noreferrer" className="btn-gold" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#25d366", color: "white",
              padding: "18px 48px", borderRadius: "50px",
              textDecoration: "none", fontFamily: "'Jost', sans-serif",
              fontSize: "15px", fontWeight: 700, letterSpacing: "1px"
            }}>
              <IconPhone /> Ouvrir WhatsApp
            </a>
          </div>
        </div>

        {/* PANIER */}
        {panierOuvert && (
          <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", justifyContent: "flex-end" }}>
            <div className="panier-overlay" style={{ flex: 1, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={() => setPanierOuvert(false)} />
            <div className="panier-panel" style={{
              background: "#0f0600", width: "100%", maxWidth: "460px",
              height: "100%", display: "flex", flexDirection: "column",
              borderLeft: "1px solid rgba(212,163,89,0.15)"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #1a0800, #2d1400)",
                padding: "28px 32px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: "1px solid rgba(212,163,89,0.1)"
              }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "#d4a359", fontWeight: 700 }}>Mon Panier</div>
                  <div style={{ fontSize: "12px", color: "rgba(212,163,89,0.4)", letterSpacing: "2px" }}>
                    {totalItems} article{totalItems !== 1 ? "s" : ""}
                  </div>
                </div>
                <button onClick={() => setPanierOuvert(false)} style={{
                  background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.2)",
                  color: "#d4a359", cursor: "pointer",
                  width: "40px", height: "40px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease"
                }}>
                  <IconClose />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                {panier.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "80px 20px", color: "rgba(253,246,236,0.3)", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    <IconEmptyCart />
                    <p style={{ fontSize: "16px" }}>Votre panier est vide</p>
                    <p style={{ fontSize: "13px", opacity: 0.6 }}>Ajoutez des produits depuis la boutique</p>
                  </div>
                ) : (
                  panier.map((p, i) => (
                    <div key={p.id} style={{
                      display: "flex", gap: "16px", alignItems: "center",
                      background: "rgba(212,163,89,0.05)", border: "1px solid rgba(212,163,89,0.1)",
                      borderRadius: "16px", padding: "16px", marginBottom: "12px",
                      animation: `fadeUp 0.4s ease ${i * 0.05}s both`
                    }}>
                      <img src={p.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100"} alt={p.nom} style={{
                        width: "64px", height: "64px", borderRadius: "12px", objectFit: "cover",
                        border: "1px solid rgba(212,163,89,0.2)"
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", color: "#fdf6ec", marginBottom: "4px" }}>{p.nom}</p>
                        <p style={{ color: "#d4a359", fontWeight: 700, fontSize: "15px" }}>
                          {(p.prix * p.quantite).toLocaleString()} {p.devise}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                          <button onClick={() => modifierQuantite(p.id, -1)} style={{
                            width: "24px", height: "24px", borderRadius: "50%",
                            background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.3)",
                            color: "#d4a359", cursor: "pointer", fontSize: "14px",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>−</button>
                          <span style={{ color: "#fdf6ec", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>{p.quantite}</span>
                          <button onClick={() => modifierQuantite(p.id, 1)} style={{
                            width: "24px", height: "24px", borderRadius: "50%",
                            background: "rgba(212,163,89,0.1)", border: "1px solid rgba(212,163,89,0.3)",
                            color: "#d4a359", cursor: "pointer", fontSize: "14px",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>+</button>
                        </div>
                      </div>
                      <button onClick={() => retirerDuPanier(p.id)} style={{
                        background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.2)",
                        color: "#e74c3c", cursor: "pointer", width: "36px", height: "36px",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s"
                      }}>
                        <IconTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {panier.length > 0 && (
                <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(212,163,89,0.1)", background: "rgba(212,163,89,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <span style={{ color: "rgba(253,246,236,0.5)", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Total</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 700, color: "#d4a359" }}>
                      {totalPanier.toLocaleString()} <span style={{ fontSize: "16px" }}>FCFA</span>
                    </span>
                  </div>
                  <button onClick={commanderViaWhatsApp} className="btn-gold" style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #25d366, #128C7E)",
                    color: "white", border: "none",
                    padding: "18px", borderRadius: "50px",
                    fontSize: "16px", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Jost', sans-serif", letterSpacing: "1px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                  }}>
                    <IconPhone /> Commander via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer style={{
          background: "#060300", borderTop: "1px solid rgba(212,163,89,0.1)",
          padding: "64px clamp(16px,4vw,48px) 32px"
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px",
              background: "linear-gradient(135deg, #d4a359, #8b5e20)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", animation: "float 4s ease-in-out infinite"
            }}>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="#0a0500">
                <polygon points="7,0 8.5,5 14,5 9.5,8 11,14 7,10.5 3,14 4.5,8 0,5 5.5,5"/>
              </svg>
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4vw, 36px)",
              color: "#fdf6ec", marginBottom: "8px", letterSpacing: "4px", fontWeight: 700,
              animation: "glow 3s ease-in-out infinite"
            }}>OBI STYLE</div>
            <p style={{ color: "rgba(212,163,89,0.4)", fontSize: "12px", letterSpacing: "4px", marginBottom: "40px", textTransform: "uppercase" }}>
              Mode Africaine · Togo
            </p>
            <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
              {["Pagnes", "Vêtements", "Sacs", "Accessoires"].map(cat => (
                <button key={cat} onClick={() => { setCategorieActive(cat); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    background: "none", border: "none", color: "rgba(212,163,89,0.4)",
                    cursor: "pointer", fontSize: "13px", letterSpacing: "2px",
                    textTransform: "uppercase", fontFamily: "'Jost', sans-serif",
                    transition: "color 0.2s"
                  }} className="nav-link">
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(212,163,89,0.08)", paddingTop: "24px", display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>© 2025 Obi Style — Fait au Togo</p>
              <a href="/admin" style={{ color: "rgba(212,163,89,0.2)", fontSize: "11px", textDecoration: "none", letterSpacing: "3px", textTransform: "uppercase" }}>Admin</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
