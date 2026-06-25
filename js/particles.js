/* ==========================================================================
   Lohakare Ganesh - Canvas Particle Network
   High performance, lightweight background animation
   ========================================================================== */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 60;
        this.connectionDistance = 110;
        
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.colors = {
            light: {
                particle: 'rgba(0, 150, 255, 0.45)',
                line: 'rgba(0, 150, 255, 0.08)'
            },
            dark: {
                particle: 'rgba(0, 200, 255, 0.55)',
                line: 'rgba(0, 200, 255, 0.12)'
            }
        };
        
        this.currentColors = this.colors.light;
        
        this.init();
    }
    
    init() {
        this.updateThemeColors();
        this.resizeCanvas();
        this.createParticles();
        
        // Listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseout', () => this.handleMouseOut());
        window.addEventListener('themeChanged', (e) => {
            this.updateThemeColors(e.detail.theme);
        });
        
        // Start loop
        this.animate();
    }
    
    updateThemeColors(overrideTheme) {
        const theme = overrideTheme || document.documentElement.getAttribute('data-theme') || 'light';
        this.currentColors = theme === 'dark' ? this.colors.dark : this.colors.light;
    }
    
    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Adjust particle density based on screen width
        if (window.innerWidth < 768) {
            this.numberOfParticles = 25;
            this.connectionDistance = 80;
        } else {
            this.numberOfParticles = 60;
            this.connectionDistance = 110;
        }
        
        this.createParticles();
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            const size = Math.random() * 2 + 1.5;
            const x = Math.random() * (this.canvas.width - size * 2) + size;
            const y = Math.random() * (this.canvas.height - size * 2) + size;
            
            // Random direction velocity
            const speedScale = window.innerWidth < 768 ? 0.3 : 0.6;
            const vx = (Math.random() - 0.5) * speedScale;
            const vy = (Math.random() - 0.5) * speedScale;
            
            this.particles.push({ x, y, size, vx, vy });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    handleMouseOut() {
        this.mouse.x = null;
        this.mouse.y = null;
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Draw particle dot
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.currentColors.particle;
            this.ctx.fill();
            
            // Move particle
            p.x += p.vx;
            p.y += p.vy;
            
            // Collision detection with canvas boundaries
            if (p.x < 0 || p.x > this.canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > this.canvas.height) p.vy = -p.vy;
            
            // Connect to other particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.connectionDistance) {
                    const alpha = (1 - dist / this.connectionDistance) * 0.4;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = this.currentColors.line.replace('0.12', alpha).replace('0.08', alpha);
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
            
            // Connect to mouse pointer
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dxMouse = p.x - this.mouse.x;
                const dyMouse = p.y - this.mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                
                if (distMouse < this.mouse.radius) {
                    const alphaMouse = (1 - distMouse / this.mouse.radius) * 0.45;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = this.currentColors.line.replace('0.12', alphaMouse).replace('0.08', alphaMouse);
                    this.ctx.lineWidth = 1.0;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork('particle-canvas');
});
