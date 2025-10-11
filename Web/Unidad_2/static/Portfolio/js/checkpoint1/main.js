/**
 * Checkpoint 1 - Statistical Foundations
 * Main JavaScript for tab management and content loading
 */

// Application state
const appState = {
    currentSection: 'overview',
    initialized: false,
    themeManager: null
};

/**
 * Initialize application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Checkpoint 1 - Initializing...');
    
    // Initialize tab management
    initializeTabManagement();
    
    // Initialize theme management
    initializeTheme();
    
    // Load content for sections
    loadSectionContent();
    
    appState.initialized = true;
    console.log('✅ Checkpoint 1 initialized successfully');
});

/**
 * Initialize tab management system
 */
function initializeTabManagement() {
    const tabs = document.querySelectorAll('.main-tab');
    const sections = document.querySelectorAll('.content-section');
    
    if (!tabs.length || !sections.length) {
        console.error('❌ Tabs or sections not found');
        return;
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.dataset.section;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update sections
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                appState.currentSection = sectionId;
                
                console.log(`📍 Switched to section: ${sectionId}`);
                
                // Load content if needed
                loadSectionContent(sectionId);
            }
        });
    });
    
    console.log('✅ Tab management initialized');
}

/**
 * Load content for specific section
 * @param {string} sectionId - Section identifier
 */
function loadSectionContent(sectionId = 'overview') {
    switch(sectionId) {
        case 'exercises':
            loadExercisesContent();
            break;
        case 'reflections':
            loadReflectionsContent();
            break;
        case 'resources':
            loadResourcesContent();
            break;
        default:
            // Overview is already loaded in HTML
            break;
    }
}

/**
 * Load exercises content
 */
function loadExercisesContent() {
    const exercisesList = document.querySelector('.exercises-list');
    if (!exercisesList) return;
    
    // Check if already loaded
    if (exercisesList.querySelector('.exercise-item')) {
        return;
    }
    
    const exercises = [
        {
            number: 1,
            title: "Descriptive Statistics Analysis",
            description: "Calculate and visualize mean, median, mode, and standard deviation for a given dataset.",
            status: "completed",
            difficulty: "Beginner"
        },
        {
            number: 2,
            title: "Data Distribution Visualization",
            description: "Create histograms and box plots to understand data distribution patterns.",
            status: "completed",
            difficulty: "Beginner"
        },
        {
            number: 3,
            title: "Correlation Matrix",
            description: "Build correlation matrices and heatmaps to identify relationships between variables.",
            status: "completed",
            difficulty: "Intermediate"
        },
        {
            number: 4,
            title: "Hypothesis Testing",
            description: "Perform t-tests and chi-square tests with visual interpretation of results.",
            status: "completed",
            difficulty: "Intermediate"
        },
        {
            number: 5,
            title: "Probability Distributions",
            description: "Model and visualize normal, binomial, and Poisson distributions.",
            status: "completed",
            difficulty: "Intermediate"
        },
        {
            number: 6,
            title: "Statistical Inference",
            description: "Calculate confidence intervals and perform statistical inference analysis.",
            status: "completed",
            difficulty: "Advanced"
        },
        {
            number: 7,
            title: "ANOVA Analysis",
            description: "Conduct analysis of variance (ANOVA) for multiple groups comparison.",
            status: "completed",
            difficulty: "Advanced"
        },
        {
            number: 8,
            title: "Regression Analysis",
            description: "Build linear regression models and interpret statistical significance.",
            status: "completed",
            difficulty: "Advanced"
        }
    ];
    
    exercisesList.innerHTML = exercises.map((exercise, index) => `
        <div class="exercise-item" style="animation-delay: ${index * 0.1}s;">
            <div class="exercise-header">
                <div class="exercise-number">
                    <span>${exercise.number}</span>
                </div>
                <div class="exercise-info">
                    <h3>${exercise.title}</h3>
                    <p>${exercise.description}</p>
                </div>
            </div>
            <div class="exercise-footer">
                <span class="difficulty-badge ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                <span class="status-badge ${exercise.status}">
                    <i class="ti ti-circle-check"></i>
                    ${exercise.status}
                </span>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Exercises content loaded');
}

/**
 * Load reflections content
 */
function loadReflectionsContent() {
    const reflectionsContainer = document.querySelector('.reflections-container');
    if (!reflectionsContainer) return;
    
    // Check if already loaded
    if (reflectionsContainer.querySelector('.reflection-item')) {
        return;
    }
    
    const reflections = [
        {
            title: "Understanding Statistical Concepts",
            date: "2024-10-08",
            content: "Working through descriptive statistics has given me a solid foundation in understanding data patterns. The visualization of distributions really helped clarify abstract concepts.",
            tags: ["Statistics", "Learning"]
        },
        {
            title: "Challenges with Hypothesis Testing",
            date: "2024-10-12",
            content: "Initially struggled with p-values and significance levels, but through practice and visualization, I now understand how to interpret statistical tests in real-world contexts.",
            tags: ["Challenges", "Growth"]
        },
        {
            title: "Practical Applications",
            date: "2024-10-15",
            content: "The most valuable learning was seeing how statistical methods apply to real datasets. Being able to derive meaningful insights from raw data is incredibly rewarding.",
            tags: ["Application", "Insights"]
        }
    ];
    
    reflectionsContainer.innerHTML = reflections.map((reflection, index) => `
        <div class="reflection-item" style="animation-delay: ${index * 0.15}s;">
            <div class="reflection-header">
                <h3>${reflection.title}</h3>
                <span class="reflection-date">
                    <i class="ti ti-calendar"></i>
                    ${formatDate(reflection.date)}
                </span>
            </div>
            <div class="reflection-content">
                <p>${reflection.content}</p>
            </div>
            <div class="reflection-tags">
                ${reflection.tags.map(tag => `<span class="reflection-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Reflections content loaded');
}

/**
 * Load resources content
 */
function loadResourcesContent() {
    const resourcesGrid = document.querySelector('.resources-grid');
    if (!resourcesGrid) return;
    
    // Check if already loaded
    if (resourcesGrid.querySelector('.resource-item')) {
        return;
    }
    
    const resources = [
        {
            title: "Introduction to Statistical Learning",
            type: "Book",
            author: "James, Witten, Hastie, Tibshirani",
            icon: "ti-book",
            description: "Comprehensive guide to statistical learning methods with R examples."
        },
        {
            title: "Statistics for Data Science",
            type: "Online Course",
            author: "Coursera",
            icon: "ti-school",
            description: "Interactive course covering fundamental statistical concepts."
        },
        {
            title: "Matplotlib Documentation",
            type: "Documentation",
            author: "Matplotlib Team",
            icon: "ti-file-text",
            description: "Official documentation for creating statistical visualizations."
        },
        {
            title: "Statistical Thinking Blog",
            type: "Blog",
            author: "Various Authors",
            icon: "ti-article",
            description: "Collection of articles on practical statistical applications."
        },
        {
            title: "Khan Academy Statistics",
            type: "Video Series",
            author: "Khan Academy",
            icon: "ti-video",
            description: "Free video tutorials on statistics and probability."
        },
        {
            title: "Python Statistics Library",
            type: "Library",
            author: "Python Software Foundation",
            icon: "ti-code",
            description: "Built-in Python library for statistical computations."
        }
    ];
    
    resourcesGrid.innerHTML = resources.map((resource, index) => `
        <div class="resource-item" style="animation-delay: ${index * 0.1}s;">
            <div class="resource-icon">
                <i class="ti ${resource.icon}"></i>
            </div>
            <div class="resource-content">
                <span class="resource-type">${resource.type}</span>
                <h3>${resource.title}</h3>
                <p class="resource-author">${resource.author}</p>
                <p class="resource-description">${resource.description}</p>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Resources content loaded');
}

/**
 * Format date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Initialize theme management
 */
function initializeTheme() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    // Check for saved theme or default to light
    const currentTheme = localStorage.getItem('checkpoint-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('checkpoint-theme', newTheme);
        updateThemeButton(newTheme);
        
        console.log(`🎨 Theme changed to: ${newTheme}`);
    });
    
    console.log('✅ Theme management initialized');
}

/**
 * Update theme button appearance
 * @param {string} theme - Current theme
 */
function updateThemeButton(theme) {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const themeText = themeToggle.querySelector('.theme-text');
    const themeIcon = themeToggle.querySelector('.theme-icon svg');
    
    if (theme === 'dark') {
        if (themeText) themeText.textContent = 'Dark Mode';
        if (themeIcon) {
            themeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        }
    } else {
        if (themeText) themeText.textContent = 'Light Mode';
        if (themeIcon) {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>';
        }
    }
}

// Add dynamic styles for loaded content
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Exercise Items */
    .exercise-item {
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--border-radius);
        padding: 24px;
        margin-bottom: 20px;
        transition: var(--transition);
        animation: slideInUp 0.5s ease-out backwards;
    }
    
    .exercise-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
        border-color: var(--portfolio-light);
    }
    
    .exercise-header {
        display: flex;
        gap: 20px;
        margin-bottom: 16px;
    }
    
    .exercise-number {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--portfolio-primary), var(--portfolio-secondary));
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 700;
        box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
    }
    
    .exercise-info h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--gray-900);
        margin-bottom: 8px;
    }
    
    .exercise-info p {
        color: var(--gray-600);
        font-size: 0.95rem;
        line-height: 1.6;
    }
    
    .exercise-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid var(--gray-200);
    }
    
    .difficulty-badge {
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .difficulty-badge.beginner {
        background: rgba(16, 185, 129, 0.1);
        color: var(--status-success);
    }
    
    .difficulty-badge.intermediate {
        background: rgba(245, 158, 11, 0.1);
        color: var(--status-warning);
    }
    
    .difficulty-badge.advanced {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }
    
    .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        background: rgba(16, 185, 129, 0.1);
        color: var(--status-success);
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: capitalize;
    }
    
    /* Reflection Items */
    .reflection-item {
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--border-radius);
        padding: 30px;
        margin-bottom: 24px;
        animation: slideInUp 0.5s ease-out backwards;
    }
    
    .reflection-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        flex-wrap: wrap;
        gap: 12px;
    }
    
    .reflection-header h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--gray-900);
    }
    
    .reflection-date {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--gray-500);
        font-size: 0.875rem;
    }
    
    .reflection-content p {
        color: var(--gray-700);
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 16px;
    }
    
    .reflection-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
    }
    
    .reflection-tag {
        padding: 4px 12px;
        background: rgba(139, 92, 246, 0.1);
        color: var(--portfolio-primary);
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid rgba(139, 92, 246, 0.2);
    }
    
    /* Resource Items */
    .resource-item {
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--border-radius);
        padding: 24px;
        transition: var(--transition);
        animation: slideInUp 0.5s ease-out backwards;
    }
    
    .resource-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
        border-color: var(--portfolio-light);
    }
    
    .resource-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--portfolio-primary), var(--portfolio-secondary));
        border-radius: 12px;
        color: white;
        font-size: 1.5rem;
        margin-bottom: 16px;
        box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
    }
    
    .resource-type {
        display: inline-block;
        padding: 4px 10px;
        background: rgba(139, 92, 246, 0.1);
        color: var(--portfolio-primary);
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
    }
    
    .resource-content h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--gray-900);
        margin-bottom: 8px;
    }
    
    .resource-author {
        color: var(--gray-500);
        font-size: 0.875rem;
        margin-bottom: 12px;
    }
    
    .resource-description {
        color: var(--gray-600);
        font-size: 0.95rem;
        line-height: 1.6;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .exercise-header {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .exercise-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
        }
        
        .reflection-header {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;
document.head.appendChild(dynamicStyles);

// Global error handling
window.addEventListener('error', (e) => {
    console.error('⚠️ Global error:', e.error);
});

// Make functions globally available for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.CheckpointDebug = {
        appState,
        loadExercisesContent,
        loadReflectionsContent,
        loadResourcesContent,
        version: '1.0.0'
    };
    
    console.log('🔧 Checkpoint Debug Mode Active');
    console.log('Access debug tools: window.CheckpointDebug');
}

console.log('📦 Checkpoint 1 - Main script loaded');