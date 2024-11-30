// Ensure the canvas dynamically resizes to the viewport
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Resize canvas initially and when the window resizes
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle system
const particlesArray = [];
const colors = ['#ffffff', '#00ffdd', '#0055ff', '#ffdd00'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particlesArray.length = 0; // Clear existing particles on resize
    for (let i = 0; i < 200; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Initialize and animate
initParticles();
animate();

// Reinitialize particles on resize
window.addEventListener('resize', initParticles);
