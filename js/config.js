/* ==========================================================
   CONTENIDO DE LA WEB
   Todo lo que ves en la página sale de este archivo.
   ========================================================== */

window.BODA = {

  /* ---------- Novios ---------- */
  novios: ["Ly", "Miguel"],

  mensaje:
    "Hay momentos en la vida que se atesoran para siempre, y nos encantaría que este fuera uno de ellos. Acompáñanos a celebrar nuestra boda, rodeados de naturaleza, rica comida y el cariño de las personas que más queremos.",

  /* ---------- Fecha y hora ---------- */
  fecha: {
    iso: "2026-10-03T17:30:00-03:00",
    duracionHoras: 6
  },

  /* ---------- Lugar ---------- */
  lugar: {
    nombre: "Casona de los Mesas",
    direccion: "Lillo 371, Isla de Maipo.",
    busqueda: "Casona de los Mesas, Lillo 371, Isla de Maipo, Chile",
    indicaciones: "Habrá estacionamiento disponible dentro del recinto para que lleguen con total tranquilidad."
  },

  /* ---------- Dress code ---------- */
  dressCode: {
    titulo: "¿Cómo venir?",
    parrafos: [
      "Lo más importante para nosotros es que nos acompañen y se sientan cómodos tal como son.",
      "Nuestra celebración será al aire libre entre jardines y árboles, así que les sugerimos elegir un atuendo semi-formal y zapatos cómodos para disfrutar sin preocupaciones.",
      "Si quieren inspirarse con los colores de la tierra y la primavera, aquí les dejamos una paleta de referencia (¡no es obligación seguirla estrictamente!):"
    ],
    cierre: "Vengan con ganas de celebrar y pasarlo bien, eso es lo único que necesitamos.",
    paleta: [
      { nombre: "Oliva", color: "#7b8459" },
      { nombre: "Salvia", color: "#a2a883" },
      { nombre: "Arena", color: "#d9c8a6" },
      { nombre: "Terracota", color: "#b8735a" },
      { nombre: "Café tierra", color: "#6b4a2c" },
      { nombre: "Durazno", color: "#e6b99a" },
      { nombre: "Azul polvo", color: "#8fa3b8" }
    ]
  },

  /* ---------- Regalo / Luna de miel ---------- */
  regalo: {
    titulo: "Nuestra luna de miel",
    intro: [
      "La presencia de cada uno de ustedes es el mejor regalo que podríamos recibir. Si además desean hacernos un detalle para nuestra luna de miel y ayudarnos a dar el primer gran paso en esta nueva etapa, estaremos muy agradecidos."
    ],
    banco: {
      titular: "Lilian Valenzuela Silva",
      banco: "Banco Santander",
      tipo: "Cuenta Corriente",
      numero: "64527347",
      rut: "16657199-5",
      correo: "lilian.valenzuela@gmail.com"
    }
  },

  /* ---------- Transporte ---------- */
  transporte: {
    activo: true,
    titulo: "Transporte",
    intro: [
      "Para que todos puedan relajarse y disfrutar al máximo sin preocuparse por manejar, organizamos transporte compartido de ida y regreso."
    ],
    formulario: {
      activo: false
    },
    privado: {
      activo: true,
      titulo: "Vehículos asignados",
      texto: "Aquí podrán revisar el vehículo y el punto de salida que les fue asignado. Por privacidad, esta información está protegida: solo ingresen la clave secreta que les compartimos por WhatsApp.",
      placeholder: "Clave secreta",
      boton: "Ver mi transporte",
      error: "Mmm, parece que la clave no es correcta. Revisen el mensaje de WhatsApp o consúltennos directamente.",
      buscarPlaceholder: "Escribe tu nombre para buscarte más rápido…",
      cifrado: {
			salt: "kNv5RD42G3gLverfDRLYbA==",
			iv: "P3RZkcM9vlY2mAPm",
			data: "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"
		}
    }
  },

  /* ---------- Cierre ---------- */
  cierre: "¡Los esperamos con el corazón abierto!",

  extras: []
};