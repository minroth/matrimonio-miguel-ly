/* ==========================================================
   CONTENIDO DE LA WEB
   Todo lo que ves en la página sale de este archivo.
   Edita los textos aquí y no necesitas tocar nada más.
   ========================================================== */

window.BODA = {

  /* ---------- Novios ---------- */
  novios: ["Ly", "Miguel"],

  mensaje:
    "Acompáñanos a celebrar el comienzo de un nuevo capítulo, rodeados de naturaleza, buena comida y las personas que más queremos.",

  /* ---------- Fecha y hora ----------
     Formato: AAAA-MM-DDTHH:MM:00-03:00
     (-03:00 = horario de verano de Chile; en invierno sería -04:00) */
  fecha: {
    iso: "2026-10-03T17:30:00-03:00",
    duracionHoras: 6            // para el evento del calendario
  },

  /* ---------- Lugar ---------- */
  lugar: {
    nombre: "Casona de los Mesas",
    direccion: "Lillo 371, Isla de Maipo.",
    // Texto que se busca en Google Maps / Waze
    busqueda: "Casona de los Mesas, Lillo 371, Isla de Maipo, Chile",
    indicaciones: ""            // ej: "Hay estacionamiento dentro del recinto." (opcional)
  },

  /* ---------- Dress code ---------- */
  dressCode: {
    titulo: "Dress Code",
    parrafos: [
      "No hay un código estricto.",
      "Nos encantaría que eligieras un atuendo que te haga sentir especial y auténtic@.",
      "Piensa en una celebración al aire libre: colores inspirados en la tierra, el bosque y la primavera, y zapatos cómodos para caminar entre jardines."
    ],
    cierre: "Lo más importante es que vengas siendo tú.",
    // Paleta de inspiración (toca un color para ver su nombre). Puedes quitar o agregar.
    paleta: [
      { nombre: "Oliva",       color: "#7b8459" },
      { nombre: "Salvia",      color: "#a2a883" },
      { nombre: "Arena",       color: "#d9c8a6" },
      { nombre: "Terracota",   color: "#b8735a" },
      { nombre: "Café tierra", color: "#6b4a2c" },
      { nombre: "Durazno",     color: "#e6b99a" },
      { nombre: "Azul polvo",  color: "#8fa3b8" }
    ]
  },

  /* ---------- Regalo / Luna de miel ---------- */
  regalo: {
    titulo: "Nuestra luna de miel",
    intro: [
      "Si quieres hacernos un regalo, estaremos recibiendo aportes para nuestra luna de miel."
    ],

    banco: {
      titular: "Lilian Valenzuela Silva",
      banco:   "Banco Santander",
      tipo:    "Cuenta Corriente",
      numero:  "64527347",
      rut:     "16657199-5",
      correo:  "lilian.valenzuela@gmail.com"
    }
  },

  /* ---------- Transporte ---------- */
  transporte: {
    activo: true,
    titulo: "Transporte",
    intro: [
      "Organizamos transporte grupal hacia la Casona y de regreso a sus casas para quienes lo necesiten."
    ],

    // Botón que abre tu formulario de Google
    formulario: {
      activo: true,
      texto: "Si aún no has avisado si necesitas transporte, complétalo aquí:",
      boton: "Completar formulario",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeQW7nGg2wAMfZFQ3UxYgZjrVd7KeWFv3KZVXt0JzF87AstvA/viewform?usp=header"
    },

    // Quién va en qué vehículo. Está cifrado (ver admin-encrypt.html) para que
    // no sea legible por cualquiera que mire el código de la página: solo se
    // puede leer con la clave correcta.
    privado: {
      activo: true,
      titulo: "Ver los vehículos asignados",
      texto: "Esta información es privada. Ingresa la clave que te compartimos por WhatsApp para verla.",
      placeholder: "Clave",
      boton: "Ver",
      error: "Clave incorrecta. Revisa el mensaje de WhatsApp o pregúntale a los novios.",
      buscarPlaceholder: "Busca tu nombre para ubicarte más rápido…",
      // Generado con admin-encrypt.html · clave actual: pantufla
      cifrado: {
        salt: "8AglIHcNj1byKHpNfbuCxQ==",
        iv: "yEiXbm9YsxAu0+DF",
        data: "dCnQp+BqX5fq+JTTQa71rPTRI7TiNH/K91uVRwS1zOaUm8OGkfHg0UYfL/D5puejJcQNezH+x/5mJtXZmEneXzO9LcWN1Jxn59pgwdM38y0ptHpSGZAs+PpToG8DX4wSYixG8Sa6C1FnBMfTu48GoEwn/u5k7JfqKfB/wrOeZ132n7eEclBjE5ZlvcWK6NvbaWNSXfrIMvoRspWA95kgAC9jgGqJjdUOA2AhMSRB8TrJmvA7wybf5vPK+kC6V1uWB6qrB1N9yndBMwmGaTvb82A7tnzzqaYEACqkNlUbsPyGkXPyoHwinUgEcAyoJw07G9IZ/s50+POkx4omWPdbvZfhiOoS+UB7ZuVL7r36yHc5FK/o8/emvVPBR5esHh/uCwYhGqe9reEP8DAU7WSd1fJJmlLD/wNhSQvFEPZG8T1nH8QEwrnabF01TBSE0HzI8Tt9lbj3Khaly2+pwRk14jRnNQxF3wyy+vnfBw9ZDOmCtso/QyaG7NHUOE+R0TzV+mPVV9gaZ7yrmq0xtqP4B+knH0T0FrGtOXl0jPVdlHTX9LwSovlvPS0gu+yQZiKHw/yQJ37vsD6TACCwXYmt6JnfhrA/1YXU+cdCviep2jR3h1ct+blW2Bb2MnNe5GDL/b+JClXiWHar8EebQ1bbTGyeXEaV2ZuNQUWdXiyeGjK2RHEfDWgTpZhhPO+Jz487i4hRqZUSfLaqYhAfpe1atflAbHGiMSyw/hVPJIE+TYOxpcjWUm0oR03BCc0XJnBnIR0KTTSDsprDMKUpJ6GdDLY+x6PY666o9kU3IaIpO2juz5wwuDxs4T2lRLJFyoyQIlixp1dkLFvO8sEl29u+8mno0U8/LbWU6jTK0hEKylvN0KYBUBglk9gN5FX1XFwtTzJS2htxAk355Haw6BULo6hEFJu+eCS1HCI7UXLuCVONdkcIyyzSuOUKj1Ed5Sakh+Sq6KA9padRimiM7ryVpkNhPLKF/Q7Pbize8xfYiKA1kWI7TsFrLj/k9xC0rkAha8NC8+pxfMkUPVE8Wu7sGwH1xwk8ZSjIWFIT57r5usQutdT+JrlvTBw8/f0Bm1n+Ogr/Ia7i3sm/OgkddVMBOtxtmehnYGIWg/XQLoAc4ja1J4Bf/ACfi9j1xvkaJiGCLDGVrQtkKk1K9x5QfGqPm12WI4twc1+gDLnKm2wIZayUBMEIbKDdivW1EvAsdEA7nTk6tnlbpmO4ktA8kR2SJRXTUy/nu/KnK205cv2NwVd+Ap6mv5zhzSpSTeZuQu5c1c47yxkl302k3hOW4kdUIdCeheYJbmLBbEsxFQgYPjrvWfbJ6vQYQilyhOuml1/u3LZZUdLFKwtHWoI1m6I7ZAiH4obsG58gfJ5VtBpH9Aw4P46cq+ngx6mAFS9hYdPGng86lLmRmvZhk6u6yGPpyOxZ2A3rYghNyK6b8GQVZIgqZr6bC1d7qugXd5XVtXITStq8fKm8o3ZaE2eFE349I9EheuP4DQgnuuSqr/ACUE4yWFzXVvpTtjofcKs5aKNncTyeZ5zGV4c8I+bgwj1kNk9P6eyHe5eKf9NzjPMrhWPtzfI58XyaHPlSTyBX1eyzMVbaOJh0PDxo4yvY4/Gqt1aCLCMQfY3rYvHI5uiq3drELP5uMZWKYB5cND5VFF/o/NsBdyldJ3WCDWgJM9OZAB0+KWQdljs5so7XCd+mMwJH2eEoyEyEvM798aWswdrwROxQaq6LtC/+ttUeqtUqOK1Rc+0gBAe83US8e7F5TWmvuUaIRUyL2ogZObM3YjLja7haxaapfBq8zrWhFk9JUXwQxFKqhDFJZXTTkVo2rDf5+FhobxbLT30NvA+HTz02iwxs8BhnAEoo3BxQO4aOLldwe8dYvu98WzvUx9O6eG6zIH4PlDa27iZ0hgbMKSVybARHxDgWl+m0SDnSjKzrXAMGEHl59qpeyzSPf8xMs/9mFtSfqVRuagtGnHBkHM391pk5/E3JOOmqh14lzVRwR0RIRNEz0Pgjw0+OTkMspwnB/Dk4ubKt+CpasFXEIp4p7mnV2sGu5JvJlrs1m0OmxlrpK3zbmIZmkI0OBhtPMPBHtWnwwJNZsHP6x+LUZpVeuRgcyZposv5jlfUPBq6HcG2apn9ZLIlv9PyY/5SU5X86XvOYqnUqxnULKfmy9MO3E9q60uXktrxiqiDgEQXdOQNyIAs7mMbEIBxJ3/CWZ6AvhLjQKNdlz5CWy7ZbHs8KjqirYxczElqUSFcaoNpixdTCkzQkhuT/8KZnMEeqWhhOnr7w1YUfVqf4a+mvZNJiId2/abJQw++xE76cBMdQK/QhYKlCbEaKimO/LmC4A93TKNMJ+pO+k1YqjHdCiblyJhpacNDVyTx82u7hcL4/2xlfbxZUreWZe5TGL0Ntzeuia1CSzgzEWECIVl+U1LT1BCXxIdoTeHZZkBMfmWtPqyEFasbv3aR68LH/jU3vtASdxk8iS3YGWGy3noo3x0rlTLW/cbiV/bIievVWB4ZgzKEo/ZlTdJEjPnF2rIgnRptiES2Iy0++3dfci2ESc6ErYMxnKIL/NJ3+33wbluIJxU5qpVvN7me5EugaX1g0+fBoRdGhlNnj49YTiRVto/Gj5ug4qrkr+HC4TUCpUUxtgVMl/KUrL5554x1KF6D2u1nW9xsKz5UUrNdngFCyghmq4HKOdR1mcx4xHyG1RK1b8Rn+o2ITWm5BuSGYXE69YBSJBQ/LB0CSrkJS64acG4gBlCfiINu9Rsnd4Ox4YUX3xrFz5A7T5eozIs7VLS6vZrZxqMaxz8BIWmw12eqb8bwvy/t8+jDoeJE1Zx48PA/5EYeK5hatUZM7RUUxnJCOAqht1MRYOx3db8JnSNKT8IuCircjusAbkxFlivuA/7+eFeFjuzY7ltY4clvAyU6wwEnb0I7xwKmcc1ZAjFfNGeocrhyVn0cjAI8hGq1NFP1l3raafFl8e+zuEQ=="
      }
    }
  },

  /* ---------- Confirmación de asistencia ----------
     El formulario arma un mensaje y lo envía por WhatsApp y/o correo
     (no necesita servidor). Si no dejas ninguno, la sección se oculta.
     WhatsApp: número con código de país y sin +, ej: "56912345678" */
  rsvp: {
    activo: true,
    titulo: "¿Nos acompañas?",
    texto: "Cuéntanos si vienes para poder organizarnos.",
    whatsapp: "",
    email: "lilian.valenzuela@gmail.com",
    maxPersonas: 6
  },

  /* ---------- Cierre ---------- */
  cierre: "¡Los esperamos!",

  /* ==========================================================
     SECCIONES EXTRA
     Agrega aquí todo lo que quieras. Cada bloque es una hoja nueva.
     Pon activo: true para mostrarla.
     Tipos: "texto" | "cronograma" | "faq" | "galeria"
     Opcional: despuesDe: "lugar" (id de la sección tras la que se inserta)
              ids disponibles: inicio, lugar, dresscode, regalo, rsvp
     ========================================================== */
  extras: [
    {
      activo: false,
      id: "programa",
      tipo: "cronograma",
      titulo: "Programa",
      despuesDe: "lugar",
      items: [
        { hora: "17:30", titulo: "Bienvenida",  texto: "Recibimiento entre jardines." },
        { hora: "18:00", titulo: "Ceremonia",   texto: "" },
        { hora: "19:00", titulo: "Cena",        texto: "" },
        { hora: "21:00", titulo: "Fiesta",      texto: "" }
      ]
    },
    {
      activo: false,
      id: "preguntas",
      tipo: "faq",
      titulo: "Preguntas frecuentes",
      items: [
        { p: "¿Puedo llevar niños?",       r: "Escribe aquí tu respuesta." },
        { p: "¿Hay estacionamiento?",      r: "Escribe aquí tu respuesta." },
        { p: "¿Cómo llego desde Santiago?", r: "Escribe aquí tu respuesta." }
      ]
    },
    {
      activo: false,
      id: "fotos",
      tipo: "galeria",
      titulo: "Nuestra historia",
      // Sube tus fotos a la carpeta img/ y enuméralas aquí
      fotos: [
        // { src: "img/foto1.jpg", alt: "Descripción de la foto" }
      ]
    },
    {
      activo: false,
      id: "hospedaje",
      tipo: "texto",
      titulo: "Dónde alojar",
      parrafos: ["Escribe aquí tus recomendaciones."]
    }
  ]
};
