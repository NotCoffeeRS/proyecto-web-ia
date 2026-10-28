# Explorador interactivo de Rick and Morty

Aplicación web que consulta la [Rick and Morty API](https://rickandmortyapi.com/documentation) con `fetch()` y permite buscar, filtrar y guardar personajes favoritos.

**Integrantes:** Cuevas Valdez Vanessa Aneley · Ramos Santos Marcos Martin (4°A, Aplicaciones Web, UTM)

**Aplicación publicada:** (pendiente de activar GitHub Pages)

## Descripción
- Muestra 20 personajes con imagen, especie, género, estado, origen y ubicación.
- Buscador por nombre (con espera de 400 ms para no saturar la API).
- Filtros por estado y género.
- Favoritos guardados en `localStorage` (sección ⭐ Favoritos).
- Mensajes cuando no hay resultados (404 de la API) o falla la consulta.
- Diseño adaptable a celular y computadora (CSS Grid).
- **Funcionalidad extra:** modo oscuro/claro, que recuerda la preferencia en `localStorage`.

## Instrucciones de uso
1. Abrir el enlace de GitHub Pages.
2. Escribir en el buscador o elegir estado/género.
3. Pulsar ☆ en una tarjeta para guardarla; "⭐ Favoritos" muestra solo las guardadas.
4. El botón 🌙/☀️ cambia el tema.
# proyecto-web-ia

## Uso de IA (Claude)
**Tres prompts importantes**
1. "Crea una página con HTML, CSS y JS que consulte la API de Rick and Morty con fetch, muestre 10+ personajes con imagen y descripción, buscador, filtros, favoritos en localStorage y mensajes de error."
2. "Haz que al marcar un favorito la lista se vuelva a pintar sin volver a pedir datos a la API."
3. "Agrega modo oscuro/claro usando variables CSS y explícame cómo funciona."

**Respuesta que requirió correcciones:** la primera versión redefinía la función `mostrar` para recordar la última lista mostrada. Funcionaba pero era confuso; se corrigió guardando esa lista en una variable (`ultimos`) dentro de `mostrar`.

**Error encontrado y cómo se resolvió:** al buscar un nombre inexistente la API responde **404**, y `fetch` no lanza excepción en ese caso, por lo que se veía una lista vacía sin explicación. Se revisa `res.status === 404` para mostrar "No se encontraron resultados", y el `catch` queda para fallos reales de red.

**Modificación que podemos explicar:** el modo oscuro. `body.oscuro` redefine las variables CSS (`--fondo`, `--tarjeta`, `--texto`); `aplicarTema()` agrega/quita esa clase y guarda el valor en `localStorage`.

**Reflexión:** la IA acelera el código base, pero hay que leerlo: los casos límite (404, favoritos al repintar) solo aparecieron al probar. Entender `fetch`, el DOM y `localStorage` fue necesario para corregirla y explicarla.

## Dificultades
- Manejar la respuesta 404 como "sin resultados" y no como error.
- Mantener sincronizados el contador y la vista de favoritos.

## Cómo publicar en GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)` → Save.
