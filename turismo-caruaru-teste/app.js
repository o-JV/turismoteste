/* =========================================
   ANIMAÇÃO DE SCROLL
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Seleciona elementos paraAnimar
document.querySelectorAll('.fade-in-down, .reveal').forEach(el => {
    observer.observe(el);
});


/* =========================================
   DADOS
   ========================================= */
const eventos = [
    {
        nome: "São João de Caruaru",
        data: "20/06 a 30/06",
        local: "Pátio de Eventos",
        desc: "O maior São João do mundo com forró e quadrilha!"
    },
    {
        nome: "Feira de Artesanato",
        data: "Todos os Domingos",
        local: "Alto do Moura",
        desc: "Artesanato local e regional com peças únicas."
    },
    {
        nome: "Festival de Forró",
        data: "15/08/2026",
        local: "Parque Show Carole",
        desc: "Grandes artistas do forró universitário."
    }
];

// Coordenadas Reais de Caruaru
const pontos = [
    {
        nome: "Alto do Moura",
        descricao: "Berço do artesão Vitalino.",
        lat: -8.2950, lng: -35.9730
    },
    {
        nome: "Museu do Barro",
        descricao: "História da cerâmica.",
        lat: -8.2825, lng: -35.9780
    },
    {
        nome: "Estação Ferroviária",
        descricao: "Patrimônio histórico de Caruaru.",
        lat: -8.2800, lng: -35.9650
    },
    {
        nome: "Parque Ambiental",
        descricao: "Parque de diversões e natureza.",
        lat: -8.2700, lng: -35.9850
    }
];


/* =========================================
   MAPA INTERATIVO
   ========================================= */
const map = L.map('map').setView([-8.282, -35.975], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const markers = [];

pontos.forEach((ponto, index) => {
    const marker = L.marker([ponto.lat, ponto.lng]).addTo(map);
    marker.bindPopup(`<b>${ponto.nome}</b><br><span>${ponto.descricao}</span>`);
    markers.push(marker);
});


/* =========================================
   RENDERIZAÇÃO DOS PONTOS
   ========================================= */
const listaPontos = document.getElementById("listaPontos");

pontos.forEach((ponto, index) => {
    listaPontos.innerHTML += `
        <div class="card" onclick="waypoint(${index})">
            <h3>${ponto.nome}</h3>
            <p>${ponto.descricao}</p>
            <p style="color: var(--primary); font-weight:600;">
                ➜ Ver no Mapa
            </p>
        </div>
    `;
});

// Função Waypoint (Voar até o ponto)
function waypoint(index) {
    const ponto = pontos[index];
    
    // Animação FlyTo
    map.flyTo([ponto.lat, ponto.lng], 16, { duration: 1.5 });
    
    // Scroll suave
    document.getElementById('mapa').scrollIntoView({ behavior: 'smooth' });
    
    // Abre popup
    setTimeout(() => { markers[index].openPopup(); }, 1500);
}


/* =========================================
   RENDERIZAÇÃO DOS EVENTOS
   ========================================= */
const listaEventos = document.getElementById("listaEventos");

eventos.forEach(evento => {
    listaEventos.innerHTML += `
        <div class="card">
            <h3>${evento.nome}</h3>
            <p>📅 <strong>${evento.data}</strong></p>
            <p>📍 ${evento.local}</p>
            <p style="margin-top: 10px; font-style: italic;">"${evento.desc}"</p>
            <button onclick="alert('Reserva simulada para: ${evento.nome}')">
                Reservar
            </button>
        </div>
    `;
});



const form = document.getElementById("formAvaliacao");
const listaAvaliacoes = document.getElementById("listaAvaliacoes");


window.onload = () => {
    const salvas = JSON.parse(localStorage.getItem('avaliacoesCaruaru')) || [];
    salvas.forEach(av => criarAvaliacao(av.nome, av.comentario));
};


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;
    
    criarAvaliacao(nome, comentario);
    
    const salvas = JSON.parse(localStorage.getItem('avaliacoesCaruaru')) || [];
    salvas.push({ nome, comentario });
    localStorage.setItem('avaliacoesCaruaru', JSON.stringify(salvas));
    
    form.reset();
    alert("Obrigado pela avaliação!");
});

function criarAvaliacao(nome, comentario) {
    const data = new Date().toLocaleDateString('pt-BR');
    
    listaAvaliacoes.innerHTML = `
        <div class="avaliacao">
            <strong>${nome}</strong>
            <small>em ${data}</small>
            <p>${comentario}</p>
        </div>
    ` + listaAvaliacoes.innerHTML;
}