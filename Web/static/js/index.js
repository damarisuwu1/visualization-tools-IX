/**
 * Visualization Tools IX - JavaScript Refactored
 * Enhanced architecture with route management from HTML
 */

// Route configuration (read from HTML)
let routeConfig = {};

// Units data (Only Unit 1 active)
const unitsData = [
    {
        number: 1,
        title: "Visualization Fundamentals",
        description: "Introduction to basic concepts of data visualization and fundamental tools for effective visual analysis."
    }
    // Other units commented to show only Unit 1
    /*
    {
        number: 2,
        title: "Statistical Analysis",
        description: "Statistical methods applied to visualization and analysis of complex datasets."
    },
    {
        number: 3,
        title: "Interactive Visualization", 
        description: "Creating interactive dashboards and dynamic visualizations with modern web technologies."
    },
    {
        number: 4,
        title: "Visual Machine Learning",
        description: "Application of machine learning algorithms with emphasis on visual interpretation."
    },
    {
        number: 5,
        title: "Big Data Analytics",
        description: "Processing and visualization of large data volumes using specialized tools."
    },
    {
        number: 6,
        title: "Final Project",
        description: "Integration of all knowledge in a comprehensive analysis and visualization project."
    }
    */
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
            // Since we only have Unit 1, use specific routes
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
            // Reset navigation state if user goes back
            resetNavigationState();
        }
    });
    
    // Handle page visibility change (when user comes back from another tab)
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
 * @param {Object} unit - Unit data
 * @param {number} index - Index for staggered animation
 * @returns {HTMLElement} - Card element
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
 * Navigate to project using HTML route configuration
 * @param {number} unitNumber - Unit number
 */
function navigateToProject(unitNumber) {
    if (isNavigating) {
        console.log('Navigation already in progress');
        return;
    }
    
    const url = routeConfig.projectBase;
    
    if (!url) {
        console.error('Project URL not configured');
        showErrorMessage('Navigation error: Project URL not found');
        return;
    }
    
    // Set navigation state
    isNavigating = true;
    
    // Show visual feedback before navigation
    showNavigationFeedback('Loading project...');
    
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
 * Navigate to portfolio using HTML route configuration
 * @param {number} unitNumber - Unit number
 */
function navigateToPortfolio(unitNumber) {
    if (isNavigating) {
        console.log('Navigation already in progress');
        return;
    }
    
    const url = routeConfig.portfolioBase;
    
    if (!url) {
        console.error('Portfolio URL not configured');
        showErrorMessage('Navigation error: Portfolio URL not found');
        return;
    }
    
    // Set navigation state
    isNavigating = true;
    
    // Show visual feedback before navigation
    showNavigationFeedback('Loading portfolio...');
    
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
 * @param {string} message - Message to display
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
 * @param {string} message - Error message to display
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
 * Legacy function to open modal (maintains compatibility)
 * @param {string} type - Modal type (project/portfolio)
 * @param {number} unitNumber - Unit number
 */
function openModal(type, unitNumber) {
    const unit = unitsData.find(u => u.number === unitNumber);
    if (!unit) return;
    
    modalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} - Unit ${unitNumber}`;
    
    if (type === 'project') {
        modalContent.innerHTML = createProjectModalContent(unit, unitNumber);
    } else {
        modalContent.innerHTML = createPortfolioModalContent(unit, unitNumber);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Create project modal content
 * @param {Object} unit - Unit data
 * @param {number} unitNumber - Unit number
 * @returns {string} - Content HTML
 */
function createProjectModalContent(unit, unitNumber) {
    return `
        <h4>${unit.title}</h4>
        <p><strong>Description:</strong> ${unit.description}</p>
        <br>
        <p>This project includes:</p>
        <ul>
            <li>Exploratory analysis of specific data</li>
            <li>Implementation of visualization techniques</li>
            <li>Development of interactive graphics</li>
            <li>Complete technical documentation</li>
            <li>Evaluation of results and conclusions</li>
        </ul>
        <br>
        <p><strong>Status:</strong> <span style="color: var(--accent-teal); font-weight: 600;">Available</span></p>
        <br>
        <button onclick="navigateToProject(${unitNumber}); closeModal();">
            <i class="ti ti-arrow-right" style="margin-right: 8px;"></i>
            Access Project
        </button>
    `;
}

/**
 * Create portfolio modal content
 * @param {Object} unit - Unit data
 * @param {number} unitNumber - Unit number
 * @returns {string} - Content HTML
 */
function createPortfolioModalContent(unit, unitNumber) {
    return `
        <h4>${unit.title}</h4>
        <p><strong>Description:</strong> ${unit.description}</p>
        <br>
        <p>The portfolio contains:</p>
        <ul>
            <li>Practical exercises developed</li>
            <li>Reflections and critical analysis</li>
            <li>Additional resources consulted</li>
            <li>Progress self-assessment</li>
            <li>Learning evidence</li>
        </ul>
        <br>
        <p><strong>Status:</strong> <span style="color: var(--blue-primary); font-weight: 600;">In development</span></p>
        <br>
        <button onclick="navigateToPortfolio(${unitNumber}); closeModal();" 
                style="background: linear-gradient(135deg, var(--accent-teal), var(--accent-indigo));">
            <i class="ti ti-folder-open" style="margin-right: 8px;"></i>
            View Portfolio
        </button>
    `;
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
    // Progressive entrance animation for cards
    animateOnScroll();
    
    // Subtle mouse parallax effect
    initializeMouseEffects();
    
    // Initialize dynamic glassmorphism effects
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
                
                // Subtle lighting effect
                card.style.background = `
                    radial-gradient(circle at ${xPercent}% ${yPercent}%, 
                    rgba(37, 99, 235, 0.08) 0%, 
                    var(--glass-bg) 40%)
                `;
                
                // Soft tilt effect
                const tiltX = (yPercent - 50) / 20;
                const tiltY = (50 - xPercent) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px)`;
            } else {
                // Restore original state
                card.style.background = 'var(--glass-bg)';
                card.style.transform = '';
            }
        });
    });
    
    // Clear effects when mouse leaves container
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
    // Subtle breathing effect in header
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

/**
 * Enhanced modal experience with advanced effects
 */
function enhanceModalExperience() {
    // Progressive blur effect when opening modal
    modal.addEventListener('transitionstart', function() {
        if (modal.classList.contains('active')) {
            document.body.style.filter = 'blur(0px)';
            setTimeout(() => {
                document.body.style.filter = 'blur(2px)';
            }, 100);
        }
    });
    
    // Restore blur when closing
    modal.addEventListener('transitionend', function() {
        if (!modal.classList.contains('active')) {
            document.body.style.filter = 'none';
        }
    });
}

/**
 * Simulated haptic feedback for buttons (vibration on mobile)
 */
function addHapticFeedback() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Vibration on compatible devices
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
            
            // Visual "pulse" effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

/**
 * Performance optimization
 */
function optimizePerformance() {
    // Lazy loading for expensive animations
    let animationsEnabled = true;
    
    // Disable animations if there are performance issues
    if (window.performance && performance.now() > 100) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            animationsEnabled = false;
            document.documentElement.style.setProperty('--transition', 'none');
        }
    }
    
    return animationsEnabled;
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

// Initialize additional enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Execute after units have been generated
    setTimeout(() => {
        enhanceModalExperience();
        addHapticFeedback();
        optimizePerformance();
    }, 2000);
});

// Global error handling
window.addEventListener('error', function(e) {
    console.warn('Error in Visualization Tools IX:', e.error);
    
    // Silent fallback for navigation errors
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
        openModal,
        closeModal,
        resetNavigationState
    };
    
    console.log('🔧 Visualization Tools IX - Debug Mode Activated');
    console.log('Configuration available at: window.VisualizationToolsDebug');
}