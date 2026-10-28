/**
 * ROBIYA • A CINEMATIC JOURNEY
 * Particle Universe Engine
 * Ambient starlight and cursor trail (NO falling petals)
 */

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = (this.canvas.width = window.innerWidth);
    this.height = (this.canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      this.initStars();
    });

    this.initStars();
    this.initMouseTrail();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initStars() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 8000), 120);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? 'rgba(229, 197, 131,' : 'rgba(243, 182, 198,'
      });
    }
  }

  initMouseTrail() {
    window.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.6) {
        this.particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2 + 1,
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.5,
          color: Math.random() > 0.5 ? 'rgba(252, 237, 182,' : 'rgba(249, 216, 225,',
          isTrail: true
        });
      }
    });

    // Touch support for phones
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0] && Math.random() > 0.5) {
        this.particles.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.5,
          color: 'rgba(252, 237, 182,',
          isTrail: true
        });
      }
    }, { passive: true });
  }

  burst(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.particles.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        size: Math.random() * 2.5 + 1,
        alpha: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        decay: Math.random() * 0.02 + 0.015,
        color: Math.random() > 0.5 ? 'rgba(252, 237, 182,' : 'rgba(230, 92, 123,',
        isBurst: true
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.isBurst || p.isTrail) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay || 0.02;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + p.alpha + ')';
        this.ctx.fill();
      } else {
        // Ambient star twinkle
        p.twinklePhase += p.twinkleSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinklePhase));

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + currentAlpha + ')';
        this.ctx.fill();
      }
    }

    requestAnimationFrame(this.animate);
  }
}

window.particleSystem = new ParticleSystem();
