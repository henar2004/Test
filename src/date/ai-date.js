/* =========================================
   Archivo: ai-data.js
   Tipo: JS
   Descripción: Almacenamiento de datos estáticos para lexicos de palabras positivas, negativas, intensificadores y rangos de usuario
   ========================================= */

/* ====== CONSTANTES / DATOS ======
   Datos estáticos, arrays de opciones, configuraciones internas */

/* ==================
   PALABRAS POSITIVAS
   ==================
   Palabras que aportan valor positivo al análisis */
export const goodWords = [
  "feliz",
  "genial",
  "maravilloso",
  "alegria",
  "increible",
  "amable",
  "optimista",
  "contento",
  "satisfecho",
  "agradecido",
  "bondadoso",
  "cariñoso",
  "simpatico",
  "agradable",
  "amigable",
  "solidario",
  "compasivo",
  "altruista",
  "generoso",
  "honesto",
  "leal",
  "respetuoso",
  "educado",
  "cortes",
  "valiente",
  "fuerte",
  "sereno",
  "tranquilo",
  "pacifico",
  "positivo",
  "esperanzado",
  "entusiasta",
  "animado",
  "vivaz",
  "vibrante",
  "brillante",
  "inteligente",
  "ingenioso",
  "creativo",
  "talentoso",
  "habilidoso",
  "diestro",
  "exitoso",
  "triunfador",
  "competente",
  "eficaz",
  "eficiente",
  "productivo",
  "responsable",
  "organizado",
  "puntual",
  "confiable",
  "fiable",
  "prudente",
  "humilde",
  "modesto",
  "elegante",
  "apasionado",
  "encantador",
  "magico",
  "sublime",
  "excelente",
  "estupendo",
  "magnifico",
  "esplendido",
  "fantastico",
  "fenomenal",
  "perfecto",
  "impecable",
  "radiante",
  "saludable",
  "sano",
  "vital",
  "vigoroso",
  "activo",
  "libre",
  "valioso",
  "precioso",
  "hermoso",
  "bello",
  "bonito",
  "dulce",
  "tierno",
  "paciente",
  "tolerante",
  "flexible",
  "resiliente",
  "decidido",
  "inspirador",
  "motivador",
  "constructivo",
  "armonioso",
  "equilibrado",
  "prospero",
  "seguro",
  "confiado",
  "serio",
  "apoyador",
  "colaborador",
  "curioso",
  "ambicioso",
  "detallista",
];

/* ==================
   PALABRAS NEGATIVAS
   ==================
   Palabras que aportan valor negativo o son insultos */
export const badWords = [
  "mierda",
  "joder",
  "jodido",
  "jodida",
  "coño",
  "coñazo",
  "hostia",
  "puta",
  "puto",
  "puton",
  "putilla",
  "gilipollas",
  "gilipollez",
  "idiota",
  "imbecil",
  "estupido",
  "estupida",
  "tonto",
  "tonta",
  "capullo",
  "capulla",
  "cabron",
  "payaso",
  "payasa",
  "zorra",
  "cerdo",
  "cerda",
  "asqueroso",
  "asquerosa",
  "basura",
  "malnacido",
  "malnacida",
  "desgraciado",
  "desgraciada",
  "subnormal",
  "inutil",
  "patetico",
  "patetica",
  "tarado",
  "tarada",
  "pringado",
  "pringada",
  "mamoncete",
  "mamon",
  "soplapollas",
  "chupapollas",
  "hijoputa",
  "maricon",
  "marica",
  "cojon",
  "polla",
  "culo",
  "culos",
  "follar",
  "follador",
  "folladora",
  "imbecilidad",
  "imbecil",
  "bastardo",
  "bastarda",
  "cretino",
  "cretina",
  "lerdo",
  "lerda",
];

/* ==================
   PALABRAS NEGADORAS
   ==================
   Palabras que niegan o invierten el sentido de la oración */
export const negators = [
  "no",
  "nunca",
  "ni",
  "sin",
  "tampoco",
  "jamas",
  "ningún",
  "ninguna",
  "ninguno",
  "nadie",
  "nada",
  "ningunos",
  "ningunas"
];

/* ==================
   ORACIONES DE PRUEBA
   ==================
   Frases de ejemplo para test de análisis de sentimiento */
export const testSentences = [
  "hoy estoy muy feliz y todo es genial",
  "esto es increible y maravilloso",
  "me siento triste pero intento ser optimista",
  "que mierda de dia, todo va mal",
  "eres un gilipollas y esto es horrible",
  "estoy agradecido y contento con la vida",
  "esto es una puta basura y me enfada",
  "me encanta este momento fantastico",
  "estoy enfadado pero luego me alegro",
  "que asco de situacion, joder",
  "no puedo creer lo que pasó, estoy furioso",
  "me siento un poco ansioso por el futuro",
  "qué alegría verte después de tanto tiempo",
  "estoy completamente desanimado hoy",
  "esto me sorprende y me emociona mucho",
  "poco a poco las cosas mejoran, me siento bien",
  "no me gusta cómo terminó todo esto",
  "es un día normal, nada especial",
  "me da miedo lo que pueda pasar mañana",
  "super contento con los resultados del proyecto",
  "odio cuando la gente miente",
  "me siento agradecido por tu ayuda",
  "qué desastre de jornada, todo salió mal",
  "me emociona cada pequeño logro que consigo",
  "aunque estoy cansado, me siento optimista",
  "esto es asqueroso y me repugna",
  "siento mucha ira por lo que hicieron",
  "qué sorpresa tan agradable recibir tu mensaje",
  "me siento neutral, ni feliz ni triste",
  "es un momento genial, estoy emocionado",
];

/* ==================
   INTENSIFICADORES
   ==================
   Palabras que multiplican la intensidad del siguiente término */
export const intensifiers = {
  muy: 1.5,
  extremadamente: 2,
  super: 1.7,
  terriblemente: 2.2,
  totalmente: 1.8,
  completamente: 1.8,
  absolutamente: 2,
  sumamente: 2,
  increiblemente: 1.9,
  extraordinariamente: 2.1,
  excesivamente: 2,
  notablemente: 1.6,
  intensamente: 1.8,
  profundamente: 1.7,
  exageradamente: 2.2,
  horriblemente: 2,
  gravemente: 1.9,
  fuertemente: 1.7,
  particularmente: 1.5,
  demasiado: 1.6,
  enormemente: 1.9,
  radicalmente: 2,
};

/* ====== FUNCIONES / MÉTODOS ======
   Funciones auxiliares, handlers y callbacks */

// Función para asignar rango según score (positivo o negativo)
export const getUserRank = (score) => {
  // recibe 'score' (número) y devuelve una etiqueta según rangos definidos.
  // si score === 0 devuelve null (sin rango asignado).
  if (score === 0) return null;

  // rangos positivos (score > 0), ordenados por min ascendente
  const ranges = [
    { min: 90, label: "Leyenda 🌟" },
    { min: 80, label: "Ángel comunitario 😇" },
    { min: 70, label: "Referente 🔥" },
    { min: 60, label: "Inspirador 💙" },
    { min: 50, label: "Muy positivo ✅" },
    { min: 40, label: "Ejemplar 🏅" },
    { min: 30, label: "Buen ciudadano 👍" },
    { min: 20, label: "Respetuoso 🤝" },
    { min: 10, label: "Amable 🙂" },
    { min: 1, label: "Moderado 🌱" },
  ];

  // rangos negativos (score < 0), usando 'max' para comparar <=
  const toxicRanges = [
    { max: -90, label: "Enemigo público 💀" },
    { max: -80, label: "Extremadamente nocivo ☠️" },
    { max: -70, label: "Amenaza 🚨" },
    { max: -60, label: "Peligroso ⚠️" },
    { max: -50, label: "Muy tóxico 🤢" },
    { max: -40, label: "Agresivo 😡" },
    { max: -30, label: "Conflictivo 💥" },
    { max: -20, label: "Tóxico 🧨" },
    { max: -10, label: "Problemático 😬" },
    { max: -1, label: "Tenso 🌧️" },
  ];

  // devolver la etiqueta correspondiente según signo del score
  if (score > 0) return ranges.find((r) => score >= r.min)?.label;
  if (score < 0) return toxicRanges.find((r) => score <= r.max)?.label;
};
