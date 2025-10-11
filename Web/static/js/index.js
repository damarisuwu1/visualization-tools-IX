/**
 * Visualization Tools IX - JavaScript Refactored
 * Enhanced architecture with route management from HTML
 */

// Route configuration (read from HTML)
let routeConfig = {};

// Units data (Unit 1 and Unit 2 active)
const unitsData = [
    {
        number: 1,
        title: "Visualization Fundamentals",
        description: "Introduction to basic concepts of data visualization and fundamental tools for effective visual analysis.",
        projectEnabled: true,
        portfolioEnabled: true
    },
    {
        number: 2,
        title: "Statistical Analysis",
        description: "Statistical methods applied to visualization and analysis of complex datasets.",
        projectEnabled: false,  // Project deshabilitado temporalmente
        portfolioEnabled: true
    }
];

// DOM elements
const unitsContainer = document.getElementById('unitsContainer');
const loading = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

// Navigation state management
let isNavigating = false;
let navigationTimeout = null;

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load route configuration from HTML
    loadRouteConfig();
    
    // Simulate initial loading with enhanced animation
    setTimeout(() => {
        loading.classList.add('hidden');
        generateUnits();
        initializeAnimations();
    }, 1800);
    
    // Initialize navigation error handling
    initializeNavigationErrorHandling();
});

/**
 * Load route configuration from HTML data attributes
 */
function loadRouteConfig() {
    const routeConfigElement = document.getElementById('route-config');
    if (routeConfigElement) {
        routeConfig = {
            projectBase: routeConfigElement.dataset.projectBase,
            portfolioBase: routeConfigElement.dataset.portfolioBase
        };
    }
    
    console.log('Routes loaded:', routeConfig);
}

/**
 * Initialize navigation error handling
 */
function initializeNavigationErrorHandling() {
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        if (isNavigating) {
            resetNavigationState();
        }
    });
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && isNavigating) {
            resetNavigationState();
        }
    });
    
    // Handle beforeunload to clean up navigation state
    window.addEventListener('beforeunload', function() {
        resetNavigationState();
    });
}

/**
 * Reset navigation state
 */
function resetNavigationState() {
    isNavigating = false;
    if (navigationTimeout) {
        clearTimeout(navigationTimeout);
        navigationTimeout = null;
    }
    
    // Remove any loading overlays
    const existingOverlays = document.querySelectorAll('.navigation-overlay');
    existingOverlays.forEach(overlay => overlay.remove());
}

/**
 * Dynamically generate unit cards
 */
function generateUnits() {
    unitsContainer.innerHTML = '';
    
    unitsData.forEach((unit, index) => {
        const unitCard = createUnitCard(unit, index);
        unitsContainer.appendChild(unitCard);
    });
}

/**
 * Create an individual unit card
 */
function createUnitCard(unit, index) {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.style.animationDelay = `${index * 0.15}s`;
    
    card.innerHTML = `
        <div class="unit-header">
            <div class="unit-number">${unit.number}</div>
            <h3 class="unit-title">Unit ${unit.number}</h3>
            <h4 style="color: var(--blue-primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">${unit.title}</h4>
            <p class="unit-description">${unit.description}</p>
        </div>
        <div class="unit-buttons">
            <button class="btn btn-project" onclick="navigateToProject(${unit.number})" 
                    title="Access unit ${unit.number} project">
                <i class="ti ti-code"></i>
                Project
            </button>
            <button class="btn btn-portfolio" onclick="navigateToPortfolio(${unit.number})"
                    title="View unit ${unit.number} portfolio">
                <i class="ti ti-folder"></i>
                Portfolio
            </button>
        </div>
    `;
    
    return card;
}

/**
 * Navigate to project - FIXED to use unit number correctly
 */
function navigateToProject(unitNumber) {
    if (isNavigating) {
        console.log('Navigation already in progress');
        return;
    }
    
    // Construct the correct URL using the unit number
    const url = `/project/unit${unitNumber}`;
    
    console.log(`Navigating to project unit ${unitNumber}:`, url);
    
    // Set navigation state
    isNavigating = true;
    
    // Show visual feedback before navigation
    showNavigationFeedback(`Loading project Unit ${unitNumber}...`);
    
    // Set timeout for navigation
    navigationTimeout = setTimeout(() => {
        try {
            window.location.href = url;
        } catch (error) {
            console.error('Navigation error:', error);
            resetNavigationState();
            showErrorMessage('Navigation failed. Please try again.');
        }
    }, 800);
}

/**
 * Navigate to portfolio - FIXED to use unit number correctly
 */
function navigateToPortfolio(unitNumber) {
    if (isNavigating) {
        console.log('Navigation already in progress');
        return;
    }
    
    // Construct the correct URL using the unit number
    const url = `/portfolio/unit${unitNumber}`;
    
    console.log(`Navigating to portfolio unit ${unitNumber}:`, url);
    
    // Set navigation state
    isNavigating = true;
    
    // Show visual feedback before navigation
    showNavigationFeedback(`Loading portfolio Unit ${unitNumber}...`);
    
    // Set timeout for navigation
    navigationTimeout = setTimeout(() => {
        try {
            window.location.href = url;
        } catch (error) {
            console.error('Navigation error:', error);
            resetNavigationState();
            showErrorMessage('Navigation failed. Please try again.');
        }
    }, 800);
}

/**
 * Show visual feedback during navigation
 */
function showNavigationFeedback(message) {
    // Remove any existing overlays
    const existingOverlays = document.querySelectorAll('.navigation-overlay');
    existingOverlays.forEach(overlay => overlay.remove());
    
    // Create temporary overlay
    const overlay = document.createElement('div');
    overlay.className = 'navigation-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 40px; height: 40px; border: 3px solid var(--gray-200); border-left: 3px solid var(--blue-primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
            <p style="color: var(--gray-700); font-weight: 500;">${message}</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate entrance
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const errorOverlay = document.createElement('div');
    errorOverlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
        z-index: 10001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    errorOverlay.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="ti ti-alert-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorOverlay);
    
    // Animate entrance
    requestAnimationFrame(() => {
        errorOverlay.style.opacity = '1';
        errorOverlay.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        errorOverlay.style.opacity = '0';
        errorOverlay.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (errorOverlay.parentNode) {
                errorOverlay.parentNode.removeChild(errorOverlay);
            }
        }, 300);
    }, 4000);
}

/**
 * Close modal
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Initialize animations and visual effects
 */
function initializeAnimations() {
    animateOnScroll();
    initializeMouseEffects();
    initializeGlassmorphismEffects();
}

/**
 * Mouse effects for cards
 */
function initializeMouseEffects() {
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
                    rgba(37, 99, 235, 0.08) 0%, 
                    var(--glass-bg) 40%)
                `;
                
                const tiltX = (yPercent - 50) / 20;
                const tiltY = (50 - xPercent) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px)`;
            } else {
                card.style.background = 'var(--glass-bg)';
                card.style.transform = '';
            }
        });
    });
    
    document.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.unit-card');
        cards.forEach(card => {
            card.style.background = 'var(--glass-bg)';
            card.style.transform = '';
        });
    });
}

/**
 * Dynamic glassmorphism effects
 */
function initializeGlassmorphismEffects() {
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        let breatheDirection = 1;
        let breatheIntensity = 0;
        
        setInterval(() => {
            breatheIntensity += 0.005 * breatheDirection;
            
            if (breatheIntensity >= 0.05) breatheDirection = -1;
            if (breatheIntensity <= 0) breatheDirection = 1;
            
            const baseOpacity = 0.18;
            const newOpacity = baseOpacity + breatheIntensity;
            
            headerContent.style.background = `rgba(255, 255, 255, ${newOpacity})`;
        }, 50);
    }
}

/**
 * Progressive entrance animation based on scroll
 */
function animateOnScroll() {
    const cards = document.querySelectorAll('.unit-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Main event listeners
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

// Global error handling
window.addEventListener('error', function(e) {
    console.warn('Error in Visualization Tools IX:', e.error);
    
    if (e.error && e.error.message.includes('navigation')) {
        showNavigationFeedback('Redirecting...');
    }
});

/**
 * Debug utility for development
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.VisualizationToolsDebug = {
        routeConfig,
        unitsData,
        navigateToProject,
        navigateToPortfolio,
        resetNavigationState
    };
    
    console.log('🔧 Visualization Tools IX - Debug Mode Activated');
    console.log('Available units:', unitsData.map(u => `Unit ${u.number}`).join(', '));
}