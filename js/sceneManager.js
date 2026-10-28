/**
 * ROBIYA • A CINEMATIC JOURNEY
 * Scene Manager & Director
 * Mobile-First, Touch-Optimized Cinematic Transitions
 */

class SceneManager {
  constructor() {
    this.currentSceneId = 'scene-1';
    this.isTransitioning = false;
    this.scenes = {};
  }

  init() {
    document.querySelectorAll('.scene').forEach(sceneEl => {
      this.scenes[sceneEl.id] = sceneEl;
    });

    const initial = this.scenes[this.currentSceneId];
    if (initial) {
      initial.classList.add('active');
    }
  }

  async transitionTo(targetSceneId, options = {}) {
    if (this.isTransitioning || this.currentSceneId === targetSceneId) return;
    this.isTransitioning = true;

    const fromScene = this.scenes[this.currentSceneId];
    const toScene = this.scenes[targetSceneId];

    if (!toScene) {
      console.warn(`Target scene #${targetSceneId} not found.`);
      this.isTransitioning = false;
      return;
    }

    if (window.soundEngine) {
      window.soundEngine.playSceneTransition();
    }

    if (window.particleSystem) {
      window.particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 35);
    }

    if (fromScene) {
      fromScene.classList.remove('active');
      fromScene.classList.add('exiting');
    }

    const glow = document.querySelector('.cosmic-radial-glow');
    if (glow) {
      glow.style.transform = 'translate(-50%, -50%) scale(1.3)';
      glow.style.opacity = '0.9';
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    if (fromScene) {
      fromScene.classList.remove('exiting');
    }

    toScene.classList.add('active');
    this.currentSceneId = targetSceneId;

    if (glow) {
      setTimeout(() => {
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
        glow.style.opacity = '0.6';
      }, 300);
    }

    if (typeof options.onComplete === 'function') {
      options.onComplete();
    }

    this.isTransitioning = false;
  }
}

window.sceneManager = new SceneManager();
