import { useState, useEffect } from "react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const YELLOW = "#F7FF16";
const DARK = "#111111";
const DARKER = "#0a0a0a";
const PINK = "#FF36D2";

const MONCLogo = ({ height = 28 }) => (
  <img src={asset("/assets/monclogo.svg")} alt="MONC" style={{ height, display: "block" }} />
);

const MONCMark = ({ height = 28, color = "white" }) => (
  <svg viewBox="0 0 1920 434" height={height} fill={color}>
    <rect x="658.95" y="0" width="434.07" height="434.07" rx="217.03" ry="217.03"/>
    <path d="M1764.68,219.56l150.16,150.16c1.42,1.42,1.38,3.71-.06,5.1-37.96,36.67-89.64,59.24-146.6,59.24h-8.49c-118.5,0-214.57-96.06-214.57-214.57v-4.94C1545.13,96.06,1641.2,0,1759.7,0h8.49c56.97,0,108.65,22.57,146.6,59.25,1.44,1.39,1.47,3.69.06,5.1l-150.17,150.17c-1.39,1.39-1.39,3.65,0,5.04Z"/>
    <path d="M1523.69,14.75v403.7c0,1.97-1.6,3.57-3.57,3.57h-402.11c-1.97,0-3.57-1.6-3.57-3.57V18.48c0-2.97,3.42-4.64,5.76-2.81l191.6,149.41c2.34,1.83,5.76.16,5.76-2.81V14.75c0-1.97,1.6-3.57,3.57-3.57h198.99c1.97,0,3.57,1.6,3.57,3.57Z"/>
    <path d="M637.51,18.48v399.96c0,1.97-1.6,3.57-3.57,3.57H240.14c-1.97,0-3.57-1.6-3.57-3.57V18.48c0-2.97,3.42-4.64,5.76-2.81l192.52,150.12c1.29,1.01,3.1,1.01,4.39,0L631.75,15.67c2.34-1.83,5.76-.16,5.76,2.81Z"/>
  </svg>
);

const PacManIcon = ({ size = 20 }) => (
  <img src={asset("/assets/pacman.svg")} alt="" width={size} height={size} style={{ display: "block" }} />
);

const Ghost = ({ size = 28, color = PINK }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path d="M6 28V14C6 8.48 10.48 4 16 4C21.52 4 26 8.48 26 14V28L23 25L20 28L17 25L14 28L11 25L8 28L6 28Z" fill={color}/>
    <rect x="11" y="12" width="3" height="5" rx="1" fill="white"/>
    <rect x="18" y="12" width="3" height="5" rx="1" fill="white"/>
  </svg>
);

/* ─── DATA ─── */

const signatureCocktails = [
  {
    id: 1, name: "ALCHIMISTA CURIOSO", price: 10, image: asset("/assets/cocktails/alchimista-curioso.jpg"),
    spirit: "Brandy", spiritDate: "1100-1200dc", spiritOrigin: "Arabia Saudita", century: "XII",
    ingredients: ["Brandy", "Melograno/Curcuma", "Zafferano", "Maraschino"],
    profile: { acido: 2, dolce: 2, amaro: 2, secco: 2, intenso: 2 },
    story: "Tanto tempo fa, nei deserti del Medio Oriente, un alchimista curioso osservava il vino bollire sotto il sole. Per gioco, sigillò una pentola e raccolse le gocce che cadevano fredde in una ciotola. Le assaggiò: fuoco liquido, limpido come acqua, ma con l'anima del vino. Lo chiamò \"aqua vitae\", l'acqua della vita. I monaci europei ne fecero un elisir, i medici lo prescrissero come cura, e i poeti lo cantarono come ispirazione.",
  },
  {
    id: 2, name: "BANDITO PASSIONALE", price: 12, image: asset("/assets/cocktails/bandito-passionale.jpg"),
    spirit: "Grappa", spiritDate: "1200dc", spiritOrigin: "Italia", century: "XIII",
    ingredients: ["Grappa barricata", "Castagne", "Vaniglia", "Passion Fruit", "Lime", "Pepe", "Spuma Pere"],
    profile: { acido: 3, dolce: 2, amaro: 1, secco: 1, intenso: 2 },
    story: "In un piccolo villaggio sardo, i contadini distillavano in segreto una grappa forte e profumata. Per sfuggire ai controlli del Regno, la nascondevano sottoterra, segnando il punto con un filo di ferro che spuntava appena dal suolo. Così, solo loro sapevano dove trovarla. Quando la legge si allentò, la grappa riemerse alla luce, e il nome rimase: filu 'e ferru, il \"filo di ferro\".",
  },
  {
    id: 3, name: "SHOCK UMAMI", price: 12, image: asset("/assets/cocktails/shock-umami.jpg"),
    spirit: "Bitter", spiritDate: "1200dc", spiritOrigin: "Italia", century: "XIII",
    ingredients: ["Bitter", "Liquore al Peperone", "Fichi e Wasabi", "Agave", "Tonica"],
    profile: { acido: 2, dolce: 2, amaro: 2, secco: 2, intenso: 2 },
    story: "Il bitter nasce nell'Italia dell'Ottocento come rimedio digestivo a base di erbe amare. Farmacisti e liquoristi sperimentano ricette sempre nuove, finché qualcuno ha un'intuizione semplice ma geniale: rendere l'amaro anche buono. Da quel momento il bitter esce dalla farmacia ed entra nei bar, diventando protagonista dell'aperitivo italiano.",
  },
  {
    id: 4, name: "DRUNK SANTA CLAUS", price: 8, image: asset("/assets/cocktails/drunk-santa-claus.jpg"),
    spirit: "Vodka", spiritDate: "1400dc", spiritOrigin: "Polonia", century: "XV",
    ingredients: ["Vodka al panettone", "Sciroppo ai canditi", "Arancia", "Limone"],
    profile: { acido: 2, dolce: 2, amaro: 1, secco: 1, intenso: 2 },
    story: "Nata tra le nebbie della Russia o della Polonia (ancora oggi nessuno vuole cedere il merito), la vodka è diventata celebre per una qualità precisa: non avere sapore. È l'amica discreta dei cocktail, il distillato che non giudica. Nei secoli ha curato raffreddori, acceso rivoluzioni e cancellato ricordi.",
  },
  {
    id: 5, name: "POP FASHIONED", price: 11, image: asset("/assets/cocktails/pop-fashioned.jpg"),
    spirit: "Whisky", spiritDate: "1500dc", spiritOrigin: "Scozia/Irlanda", century: "XVI",
    ingredients: ["Whisky", "Sciroppo Pop Corn", "Angostura", "Coca Cola"],
    profile: { acido: 5, dolce: 4, amaro: 2, secco: 1, intenso: 3 },
    story: "In una valle velata di nebbia, un monaco distillò per caso l'anima dell'orzo: uisge beatha, \"acqua di vita\". Nascosta in botti di rovere, la miscela maturò, trasformandosi in oro liquido. Non era solo un drink: era memoria, fuoco, tempo. Dai pascoli delle Highlands ai salotti dei re, il whisky ha attraversato secoli.",
  },
  {
    id: 6, name: "C'È DI MEZZO IL MARE", price: 13, image: asset("/assets/cocktails/ce-di-mezzo-il-mare.jpg"),
    spirit: "Gin", spiritDate: "1600dc", spiritOrigin: "Olanda", century: "XVII",
    ingredients: ["Gin Grifu", "Basilico", "Vermouth Dry", "Pomodoro", "Salamoia"],
    profile: { acido: 1, dolce: 1, amaro: 2, secco: 4, intenso: 5 },
    story: "Il gin è nato come medicina: un distillato chiaro, profumato di ginepro, pensato per curare. Poi arrivò a Londra, e tutto cambiò. Nel 1700, il gin divenne così economico e diffuso da invadere le strade. Fu un'epoca di eccessi e disperazione, passata alla storia come la Gin Craze. Oggi il gin è tornato raffinato, elegante, creativo.",
  },
  {
    id: 7, name: "RESPIRO", price: 8, image: asset("/assets/cocktails/respiro.jpg"),
    spirit: "Gin", spiritDate: "1600dc", spiritOrigin: "Olanda", century: "XVII",
    ingredients: ["Gin", "Zucchero", "Lime", "Menta", "Kiwi"],
    profile: { acido: 4, dolce: 3, amaro: 1, secco: 1, intenso: 2 },
    story: "Il gin nasce come medicina, un distillato al ginepro pensato per curare. Poi arrivò a Londra e, nel '700, diventò così economico da invadere le strade. Fu la Gin Craze, un'epoca di eccessi e disperazione. Oggi il gin è tornato elegante e creativo, ma ogni sorso porta ancora quell'eco. Questo drink è un omaggio: equilibrio tra luce e ombra.",
  },
  {
    id: 8, name: "WILLY WONKA", price: 8, image: asset("/assets/cocktails/willy-wonka.jpg"),
    spirit: "Rum", spiritDate: "1700dc", spiritOrigin: "Caraibi", century: "XVIII",
    ingredients: ["Rum al cioccolato", "Panna", "Cocco", "Zucchero"],
    profile: { acido: 1, dolce: 4, amaro: 1, secco: 1, intenso: 3 },
    story: "Così nacque il primo distillato: non solo una bevanda, ma una magia alchemica che trasformava l'umile uva in spirito, e lo spirito... in leggenda. I monaci europei ne fecero un elisir, i medici lo prescrissero come cura, e i poeti lo cantarono come ispirazione.",
  },
  {
    id: 9, name: "TEQUILERO", price: 12, image: asset("/assets/cocktails/tequilero.jpg"),
    spirit: "Tequila", spiritDate: "1800dc", spiritOrigin: "Messico", century: "XIX",
    ingredients: ["Tequila", "Mezcal", "Liquore al peperoncino", "Zucchero", "Lime", "Soda al lampone e peperoncino"],
    profile: { acido: 2, dolce: 2, amaro: 2, secco: 1, intenso: 3 },
    story: "Molto prima di diventare il simbolo del Messico, la tequila nasce da un dono sacro: l'agave blu. La leggenda dice che Quetzalcoatl, vedendo gli uomini sotto il sole, rivelò il segreto per trasformarla in un elisir di forza, coraggio e saggezza. Per gli Aztechi ogni sorso avvicinava agli dèi.",
  },
];

const classicCocktails = [
  {
    id: 101, name: "NEGRONI", price: 9,
    ingredients: ["Gin", "Campari", "Vermouth Rosso"],
    profile: { acido: 1, dolce: 2, amaro: 4, secco: 2, intenso: 4 },
  },
  {
    id: 102, name: "MOSCOW MULE", price: 8,
    ingredients: ["Vodka", "Ginger Beer", "Lime", "Angostura"],
    profile: { acido: 3, dolce: 2, amaro: 1, secco: 2, intenso: 2 },
  },
  {
    id: 103, name: "MARGARITA", price: 9,
    ingredients: ["Tequila", "Triple Sec", "Lime", "Sale"],
    profile: { acido: 4, dolce: 2, amaro: 1, secco: 2, intenso: 3 },
  },
  {
    id: 104, name: "APEROL SPRITZ", price: 7,
    ingredients: ["Aperol", "Prosecco", "Soda", "Arancia"],
    profile: { acido: 2, dolce: 3, amaro: 2, secco: 1, intenso: 1 },
  },
];

const softDrinks = [
  { id: 201, name: "COCA COLA", price: 3, ingredients: ["330ml"] },
  { id: 202, name: "ACQUA TONICA", price: 3, ingredients: ["Fever-Tree", "200ml"] },
  { id: 203, name: "GINGER BEER", price: 4, ingredients: ["Fever-Tree", "200ml"] },
  { id: 204, name: "SUCCO DI FRUTTA", price: 3, ingredients: ["Pesca", "Albicocca", "ACE"] },
  { id: 205, name: "LIMONATA FATTA IN CASA", price: 5, ingredients: ["Limone", "Zucchero", "Menta"] },
];

const food = [
  { id: 301, name: "TACOS", price: 6, image: asset("/assets/food/tacos.jpeg"), description: "A scelta tra pollo, pulled pork e veggy.", ingredients: ["Tortilla", "Pollo / Pulled Pork / Veggy", "Guacamole", "Salsa Chili", "Coriandolo"] },
  { id: 302, name: "BAO", price: 7, image: asset("/assets/food/bao.jpeg"), description: "Soffice panino al vapore con carne sfilacciata.", ingredients: ["Bao al vapore", "Pulled Pork", "Hoisin", "Cetriolo", "Cipollotto"] },
  { id: 303, name: "NACHOS", price: 6, image: "", description: "Tortilla chips croccanti con le nostre salse.", ingredients: ["Tortilla Chips", "Salsa Cheddar", "Guacamole", "Jalapeño", "Panna Acida"] },
];

const beer = [
  { id: 401, name: "ICHNUSA NON FILTRATA", price: 5, ingredients: ["33cl", "Lager", "Sardegna"] },
  { id: 402, name: "HEINEKEN", price: 4, ingredients: ["33cl", "Lager", "Olanda"] },
  { id: 403, name: "CORONA", price: 5, ingredients: ["33cl", "Lager", "Messico"] },
  { id: 404, name: "IPA ARTIGIANALE", price: 6, ingredients: ["40cl", "IPA", "Italia"] },
];

const wine = [
  { id: 501, name: "VERMENTINO DI SARDEGNA", price: 6, ingredients: ["Bianco", "Sardegna", "Calice"] },
  { id: 502, name: "CANNONAU", price: 6, ingredients: ["Rosso", "Sardegna", "Calice"] },
  { id: 503, name: "PROSECCO", price: 5, ingredients: ["Bollicine", "Veneto", "Calice"] },
  { id: 504, name: "ROSÉ", price: 6, ingredients: ["Rosato", "Puglia", "Calice"] },
];

const spirits = [
  { id: 601, name: "WHISKY (JACK DANIEL'S)", price: 6, ingredients: ["4cl", "Tennessee", "USA"] },
  { id: 602, name: "RUM (HAVANA CLUB 7)", price: 6, ingredients: ["4cl", "Añejo", "Cuba"] },
  { id: 603, name: "GIN (HENDRICK'S)", price: 7, ingredients: ["4cl", "Premium", "Scozia"] },
  { id: 604, name: "TEQUILA (JOSE CUERVO)", price: 6, ingredients: ["4cl", "Reposado", "Messico"] },
  { id: 605, name: "GRAPPA SARDA", price: 5, ingredients: ["4cl", "Tradizionale", "Sardegna"] },
];

/* ─── COMPONENTS ─── */

const FlavorBar = ({ label, value, max = 5 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
      color: "#777", width: 65, textAlign: "right", textTransform: "uppercase",
    }}>{label}</span>
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => {
        const active = i < value;
        const isPacman = i === value - 1;
        return isPacman ? (
          <PacManIcon key={i} size={14} />
        ) : (
          <div key={i} style={{
            width: active ? 8 : 6, height: active ? 8 : 6, borderRadius: "50%",
            background: active ? YELLOW : "#333",
            boxShadow: active ? `0 0 6px ${YELLOW}40` : "none",
          }} />
        );
      })}
    </div>
  </div>
);

const SectionHeader = ({ title, svgSrc }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingLeft: 4 }}>
    <PacManIcon size={12} />
    {svgSrc ? (
      <img src={svgSrc} alt={title} style={{ height: 22 }} />
    ) : (
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 3,
        color: "#555", textTransform: "uppercase",
      }}>{title}</span>
    )}
    <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
      {[...Array(4)].map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: YELLOW, opacity: .5 }} />)}
    </div>
  </div>
);

const ArrowIcon = () => (
  <svg width="7" height="14" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.261935 15.3015C0.187112 15.2374 0.12566 15.1591 0.0810916 15.0712C0.0365229 14.9833 0.00971079 14.8875 0.00218837 14.7893C-0.00533405 14.691 0.00658085 14.5922 0.0372511 14.4986C0.0679214 14.4049 0.116746 14.3183 0.180935 14.2435L5.76193 7.73149L0.180934 1.21949C0.0590629 1.06766 0.00100634 0.874393 0.0190373 0.680541C0.0370682 0.486689 0.129773 0.307446 0.277555 0.180701C0.425337 0.0539567 0.616614 -0.0103559 0.81095 0.0013608C1.00529 0.0130774 1.18745 0.0999037 1.31893 0.243485L7.31893 7.24349C7.4354 7.37941 7.49941 7.55249 7.49941 7.73149C7.49941 7.91048 7.4354 8.08357 7.31893 8.21949L1.31894 15.2195C1.18945 15.3703 1.00539 15.4635 0.807198 15.4787C0.609004 15.4939 0.412887 15.4298 0.261935 15.3005" fill={YELLOW}/>
  </svg>
);

const SimpleItem = ({ item }) => (
  <div style={{
    background: "#141414", border: "1px solid #1e1e1e", padding: "14px 18px",
  }}>
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4,
    }}>
      <h3 style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(16px,4vw,22px)",
        color: "white", margin: 0, letterSpacing: 1, lineHeight: 1.1,
      }}>{item.name}</h3>
      <span style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: YELLOW,
        background: `${YELLOW}12`, padding: "2px 10px", whiteSpace: "nowrap",
        flexShrink: 0, marginLeft: 8,
      }}>{item.price}€</span>
    </div>
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {item.ingredients.map((ing, j) => (
        <span key={j} style={{
          fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#666",
          background: "#1e1e1e", padding: "2px 7px", borderRadius: 2,
        }}>{ing}</span>
      ))}
    </div>
  </div>
);

const CocktailCard = ({ cocktail, onClick }) => (
  <div onClick={onClick} style={{
    background: "#141414", border: "1px solid #1e1e1e", padding: "16px 18px",
    cursor: "pointer", transition: "border-color .3s", position: "relative", overflow: "hidden",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; }}
  >
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {cocktail.century && (
          <span style={{
            fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#444",
            letterSpacing: 2, display: "block", marginBottom: 2,
          }}>{cocktail.century} · {cocktail.spirit.toUpperCase()} · {cocktail.spiritOrigin.toUpperCase()}</span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowIcon />
          <h3 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(20px,5vw,28px)",
            color: "white", margin: 0, letterSpacing: 1, lineHeight: 1.05,
          }}>{cocktail.name}</h3>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
        <span style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: YELLOW,
          background: `${YELLOW}12`, padding: "2px 10px", whiteSpace: "nowrap",
        }}>{cocktail.price}€</span>
      </div>
    </div>
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {cocktail.ingredients.slice(0, 3).map((ing, j) => (
        <span key={j} style={{
          fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#777",
          background: "#1e1e1e", padding: "2px 7px", borderRadius: 2,
        }}>{ing}</span>
      ))}
      {cocktail.ingredients.length > 3 && (
        <span style={{
          fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#444", padding: "2px 4px",
        }}>+{cocktail.ingredients.length - 3}</span>
      )}
    </div>
  </div>
);

const FoodCard = ({ item, onClick }) => (
  <div onClick={onClick} style={{
    background: "#141414", border: "1px solid #1e1e1e", padding: "16px 18px",
    cursor: "pointer", transition: "border-color .3s", position: "relative", overflow: "hidden",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; }}
  >
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowIcon />
        <h3 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(18px,4.5vw,24px)",
          color: "white", margin: 0, letterSpacing: 1, lineHeight: 1.1,
        }}>{item.name}</h3>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
        <span style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: YELLOW,
          background: `${YELLOW}12`, padding: "2px 10px", whiteSpace: "nowrap",
        }}>{item.price}€</span>
      </div>
    </div>
    <p style={{
      fontFamily: "'Absans',sans-serif", fontSize: 11, color: "#666",
      lineHeight: 1.5, margin: 0,
    }}>{item.description}</p>
  </div>
);

/* ─── INTRO SCREEN ─── */
const IntroScreen = ({ onEnter }) => {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100dvh", background: DARKER, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{
        position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 500, background: "radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all .8s ease", textAlign: "center", maxWidth: 600, position: "relative", zIndex: 1,
      }}>
        <div style={{ marginBottom: 30, display: "flex", justifyContent: "center" }}><MONCLogo height={60} /></div>
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px, 10vw, 64px)",
          color: "white", letterSpacing: 2, lineHeight: 1, margin: "0 0 12px",
        }}>MENU</h1>
        <p style={{
          fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#aaa",
          lineHeight: 1.7, maxWidth: 480, margin: "0 auto 16px",
        }}>
          Benvenuti da MONC, <span style={{ color: "white", fontWeight: 600 }}>la vostra cocktaileria di quartiere.</span><br />Signature cocktails, classici rivisitati, birre, vini e tanto altro — tutto pensato per farvi sentire a casa.
        </p>
        <p style={{
          fontFamily: "'Absans',sans-serif", fontSize: 13, color: "#666",
          lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px",
        }}>
          Sedetevi, sfogliate il menu e lasciatevi guidare dal gusto.
        </p>

        <button onClick={onEnter} style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3,
          background: YELLOW, color: DARK, border: "none", padding: "14px 44px",
          cursor: "pointer", transition: "all .3s",
        }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
        >ENTRA NEL MENU</button>
      </div>

      <div style={{
        position: "absolute", bottom: 16, left: 20, right: 20,
        display: "flex", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#333", letterSpacing: 2 }}>MONC.IT</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#333", letterSpacing: 2 }}>@MONC.COCKTAILBAR</span>
      </div>
    </div>
  );
};

/* ─── COCKTAIL DETAIL (FULL-PAGE ON MOBILE) ─── */
const CocktailDetail = ({ cocktail, onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setShow(true), 50);
  }, []);

  return (
    <div style={{
      opacity: show ? 1 : 0, transition: "opacity .4s ease", padding: "0 0 40px",
    }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: YELLOW,
        fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 2,
        cursor: "pointer", padding: "16px 0", display: "flex", alignItems: "center", gap: 6,
      }}>
        ← MENU
      </button>

      <div style={{ marginBottom: 24 }}>
        {cocktail.image && (
          <div style={{ width: "100%", aspectRatio: "343 / 459", overflow: "hidden", marginBottom: 16 }}>
            <img
              src={cocktail.image}
              alt={cocktail.name}
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Name + Price */}
          {cocktail.century && (
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 3, color: "#555",
            }}>{cocktail.century} SEC. · {cocktail.spiritOrigin.toUpperCase()}</span>
          )}
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px,9vw,56px)",
            color: "white", margin: "4px 0 8px", lineHeight: .95, letterSpacing: 1,
          }}>{cocktail.name}</h2>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: DARK,
            background: YELLOW, padding: "2px 14px", display: "inline-block", alignSelf: "flex-start",
            marginBottom: 16,
          }}>{cocktail.price}€</span>

          {/* Ingredients with stamp/ticket perforations */}
          <div style={{ position: "relative", margin: "6px" }}>
            {/* Outward-protruding semicircles, offset by half spacing */}
            <div style={{
              position: "absolute",
              top: -5, left: -5, right: -5, bottom: -5,
              pointerEvents: "none",
              backgroundImage: `
                radial-gradient(circle 6px at 6px 100%, white 99%, transparent 100%),
                radial-gradient(circle 6px at 6px 0%, white 99%, transparent 100%),
                radial-gradient(circle 6px at 100% 6px, white 99%, transparent 100%),
                radial-gradient(circle 6px at 0% 6px, white 99%, transparent 100%)
              `,
              backgroundPosition: "18px 0, 6px 100%, 0 6px, 100% 18px",
              backgroundSize: "24px 6px, 24px 6px, 6px 24px, 6px 24px",
              backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
            }} />
            {/* Main white box with scallop cutouts */}
            <div style={{
              position: "relative",
              background: "white",
              padding: "20px 22px",
              WebkitMaskImage: `
                radial-gradient(circle 6px at 6px 0, transparent 99%, white),
                radial-gradient(circle 6px at 6px 100%, transparent 99%, white),
                radial-gradient(circle 6px at 0 6px, transparent 99%, white),
                radial-gradient(circle 6px at 100% 6px, transparent 99%, white)
              `,
              maskImage: `
                radial-gradient(circle 6px at 6px 0, transparent 99%, white),
                radial-gradient(circle 6px at 6px 100%, transparent 99%, white),
                radial-gradient(circle 6px at 0 6px, transparent 99%, white),
                radial-gradient(circle 6px at 100% 6px, transparent 99%, white)
              `,
              WebkitMaskPosition: "-6px 0, -6px 100%, 0 -6px, 100% -6px",
              maskPosition: "-6px 0, -6px 100%, 0 -6px, 100% -6px",
              WebkitMaskSize: "24px 100%, 24px 100%, 100% 24px, 100% 24px",
              maskSize: "24px 100%, 24px 100%, 100% 24px, 100% 24px",
              WebkitMaskRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
              maskRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
              {cocktail.ingredients.map((ing, i) => (
                <span key={i} style={{
                  fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#222",
                }}>{ing}</span>
              ))}
            </div>
            </div>
          </div>

          {/* Flavor profile */}
          {cocktail.profile && (
            <div style={{ marginTop: 16 }}>
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 3,
                color: "#555", textTransform: "uppercase", display: "block", marginBottom: 12,
              }}>Note del Cocktail</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <FlavorBar label="Acido" value={cocktail.profile.acido} />
                <FlavorBar label="Dolce" value={cocktail.profile.dolce} />
                <FlavorBar label="Amaro" value={cocktail.profile.amaro} />
                <FlavorBar label="Secco" value={cocktail.profile.secco} />
                <FlavorBar label="Intenso" value={cocktail.profile.intenso} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline + Story (only for cocktails with story data) */}
      {cocktail.story && (
        <div style={{
          borderLeft: "2px solid #333", paddingLeft: 18, marginLeft: 8, position: "relative",
        }}>
          <div style={{
            position: "absolute", left: -6, top: 0, width: 10, height: 10,
            borderRadius: "50%", background: YELLOW, boxShadow: `0 0 12px ${YELLOW}50`,
          }} />
          <div style={{ marginBottom: 10, display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: "#333" }}>{cocktail.century}</span>
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 10, color: YELLOW, letterSpacing: 1,
            }}>{cocktail.spirit} · {cocktail.spiritDate} · {cocktail.spiritOrigin}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3, color: "#444",
              textTransform: "uppercase", writingMode: "vertical-lr", transform: "rotate(180deg)",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>Un po' di storia</span>
            <p style={{
              fontFamily: "'Absans',sans-serif", fontSize: 13, color: "#888", lineHeight: 1.7, margin: 0,
            }}>{cocktail.story}</p>
          </div>
          <div style={{
            position: "absolute", left: -4, bottom: 0, width: 6, height: 6,
            borderRadius: "50%", background: "#333",
          }} />
        </div>
      )}

      <p style={{
        fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#444",
        fontStyle: "italic", marginTop: 20,
      }}>per gli allergeni rivolgersi al personale</p>
    </div>
  );
};

/* ─── FOOD DETAIL ─── */
const FoodDetail = ({ item, onBack }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setShow(true), 50);
  }, []);

  return (
    <div style={{
      opacity: show ? 1 : 0, transition: "opacity .4s ease", padding: "0 0 40px",
    }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: YELLOW,
        fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 2,
        cursor: "pointer", padding: "16px 0", display: "flex", alignItems: "center", gap: 6,
      }}>
        ← MENU
      </button>

      <div style={{ marginBottom: 24 }}>
        <div style={{
          width: "100%", aspectRatio: "1 / 1",
          overflow: "hidden", background: "#1a1a1a",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          ) : (
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#333",
              letterSpacing: 2, textTransform: "uppercase",
            }}>no image</span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px,9vw,56px)",
            color: "white", margin: "0 0 8px", lineHeight: .95, letterSpacing: 1,
          }}>{item.name}</h2>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: DARK,
            background: YELLOW, padding: "2px 14px", display: "inline-block", alignSelf: "flex-start",
            marginBottom: 16,
          }}>{item.price}€</span>
          <p style={{
            fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#aaa",
            lineHeight: 1.7, margin: 0,
          }}>{item.description}</p>
        </div>
      </div>

      {item.ingredients && item.ingredients.length > 0 && (
        <div style={{ marginTop: 24, borderTop: "1px solid #1e1e1e", paddingTop: 20 }}>
          <span style={{
            fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3,
            color: "#444", textTransform: "uppercase", display: "block", marginBottom: 12,
          }}>Ingredienti</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {item.ingredients.map((ing, i) => (
              <span key={i} style={{
                fontFamily: "'Absans',sans-serif", fontSize: 12, color: "#999",
                background: "#1a1a1a", border: "1px solid #2a2a2a",
                padding: "4px 10px", borderRadius: 2,
              }}>{ing}</span>
            ))}
          </div>
        </div>
      )}

      <p style={{
        fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#444",
        fontStyle: "italic", marginTop: 20,
      }}>per gli allergeni rivolgersi al personale</p>
    </div>
  );
};

/* ─── MAIN MENU SCREEN ─── */
const MenuScreen = () => {
  const [selected, setSelected] = useState(null); // { section, index } or null
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  const getItemFromSelected = () => {
    if (!selected) return null;
    if (selected.section === "signature") return signatureCocktails[selected.index];
    if (selected.section === "classic") return classicCocktails[selected.index];
    if (selected.section === "food") return food[selected.index];
    return null;
  };

  return (
    <div style={{
      maxWidth: 800, margin: "0 auto", padding: "0 16px 40px",
      opacity: vis ? 1 : 0, transition: "opacity .5s ease",
    }}>
      {/* Sticky top bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 0", borderBottom: "1px solid #1a1a1a", marginBottom: 16,
        position: "sticky", top: 0, background: DARKER, zIndex: 10,
      }}>
        <MONCMark height={18} />
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 2,
          color: "#444", textTransform: "uppercase",
        }}>Menu · 2026</span>
      </div>

      {selected !== null ? (
        selected.section === "food" ? (
          <FoodDetail item={getItemFromSelected()} onBack={() => { setSelected(null); }} />
        ) : (
          <CocktailDetail cocktail={getItemFromSelected()} onBack={() => { setSelected(null); }} />
        )
      ) : (
        <>
          {/* ─── SIGNATURE COCKTAILS (SPAZIO TEMPO) ─── */}
          <SectionHeader title="Spazio Tempo" svgSrc={asset("/assets/spaziotempo-horizontal.svg")} />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {signatureCocktails.map((c, i) => (
              <CocktailCard key={c.id} cocktail={c} onClick={() => { setSelected({ section: "signature", index: i }); window.scrollTo(0, 0); }} />
            ))}
          </div>

          {/* ─── CLASSIC COCKTAILS ─── */}
          <SectionHeader title="Cocktails" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {classicCocktails.map(c => <SimpleItem key={c.id} item={c} />)}
          </div>

          {/* ─── SOFT DRINKS ─── */}
          <SectionHeader title="Soft Drinks" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {softDrinks.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── FOOD ─── */}
          <SectionHeader title="Food" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {food.map((item, i) => (
              <FoodCard key={item.id} item={item} onClick={() => { setSelected({ section: "food", index: i }); window.scrollTo(0, 0); }} />
            ))}
          </div>

          {/* ─── BEER ─── */}
          <SectionHeader title="Birre" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {beer.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── WINE ─── */}
          <SectionHeader title="Vini" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {wine.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── SPIRITS ─── */}
          <SectionHeader title="Spirits" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {spirits.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* Tapas promo */}
          <div style={{
            marginTop: 20, background: "#141414", border: `1px solid ${PINK}30`,
            padding: "22px 18px", textAlign: "center",
          }}>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <img
                src={asset("/assets/images/aperimonc.jpg")}
                alt="AperiMONC"
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", borderRadius: 2 }}
              />
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 50%)",
                padding: "16px 18px", borderRadius: "2px 2px 0 0",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: "white",
                  letterSpacing: 3, lineHeight: 1,
                }}>APERIMONC</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
              <Ghost size={18} color={PINK} />
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3, color: PINK,
                textTransform: "uppercase",
              }}>Offerta Speciale</span>
              <Ghost size={18} color={PINK} />
            </div>
            <p style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: "white",
              margin: "0 0 4px", letterSpacing: 1,
            }}>COCKTAIL / VINO / BIRRA</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, color: YELLOW }}>€12</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: PINK }}>+ 3 TAPAS!</span>
            </div>
            <p style={{
              fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#555", marginTop: 8,
            }}>Tacos · Nachos · Palline di Jalapeño · Guacamole · Salsa Chili · Salsa Cheddar</p>
          </div>

          {/* Fidelity */}
          <div style={{
            marginTop: 8, background: "#141414", border: "1px solid #1e1e1e", padding: "20px 18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Ghost size={18} color={PINK} />
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "white", letterSpacing: 2,
              }}>CHIEDI LA TUA FIDELITY CARD AL BARISTA!</span>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 5, marginBottom: 12,
            }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  aspectRatio: "1", background: "#1a1a1a", border: "1px solid #2a2a2a",
                  display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#4466FF",
                    boxShadow: "0 0 6px #4466FF50",
                  }} />
                </div>
              ))}
              <div style={{
                aspectRatio: "1", background: "#1a1a1a", border: `1px solid ${PINK}60`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 3, borderRadius: 2,
              }}>
                <Ghost size={30} color={PINK} />
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, color: YELLOW,
                  letterSpacing: 1, lineHeight: 1,
                }}>+1 DRINK!</span>
              </div>
            </div>
            <p style={{
              fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#555",
              letterSpacing: 1.5, textTransform: "uppercase", margin: 0, textAlign: "center",
            }}>Ogni 5 timbri avrai una consumazione a tua scelta.</p>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 28, borderTop: "1px solid #1a1a1a", paddingTop: 22,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}>
            <MONCLogo height={24} />
            <p style={{
              fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#444",
              letterSpacing: 4, textTransform: "uppercase", margin: 0,
            }}>Cocktaileria di Quartiere</p>
            <span style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, color: YELLOW, letterSpacing: 2, marginTop: 4,
            }}>VIA GIACOMO MATTEOTTI 43A</span>
            <span style={{ fontFamily: "'Absans',sans-serif", fontSize: 11, color: "#555" }}>392 66 24 209</span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#777" }}>
                <span style={{ color: YELLOW }}>LUN-GIO</span> 17:00–23:00
              </span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#777" }}>
                <span style={{ color: YELLOW }}>VEN-SAB</span> 18:30–01:00
              </span>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#333", letterSpacing: 2 }}>MONC.IT</span>
              <a href="https://www.instagram.com/monc.cocktailbar" target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 5, textDecoration: "none",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#555" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="5" stroke="#555" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#555"/>
                </svg>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#555", letterSpacing: 2 }}>@MONC.COCKTAILBAR</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function MONCApp() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div style={{ minHeight: "100dvh", background: DARKER, position: "relative" }}>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {showIntro ? <IntroScreen onEnter={() => setShowIntro(false)} /> : <MenuScreen />}
      </div>
    </div>
  );
}
