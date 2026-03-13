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
  { id: 101, name: "NEGRONI", price: 8, ingredients: ["Gin", "Campari", "Vermouth Rosso"] },
  { id: 102, name: "MOSCOW MULE", price: 8, ingredients: ["Vodka", "Ginger Beer", "Lime", "Angostura"] },
  { id: 103, name: "MARGARITA", price: 8, ingredients: ["Tequila", "Triple Sec", "Lime", "Sale"] },
  { id: 104, name: "APEROL SPRITZ", price: 8, ingredients: ["Aperol", "Prosecco", "Soda", "Arancia"] },
  { id: 105, name: "DAIQUIRI", price: 8, ingredients: ["Rum", "Lime", "Zucchero"] },
  { id: 106, name: "GIN TONIC", price: 8, ingredients: ["Gin", "Acqua Tonica", "Lime"] },
];

const softDrinks = [
  { id: 201, name: "COCA COLA", price: null, ingredients: [] },
  { id: 202, name: "COCA COLA ZERO", price: null, ingredients: [] },
  { id: 203, name: "FANTA", price: null, ingredients: [] },
  { id: 204, name: "LEMON SODA", price: null, ingredients: [] },
  { id: 205, name: "ORANGE SODA", price: null, ingredients: [] },
  { id: 206, name: "RED BULL", price: null, ingredients: [] },
];

const acque = [
  { id: 701, name: "NATURALE", price: 2, ingredients: ["50cl"] },
  { id: 702, name: "FRIZZANTE", price: 2, ingredients: ["50cl"] },
];

// Food with group labels — items with image are clickable (detail page), others are plain
const food = [
  { id: 301, name: "PATATINE FRITTE AL TARTUFO", price: 5, group: "DA CONDIVIDERE", image: "", description: "Con pecorino e olio al tartufo", ingredients: [] },
  { id: 302, name: "PATATINE FRITTE PICCANTI", price: 5, group: "DA CONDIVIDERE", image: "", description: "Con pecorino e olio piccante", ingredients: [] },
  { id: 303, name: "PALLINE AL JALAPEÑO", price: 4, group: "DA CONDIVIDERE", image: "", description: "", ingredients: [] },
  { id: 304, name: "NACHOS", price: 4, group: "DA CONDIVIDERE", image: "", description: "Con salsa cheddar, piccante, guacamole", ingredients: ["Tortilla Chips", "Salsa Cheddar", "Guacamole", "Jalapeño"] },
  { id: 305, name: "TACOS POLLO", price: 4, group: "TACOS", image: asset("/assets/food/tacos.jpeg"), description: "Straccetti di pollo marinati in salsa agrodolce, peperoni, pomodorini, iceberg", ingredients: ["Tortilla", "Pollo", "Salsa Agrodolce", "Peperoni", "Pomodorini", "Iceberg"] },
  { id: 306, name: "TACOS PULLED PORK", price: 4, group: "TACOS", image: "", description: "Pulled pork marinato, fagioli, cipolla fritta e valeriana", ingredients: ["Tortilla", "Pulled Pork", "Fagioli", "Cipolla Fritta", "Valeriana"] },
  { id: 307, name: "TACOS VEGETARIANO", price: 4, group: "TACOS", image: "", description: "Patate, zucchine, melanzane, peperoni, salsa guacamole", ingredients: ["Tortilla", "Patate", "Zucchine", "Melanzane", "Guacamole"] },
  { id: 308, name: "BAO TARTARE", price: 8, group: "BAO", image: asset("/assets/food/bao.jpeg"), description: "Con tartare di fassona, stracciatella, cipolla rossa caramellata, pomodorino giallo confit", ingredients: ["Bao al vapore", "Tartare di Fassona", "Stracciatella", "Cipolla Caramellata", "Pomodorino Giallo"] },
  { id: 309, name: "MONCLUB", price: 6, group: "MONCLUB", image: "", description: "Club con straccetti di pollo, iceberg, pomodorini, pancetta, formaggio e salsa rosa", ingredients: ["Straccetti di Pollo", "Iceberg", "Pomodorini", "Pancetta", "Formaggio", "Salsa Rosa"] },
];

const beer = [
  { id: 401, name: "BIONDA", price: 4, ingredients: ["Artigianale"] },
  { id: 402, name: "RED LAGER", price: 4, ingredients: ["Artigianale"] },
];

// Wine with subcategories (calice / bottiglia)
const wine = [
  {
    category: "AL CALICE",
    items: [
      { name: "VERMENTINO AUDARYA", label: "Bianco", price: 5 },
      { name: "CANNONAU AUDARYA", label: "Rosso", price: 5 },
      { name: "AKENTA DRY, ROSÈ", label: "Bolle", price: 5 },
    ],
  },
  {
    category: "BOTTIGLIA",
    items: [
      { name: "VERMENTINO AUDARYA", label: "Bianco", price: 24 },
      { name: "CANNONAU AUDARYA", label: "Rosso", price: 24 },
      { name: "AKENTA DRY, ROSÈ", label: "Bolle", price: 24 },
    ],
  },
];

// Spirits grouped by category
const distillati = [
  {
    category: "VODKA",
    items: [
      { name: "SKY", price: 4 },
      { name: "ABSOLUTE", price: 5 },
      { name: "TITO'S HANDMADE", price: 7 },
      { name: "CIROC", price: 7 },
      { name: "BELUGA", price: 8 },
    ],
  },
  {
    category: "GIN",
    items: [
      { name: "BEEFEATER", price: 4 },
      { name: "PLYMOUTH", price: 5 },
      { name: "GRIFU", price: 7 },
      { name: "GIN MALFI POMPELMO ROSA", price: 8 },
      { name: "SCAPEGRACE BLACK GIN", price: 9 },
      { name: "GIN 400 CONIGLI COFFEE", price: 10 },
    ],
  },
  {
    category: "RUM",
    items: [
      { name: "BACARDI BIANCO", price: 4 },
      { name: "MYER'S JAMAICAN", price: 5 },
      { name: "HAVANA ESPECIAL", price: 5 },
      { name: "CPT MORGAN SPICED", price: 6 },
      { name: "DON PAPA", price: 7 },
      { name: "HAVANA 7", price: 7 },
      { name: "KRAKEN", price: 7 },
    ],
  },
  {
    category: "TEQUILA",
    items: [
      { name: "CAZADORES", price: 4 },
      { name: "PATRON SILVER", price: 8 },
      { name: "PATRON ANEJO", price: 8 },
      { name: "PATRON REPOSADO", price: 8 },
    ],
  },
  {
    category: "WHISKY",
    items: [
      { name: "BULLEIT BOURBON", price: 6 },
      { name: "BULLEIT RYE", price: 6 },
      { name: "GLENDFIDDICH 12Y", price: 10 },
      { name: "LAPHROAIG", price: 11 },
      { name: "NIKKA", price: 12 },
    ],
  },
  {
    category: "GRAPPE",
    items: [
      { name: "GRAPPA BIANCA", price: 4 },
      { name: "GRAPPA BARRIQUE", price: 5 },
    ],
  },
  {
    category: "AMARI",
    items: [
      { name: "MONTENEGRO", price: 4 },
      { name: "AMARO DEL CAPO", price: 4 },
      { name: "LIQUIRIZIA", price: 4 },
      { name: "LIMONCINO", price: 4 },
      { name: "JÄGERMEISTER", price: 5 },
      { name: "MIRTO BIANCO", price: 5 },
      { name: "MIRTO ROSSO", price: 5 },
    ],
  },
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
      display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: item.ingredients?.length ? 4 : 0,
    }}>
      <h3 style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(16px,4vw,22px)",
        color: "white", margin: 0, letterSpacing: 1, lineHeight: 1.1,
      }}>{item.name}</h3>
      <span style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: YELLOW,
        background: `${YELLOW}12`, padding: "2px 10px", whiteSpace: "nowrap",
        flexShrink: 0, marginLeft: 8,
      }}>{item.price != null ? `${item.price}€` : "—"}</span>
    </div>
    {item.ingredients?.length > 0 && (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {item.ingredients.map((ing, j) => (
          <span key={j} style={{
            fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#666",
            background: "#1e1e1e", padding: "2px 7px", borderRadius: 2,
          }}>{ing}</span>
        ))}
      </div>
    )}
    {item.description && !item.ingredients?.length && (
      <p style={{ fontFamily: "'Absans',sans-serif", fontSize: 11, color: "#555", margin: 0, lineHeight: 1.4 }}>{item.description}</p>
    )}
  </div>
);

/* Grouped spirit/distillati display */
const SpiritGroup = ({ category, items }) => (
  <div style={{ background: "#141414", border: "1px solid #1e1e1e" }}>
    <div style={{
      padding: "8px 18px 7px",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <span style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3,
        color: "#ccc", textTransform: "uppercase",
      }}>{category}</span>
    </div>
    <div style={{ padding: "10px 18px 12px" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: i < items.length - 1 ? 7 : 0,
          borderBottom: i < items.length - 1 ? "1px solid #191919" : "none",
          marginBottom: i < items.length - 1 ? 7 : 0,
        }}>
          <span style={{
            fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#ccc", letterSpacing: 0.3,
          }}>{item.name}</span>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: YELLOW,
            background: `${YELLOW}12`, padding: "1px 8px", whiteSpace: "nowrap", marginLeft: 12,
          }}>{item.price}€</span>
        </div>
      ))}
    </div>
  </div>
);

/* Wine subcategory display */
const WineSection = ({ category, items }) => (
  <div style={{ background: "#141414", border: "1px solid #1e1e1e" }}>
    <div style={{ padding: "8px 18px 7px", borderBottom: "1px solid #1a1a1a" }}>
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3,
        color: "#555", textTransform: "uppercase",
      }}>{category}</span>
    </div>
    <div style={{ padding: "10px 18px 12px" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: i < items.length - 1 ? 7 : 0,
          borderBottom: i < items.length - 1 ? "1px solid #191919" : "none",
          marginBottom: i < items.length - 1 ? 7 : 0,
        }}>
          <div>
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 7, color: "#444",
              letterSpacing: 1, display: "block", marginBottom: 2, textTransform: "uppercase",
            }}>{item.label}</span>
            <span style={{ fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#ccc" }}>{item.name}</span>
          </div>
          <span style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: YELLOW,
            background: `${YELLOW}12`, padding: "1px 8px", whiteSpace: "nowrap", marginLeft: 12,
          }}>{item.price}€</span>
        </div>
      ))}
    </div>
  </div>
);

/* Food group label */
const FoodGroupLabel = ({ label }) => (
  <div style={{ padding: "10px 4px 4px" }}>
    <span style={{
      fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3,
      color: "#444", textTransform: "uppercase",
    }}>{label}</span>
  </div>
);

const CocktailCard = ({ cocktail, onClick, index = 0 }) => (
  <div onClick={onClick}
    className="card-lift card-enter"
    style={{
      background: "#141414", border: "1px solid #1e1e1e", padding: "16px 18px",
      cursor: "pointer", position: "relative", overflow: "hidden",
      animationDelay: `${index * 55}ms`,
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

const FoodCard = ({ item, onClick, index = 0 }) => (
  <div onClick={onClick}
    className="card-lift card-enter"
    style={{
      background: "#141414", border: "1px solid #1e1e1e", padding: "16px 18px",
      cursor: "pointer", position: "relative", overflow: "hidden",
      animationDelay: `${index * 55}ms`,
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
      <div style={{ textAlign: "center", maxWidth: 600, position: "relative", zIndex: 1 }}>
        {[
          <div key="logo" style={{ marginBottom: 30, display: "flex", justifyContent: "center" }}><MONCLogo height={60} /></div>,
          <h1 key="title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(36px, 10vw, 64px)", color: "white", letterSpacing: 2, lineHeight: 1, margin: "0 0 12px" }}>MENU</h1>,
          <p key="desc" style={{ fontFamily: "'Absans',sans-serif", fontSize: 14, color: "#aaa", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 16px" }}>
            Benvenuti da MONC, <span style={{ color: "white", fontWeight: 600 }}>la vostra cocktaileria di quartiere.</span><br />Signature cocktails, classici rivisitati, birre, vini e tanto altro — tutto pensato per farvi sentire a casa.
          </p>,
          <p key="sub" style={{ fontFamily: "'Absans',sans-serif", fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
            Sedetevi, sfogliate il menu e lasciatevi guidare dal gusto.
          </p>,
          <button key="cta" onClick={onEnter} className="btn-cta" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 3, background: YELLOW, color: DARK, border: "none", padding: "14px 44px", cursor: "pointer" }}>ENTRA NEL MENU</button>,
        ].map((child, i) => (
          <div key={i} className="card-enter" style={{ animationDelay: `${i * 100 + 80}ms` }}>{child}</div>
        ))}
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
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "opacity .5s cubic-bezier(0.25,0.46,0.45,0.94), transform .5s cubic-bezier(0.25,0.46,0.45,0.94)",
      padding: "0 0 40px",
    }}>
      <button onClick={onBack} className="back-btn" style={{
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
              className="img-pop"
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
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "opacity .5s cubic-bezier(0.25,0.46,0.45,0.94), transform .5s cubic-bezier(0.25,0.46,0.45,0.94)",
      padding: "0 0 40px",
    }}>
      <button onClick={onBack} className="back-btn" style={{
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
              className="img-pop"
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
  const [selected, setSelected] = useState(null);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  // Preload all detail images in the background while user browses the list
  useEffect(() => {
    const srcs = [
      ...signatureCocktails.map(c => c.image),
      ...food.map(f => f.image).filter(Boolean),
    ];
    srcs.forEach(src => { if (src) { const img = new Image(); img.src = src; } });
  }, []);

  const getItemFromSelected = () => {
    if (!selected) return null;
    if (selected.section === "signature") return signatureCocktails[selected.index];
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
              <CocktailCard key={c.id} index={i} cocktail={c} onClick={() => { setSelected({ section: "signature", index: i }); window.scrollTo(0, 0); }} />
            ))}
          </div>

          {/* ─── CLASSIC COCKTAILS IBA ─── */}
          <SectionHeader title="Cocktail Classici IBA" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {/* Fixed price badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 18px",
              background: `${YELLOW}10`, border: `1px solid ${YELLOW}20`,
            }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 2, color: "#666" }}>
                PREZZO FISSO
              </span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: YELLOW }}>8€</span>
            </div>
            {classicCocktails.map(c => <SimpleItem key={c.id} item={c} />)}
          </div>

          {/* ─── DISTILLATI ─── */}
          <SectionHeader title="Distillati" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {distillati.map(group => (
              <SpiritGroup key={group.category} category={group.category} items={group.items} />
            ))}
          </div>

          {/* ─── SOFT DRINKS ─── */}
          <SectionHeader title="Soft Drinks" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {softDrinks.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── ACQUE ─── */}
          <SectionHeader title="Acque" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {acque.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── BEER ─── */}
          <SectionHeader title="Birre Artigianali" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {beer.map(item => <SimpleItem key={item.id} item={item} />)}
          </div>

          {/* ─── WINE ─── */}
          <SectionHeader title="Vini" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {wine.map(section => (
              <WineSection key={section.category} category={section.category} items={section.items} />
            ))}
          </div>

          {/* ─── FOOD ─── */}
          <SectionHeader title="Food" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 28 }}>
            {food.flatMap((item, i) => {
              const showGroupLabel = item.group !== food[i - 1]?.group;
              const elements = [];
              if (showGroupLabel) {
                elements.push(<FoodGroupLabel key={`g-${item.group}`} label={item.group} />);
              }
              elements.push(
                <FoodCard key={item.id} index={i} item={item} onClick={() => { setSelected({ section: "food", index: i }); window.scrollTo(0, 0); }} />
              );
              return elements;
            })}
          </div>

          {/* AperiMONC promo */}
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
              <Ghost size={18} color={PINK} />
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3, color: PINK,
                textTransform: "uppercase",
              }}>Dalle 18:00 alle 21:00</span>
              <Ghost size={18} color={PINK} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#1a1a1a", padding: "12px 16px",
              }}>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <p style={{
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "white",
                    margin: "0 0 2px", letterSpacing: 1,
                  }}>DRINK BASE / VINO / BIRRA</p>
                  <p style={{
                    fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#555", margin: 0,
                  }}>Nachos · Jalapeño Bites · 1 Tacos</p>
                </div>
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: YELLOW,
                  marginLeft: 16, lineHeight: 1,
                }}>€12</span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#1a1a1a", padding: "12px 16px",
              }}>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <p style={{
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "white",
                    margin: "0 0 2px", letterSpacing: 1,
                  }}>DRINK SIGNATURE</p>
                  <p style={{
                    fontFamily: "'Absans',sans-serif", fontSize: 10, color: "#555", margin: 0,
                  }}>Nachos · Jalapeño Bites · 1 Tacos</p>
                </div>
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: PINK,
                  marginLeft: 16, lineHeight: 1,
                }}>€15</span>
              </div>
            </div>
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
                <span className="ghost-float"><Ghost size={30} color={PINK} /></span>
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
