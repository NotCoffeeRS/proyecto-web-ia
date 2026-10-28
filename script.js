const API = "https://rickandmortyapi.com/api/character";
const $ = id => document.getElementById(id);
const lista = $("lista"), mensaje = $("mensaje");
let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
let viendoFavoritos = false;
let ultimos = []; // lo último mostrado, para repintar al marcar favorito

// Pide personajes a la API con los filtros actuales; 404 = sin resultados
async function buscar() {
  viendoFavoritos = false;
  const params = new URLSearchParams({ name: $("buscar").value.trim(), status: $("estado").value, gender: $("genero").value });
  mensaje.textContent = "Cargando...";
  lista.innerHTML = "";
  try {
    const res = await fetch(`${API}?${params}`);
    if (res.status === 404) { mensaje.textContent = "No se encontraron resultados."; return; }
    if (!res.ok) throw new Error(res.status);
    const datos = await res.json();
    mensaje.textContent = `${datos.info.count} personajes encontrados (mostrando ${datos.results.length})`;
    mostrar(datos.results);
  } catch (e) {
    mensaje.textContent = "Error al consultar la API. Revisa tu conexión e intenta de nuevo.";
  }
}

function mostrar(personajes) {
  ultimos = personajes;
  lista.innerHTML = "";
  for (const p of personajes) {
    const esFav = favoritos.some(f => f.id === p.id);
    const el = document.createElement("article");
    el.className = "tarjeta";
    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <button class="fav" type="button" aria-label="Favorito">${esFav ? "⭐" : "☆"}</button>
      <div><h2></h2>
        <p>${p.species} · ${p.gender} · ${p.status}</p>
        <p>Origen: ${p.origin.name}</p>
        <p>Ubicación: ${p.location.name}</p></div>`;
    el.querySelector("h2").textContent = p.name;
    el.querySelector(".fav").onclick = () => alternarFavorito(p);
    lista.append(el);
  }
}

function alternarFavorito(p) {
  favoritos = favoritos.some(f => f.id === p.id) ? favoritos.filter(f => f.id !== p.id) : [...favoritos, p];
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  $("numFav").textContent = favoritos.length;
  if (viendoFavoritos) verFavoritos(); else mostrar(ultimos);
}

function verFavoritos() {
  viendoFavoritos = true;
  mensaje.textContent = favoritos.length ? `Tus favoritos (${favoritos.length})` : "Aún no tienes favoritos.";
  mostrar(favoritos);
}

// Modo oscuro/claro (funcionalidad extra), recordado en localStorage
function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  $("tema").textContent = oscuro ? "☀️" : "🌙";
  localStorage.setItem("oscuro", oscuro);
}

$("controles").addEventListener("submit", e => e.preventDefault());
$("buscar").addEventListener("input", () => { clearTimeout(window.t); window.t = setTimeout(buscar, 400); });
$("estado").onchange = $("genero").onchange = buscar;
$("verFavoritos").onclick = () => viendoFavoritos ? buscar() : verFavoritos();
$("tema").onclick = () => aplicarTema(!document.body.classList.contains("oscuro"));

$("numFav").textContent = favoritos.length;
aplicarTema(localStorage.getItem("oscuro") === "true");
buscar();
