// include-navigation.js
function includeNavigation() {
    fetch('navigation.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Navigation file not found');
            }
            return response.text();
        })
        .then(data => {
            // Insert navigation at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Initialize app if it exists
            if (window.app) {
                window.app.setupNavigation();
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            // Fallback: create basic navigation
            createFallbackNavigation();
        });
}

function createFallbackNavigation() {
    const fallbackNav = `
        <header class="header">
            <nav class="navbar">
                <div class="nav-brand">
                    <i class="fas fa-tractor"></i>
                    <h2>FarmConnect</h2>
                </div>
                <div class="auth-buttons">
                    <a href="login.html" class="auth-btn auth-login">Login</a>
                    <a href="register.html" class="auth-btn auth-register">Register</a>
                </div>
            </nav>
        </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', fallbackNav);
}

// Include navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', includeNavigation);