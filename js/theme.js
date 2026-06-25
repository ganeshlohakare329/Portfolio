/* ==========================================================================
   Lohakare Ganesh - Theme Switcher Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check initial theme state (already applied by script in head to prevent flickering)
    let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // Update theme toggle button or icon based on theme
    function updateThemeUI(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Toggle event listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            
            // Add a temporary animation transition class to body
            document.body.classList.add('theme-transitioning');
            
            updateThemeUI(currentTheme);
            
            // Dispatch a custom event to notify particles or other canvas systems of theme changes
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: currentTheme } }));
            
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 600);
        });
    }
});
