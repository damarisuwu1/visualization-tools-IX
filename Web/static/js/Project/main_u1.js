// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Proyecto Unidad 1 - Página cargada');
    
    // Animación de entrada progresiva
    animateElements();
    
    // Efectos de hover para los elementos de detalle
    addHoverEffects();
});

// Función para animar elementos al cargar
function animateElements() {
    const constructionContainer = document.querySelector('.construction-container');
    const detailItems = document.querySelectorAll('.detail-item');
    
    // Animar container principal
    if (constructionContainer) {
        constructionContainer.style.opacity = '0';
        constructionContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            constructionContainer.style.transition = 'all 0.8s ease-out';
            constructionContainer.style.opacity = '1';
            constructionContainer.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animar elementos de detalle con delay
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 800 + (index * 200));
    });
}

// Función para agregar efectos de hover
function addHoverEffects() {
    const detailItems = document.querySelectorAll('.detail-item');
    
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para manejar la navegación
function handleNavigation() {
    const backButton = document.querySelector('.btn-back');
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Opcional: agregar efecto de transición antes de navegar
            e.preventDefault();
            
            // Pequeña animación antes de navegar
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0.8';
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 200);
        });
    }
}

// Ejecutar funciones adicionales
handleNavigation();

// Efecto de partículas simples (opcional)
function createFloatingElements() {
    const container = document.querySelector('.construction-container');
    
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = '4px';
        element.style.height = '4px';
        element.style.background = 'var(--primary-color)';
        element.style.borderRadius = '50%';
        element.style.opacity = '0.3';
        element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 2}s`;
        
        // Posicionar aleatoriamente
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        
        if (container) {
            container.appendChild(element);
        }
    }
}

// CSS para la animación de flotación (se agrega dinámicamente)
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(floatStyle);

// Ejecutar efecto de elementos flotantes después de un delay
setTimeout(createFloatingElements, 1500);

// Mensaje de consola para desarrollo
console.log('Proyecto Unidad 1 - Fundamentos de Visualización - En construcción 🚧');