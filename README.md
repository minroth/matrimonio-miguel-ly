# Ly & Miguel — Invitación web

Sitio estático (HTML + CSS + JS puro, sin frameworks ni build). Pensado para
subir tal cual a GitHub Pages.

## Estructura

```
index.html        estructura de la página (no necesitas tocarla normalmente)
css/style.css      estilos
js/config.js        TODO el contenido editable (textos, fecha, lugar, banco, etc.)
js/script.js        lógica (arma la página a partir de config.js)
img/pareja.jpg       ilustración recortada de tu invitación
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `ly-y-miguel`).
2. Sube el **contenido** de esta carpeta `boda/` a la raíz del repositorio
   (no subas la carpeta `boda` en sí, sino lo que hay adentro: `index.html`,
   `css/`, `js/`, `img/`).
3. En el repositorio: **Settings → Pages → Source** elige la rama `main` y
   carpeta `/ (root)`. Guarda.
4. En 1–2 minutos tu web quedará publicada en
   `https://tu-usuario.github.io/ly-y-miguel/`.

También puedes arrastrar la carpeta a [Netlify Drop](https://app.netlify.com/drop)
o Vercel si prefieres otro link.

## Editar el contenido

Abre **`js/config.js`**. Ahí está todo:

- `novios`, `mensaje`, `fecha`, `lugar`
- `dressCode` (textos y la paleta de colores tocable)
- `regalo` (texto, datos bancarios, sorteo)
- `transporte` (formulario de Google + lista de vehículos protegida por clave — ver abajo)
- `rsvp` (confirmación de asistencia por WhatsApp y/o correo — si dejas ambos
  vacíos, esa sección se oculta sola)
- `cierre`

Cada campo tiene un comentario explicando qué es. Guarda el archivo y
recarga la página: no hace falta compilar nada.

### Fecha y hora

```js
fecha: { iso: "2026-10-03T17:30:00-03:00", duracionHoras: 6 }
```
`-03:00` es el horario de verano en Chile (el que rige en octubre). La
cuenta regresiva y el botón de Google Calendar se generan solos desde este
valor.

### Confirmación de asistencia (RSVP)

Es 100% estática: arma un mensaje con los datos del formulario y lo manda
por WhatsApp (`wa.me`) o por `mailto:`, así que no necesitas backend ni
Google Forms. Configura al menos uno:

```js
rsvp: { activo: true, whatsapp: "56912345678", email: "" , ... }
```

Si quieres además guardar las respuestas en una planilla, lo más simple es
reemplazar esos dos botones por un formulario de Google Forms embebido, o
conectar un servicio como Formspree — pídemelo y lo agrego.

## Transporte (información privada)

La sección **Transporte** tiene dos partes:

1. Un botón que abre tu formulario de Google (para que quien necesite
   transporte avise).
2. Una lista de "quién va en qué vehículo" que **no es pública**: está
   cifrada de verdad (AES-256, con una clave) dentro de `js/config.js`, así
   que aunque alguien mire el código fuente de la página no puede leer los
   nombres ni las direcciones — solo se descifra en el navegador de quien
   escribe la clave correcta.

La clave actual es **`IslaDeMaipo2026`**. Compártela por WhatsApp solo con
quienes van al matrimonio.

### Cambiar la clave o la lista de pasajeros

No edites el bloque `cifrado` a mano — es datos cifrados, no texto. Para
generarlo de nuevo:

1. Abre `admin-encrypt.html` con doble clic (se abre en tu navegador, no
   necesita internet ni servidor).
2. Escribe la clave que quieras usar y pega la lista de pasajeros en el
   formato JSON que trae de ejemplo (un bloque `{ }` por persona, con
   `nombre`, `nota` — el auto o referencia, puede ir vacío —, `vehiculo` y
   `saleDesde`. No incluye dirección a propósito, por privacidad).
3. Presiona **Generar** y copia el bloque que aparece abajo.
4. Pégalo en `js/config.js`, reemplazando el `cifrado: { ... }` que está
   dentro de `transporte.privado`.
5. Guarda y vuelve a subir `js/config.js` a GitHub (o donde tengas el sitio).

Todo ese proceso ocurre solo en tu navegador — nada se envía a ningún
servidor.

## Agregar secciones nuevas

Al final de `js/config.js` hay un arreglo `extras`. Ya viene con cuatro
ejemplos desactivados (`activo: false`): **Programa** (cronograma),
**Preguntas frecuentes**, **Galería de fotos** y **Dónde alojar** (texto
libre). Para mostrarlos:

1. Cambia `activo: false` a `activo: true`.
2. Completa los textos.
3. Para la galería, copia tus fotos a `img/` y agrégalas en `fotos: [ { src: "img/foto1.jpg", alt: "..." } ]`.

Puedes duplicar cualquiera de esos bloques para agregar más secciones del
mismo tipo (por ejemplo, dos cronogramas o dos FAQ distintas), cambiando su
`id` para que sea único.

## Notas de diseño

- Cada sección se ve como una hoja de papel suelta, con el mismo borde
  irregular y ramas botánicas de la invitación original (dibujadas en SVG,
  no son imágenes, así que se adaptan a cualquier alto de contenido).
- Tipografía Alegreya / Alegreya SC (Google Fonts), la misma familia serif
  itálica de tu invitación.
- Totalmente responsivo, con foco de teclado visible y `prefers-reduced-motion`
  respetado.
- No usa ninguna librería externa aparte de la fuente de Google Fonts, así
  que funciona sin conexión salvo por la tipografía y el mapa embebido.
