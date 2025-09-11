// Datos de las unidades
const unitsData = [
    {
        number: 1,
        title: "Fundamentos de Visualización",
        description: "Introducción a los conceptos básicos de visualización de datos y herramientas fundamentales."
    },
    {
        number: 2,
        title: "Análisis Estadístico",
        description: "Métodos estadísticos aplicados a la visualización y análisis de conjuntos de datos complejos."
    },
    {
        number: 3,
        title: "Visualización Interactiva",
        description: "Creación de dashboards interactivos y visualizaciones dinámicas con tecnologías web modernas."
    },
    {
        number: 4,
        title: "Machine Learning Visual",
        description: "Aplicación de algoritmos de aprendizaje automático con énfasis en la interpretación visual."
    },
    {
        number: 5,
        title: "Big Data Analytics",
        description: "Procesamiento y visualización de grandes volúmenes de datos usando herramientas especializadas."
    },
    {
        number: 6,
        title: "Proyecto Final",
        description: "Integración de todos los conocimientos en un proyecto comprensivo de análisis y visualización."
    }
];

// Elementos del DOM
const unitsContainer = document.getElementById('unitsContainer');
const loading = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Simular carga inicial
    setTimeout(() => {
        loading.classList.add('hidden');
        generateUnits();
    }, 1500);
});

// Generar unidades dinámicamente
function generateUnits() {
    unitsContainer.innerHTML = '';
    
    unitsData.forEach((unit, index) => {
        const unitCard = createUnitCard(unit, index);
        unitsContainer.appendChild(unitCard);
    });
}

// Crear tarjeta de unidad
function createUnitCard(unit, index) {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="unit-header">
            <div class="unit-number">${unit.number}</div>
            <h3 class="unit-title">Unidad ${unit.number}</h3>
            <p class="unit-description">${unit.description}</p>
        </div>
        <div class="unit-buttons">
            <button class="btn btn-project" onclick="openModal('proyecto', ${unit.number})">
                <i class="fas fa-code"></i>
                Proyecto Unidad ${unit.number}
            </button>
            <button class="btn btn-portfolio" onclick="openModal('portafolio', ${unit.number})">
                <i class="fas fa-folder"></i>
                Portafolio Unidad ${unit.number}
            </button>
        </div>
    `;
    
    return card;
}

// Abrir modal
function openModal(type, unitNumber) {
    const unit = unitsData.find(u => u.number === unitNumber);
    
    modalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} - Unidad ${unitNumber}`;
    
    if (type === 'proyecto') {
        modalContent.innerHTML = `
            <h4>Proyecto de la Unidad ${unitNumber}</h4>
            <p><strong>Tema:</strong> ${unit.title}</p>
            <p><strong>Descripción:</strong> ${unit.description}</p>
            <br>
            <p>En este proyecto trabajarás con:</p>
            <ul>
                <li>Análisis de datos específicos de la unidad</li>
                <li>Implementación de algoritmos relevantes</li>
                <li>Creación de visualizaciones interactivas</li>
                <li>Documentación técnica completa</li>
            </ul>
            <br>
            <p><strong>Estado:</strong> <span style="color: var(--accent-color);">Disponible</span></p>
        `;
    } else {
        modalContent.innerHTML = `
            <h4>Portafolio de la Unidad ${unitNumber}</h4>
            <p><strong>Tema:</strong> ${unit.title}</p>
            <p><strong>Descripción:</strong> ${unit.description}</p>
            <br>
            <p>El portafolio incluye:</p>
            <ul>
                <li>Ejercicios prácticos realizados</li>
                <li>Reflexiones y aprendizajes</li>
                <li>Recursos adicionales consultados</li>
                <li>Autoevaluación del progreso</li>
            </ul>
            <br>
            <p><strong>Estado:</strong> <span style="color: var(--primary-color);">En progreso</span></p>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Efectos adicionales
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.unit-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${xPercent}% ${yPercent}%, 
                rgba(102, 126, 234, 0.1) 0%, 
                var(--card-bg) 50%)
            `;
        } else {
            card.style.background = 'var(--card-bg)';
        }
    });
});

// Animación de entrada progresiva
function animateOnScroll() {
    const cards = document.querySelectorAll('.unit-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Ejecutar animaciones cuando el contenido esté listo
setTimeout(animateOnScroll, 1600);