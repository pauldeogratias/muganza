// // DOM Elements
// const sections = document.querySelectorAll('.section');
// const modals = document.querySelectorAll('.modal');
// const backToTopBtn = document.getElementById('backToTop');
// const navToggle = document.querySelector('.nav-toggle');
// const navMenu = document.querySelector('.nav-menu');

// function showModal(modalId) {
//     document.getElementById(modalId).classList.add('active');
//     document.body.style.overflow = 'hidden';
// }

// function closeModal(modalId) {
//     document.getElementById(modalId).classList.remove('active');
//     document.body.style.overflow = 'auto';
// }

// function showMessage(message, type = 'info') {
//     // Remove any existing messages
//     const existingMessages = document.querySelectorAll('.message');
//     existingMessages.forEach(msg => msg.remove());
    
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${type}`;
    
//     let icon = 'fa-info-circle';
//     if (type === 'success') icon = 'fa-check-circle';
//     else if (type === 'error') icon = 'fa-exclamation-circle';
//     else if (type === 'warning') icon = 'fa-exclamation-triangle';
    
//     messageDiv.innerHTML = `
//         <i class="fas ${icon}"></i>
//         <span>${message}</span>
//         <button class="message-close" onclick="this.parentElement.remove()">
//             <i class="fas fa-times"></i>
//         </button>
//     `;
    
//     document.body.appendChild(messageDiv);
    
//     // Auto remove after 5 seconds
//     setTimeout(() => {
//         if (messageDiv.parentElement) {
//             messageDiv.classList.add('fade-out');
//             setTimeout(() => {
//                 if (messageDiv.parentElement) {
//                     messageDiv.remove();
//                 }
//             }, 300);
//         }
//     }, 5000);
// }

// function showLoading(message = 'Inapakia...') {
//     // Remove any existing loader
//     hideLoading();
    
//     const loader = document.createElement('div');
//     loader.className = 'fullscreen-loader';
//     loader.innerHTML = `
//         <div class="loader-content">
//             <div class="spinner"></div>
//             <p>${message}</p>
//         </div>
//     `;
//     document.body.appendChild(loader);
//     document.body.style.overflow = 'hidden';
// }

// function hideLoading() {
//     const loader = document.querySelector('.fullscreen-loader');
//     if (loader) {
//         loader.remove();
//         document.body.style.overflow = 'auto';
//     }
// }

// function showLoadingState(container, message = 'Inapakia...') {
//     container.innerHTML = `
//         <div class="loading-state">
//             <div class="spinner"></div>
//             <p>${message}</p>
//         </div>
//     `;
// }

// // Export all UI functions
// export function showError(container, message) {
//     container.innerHTML = `
//         <div class="error-message">
//             <i class="fas fa-exclamation-circle"></i>
//             <p>${message}</p>
//             <button class="btn btn-secondary" onclick="location.reload()">
//                 <i class="fas fa-refresh"></i> Jaribu Tena
//             </button>
//         </div>
//     `;
// }

// export function showSection(sectionId, loadCallback = null) {
//     sections.forEach(section => {
//         section.classList.remove('active');
//     });
    
//     const targetSection = document.getElementById(sectionId);
//     if (targetSection) {
//         targetSection.classList.add('active');
        
//         if (loadCallback) {
//             loadCallback();
//         }
//     } else {
//         console.error(`Section with id '${sectionId}' not found`);
//     }
// }

// function setupBackToTop() {
//     if (!backToTopBtn) return;
    
//     window.addEventListener('scroll', () => {
//         if (window.pageYOffset > 300) {
//             backToTopBtn.classList.add('show');
//         } else {
//             backToTopBtn.classList.remove('show');
//         }
//     });
    
//     backToTopBtn.addEventListener('click', () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// }

// function setupMobileMenu() {
//     if (!navToggle || !navMenu) return;
    
//     navToggle.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//     });
    
//     // Close menu when clicking on a link
//     document.querySelectorAll('.nav-menu a').forEach(link => {
//         link.addEventListener('click', () => {
//             navMenu.classList.remove('active');
//         });
//     });
    
//     // Close menu when clicking outside
//     document.addEventListener('click', (e) => {
//         if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
//             navMenu.classList.remove('active');
//         }
//     });
// }

// function hideSplashScreen() {
//     const splashScreen = document.getElementById('splash-screen');
//     if (splashScreen) {
//         splashScreen.style.opacity = '0';
//         setTimeout(() => {
//             if (splashScreen.parentElement) {
//                 splashScreen.remove();
//             }
//         }, 500);
//     }
// }

// // Initialize UI Module
// function initUI() {
//     console.log('Initializing UI...');
    
//     // Close modals when clicking outside
//     modals.forEach(modal => {
//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 modal.classList.remove('active');
//                 document.body.style.overflow = 'auto';
//             }
//         });
//     });
    
//     // Close modals with Escape key
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             modals.forEach(modal => {
//                 if (modal.classList.contains('active')) {
//                     modal.classList.remove('active');
//                     document.body.style.overflow = 'auto';
//                 }
//             });
//         }
//     });
    
//     // Set up back to top button
//     setupBackToTop();
    
//     // Set up mobile menu
//     setupMobileMenu();
    
//     // Hide splash screen after 2 seconds
//     setTimeout(hideSplashScreen, 2000);
    
//     // Show home section by default
//     showSection('home');
    
//     console.log('UI initialized successfully');
// }

// export { 
//     initUI, 
//     showModal, 
//     closeModal, 
//     showMessage, 
//     showLoadingState, 
//     hideLoading, 
//     showLoading,
//     showSection 
// };


// DOM Elements
const sections = document.querySelectorAll('.section');
const modals = document.querySelectorAll('.modal');
const backToTopBtn = document.getElementById('backToTop');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-exclamation-circle';
    else if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    messageDiv.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.classList.add('fade-out');
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

function showLoading(message = 'Inapakia...') {
    // Remove any existing loader
    hideLoading();
    
    const loader = document.createElement('div');
    loader.className = 'fullscreen-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(loader);
    document.body.style.overflow = 'hidden';
}

function hideLoading() {
    const loader = document.querySelector('.fullscreen-loader');
    if (loader) {
        loader.remove();
        document.body.style.overflow = 'auto';
    }
}

function showLoadingState(container, message = 'Inapakia...') {
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

// Export all UI functions
export function showError(container, message) {
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button class="btn btn-secondary" onclick="location.reload()">
                <i class="fas fa-refresh"></i> Jaribu Tena
            </button>
        </div>
    `;
}

export function showSection(sectionId, loadCallback = null) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        if (loadCallback) {
            loadCallback();
        }
    } else {
        console.error(`Section with id '${sectionId}' not found`);
    }
}

function setupBackToTop() {
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupMobileMenu() {
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            if (splashScreen.parentElement) {
                splashScreen.remove();
            }
        }, 500);
    }
}

// Initialize UI Module
function initUI() {
    console.log('Initializing UI...');
    
    // Close modals when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Set up back to top button
    setupBackToTop();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Hide splash screen after 2 seconds
    setTimeout(hideSplashScreen, 2000);
    
    // Show home section by default
    showSection('home');
    
    console.log('UI initialized successfully');
}

export { 
    initUI, 
    showModal, 
    closeModal, 
    showMessage, 
    showLoadingState, 
    hideLoading, 
    showLoading,
    //showSection 
};