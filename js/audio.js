/**
 * ROBIYA • A CINEMATIC JOURNEY
 * Procedural Audio Synthesizer (Web Audio API)
 * Crystal chimes, celestial bells, ambient chords, and playful dodging effects
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.ambientInterval = null;
    this.initControl();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initControl() {
    const btn = document.getElementById('audio-toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.ensureContext();
      if (this.isMuted) {
        this.unmute();
        btn.classList.remove('muted');
        btn.classList.add('playing');
        btn.querySelector('.audio-label').textContent = 'Звук: Вкл';
        this.playChime(659.25); // E5 welcome chime
      } else {
        this.mute();
        btn.classList.remove('playing');
        btn.classList.add('muted');
        btn.querySelector('.audio-label').textContent = 'Звук: Выкл';
      }
    });
  }

  unmute() {
    this.isMuted = false;
    this.startAmbientDrone();
  }

  mute() {
    this.isMuted = true;
    this.stopAmbientDrone();
  }

  playTone(freq, duration = 1.2, type = 'sine', volume = 0.08) {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  playChime(freq = 587.33) {
    this.playTone(freq, 2.0, 'sine', 0.1);
    this.playTone(freq * 1.5, 2.4, 'sine', 0.04);
  }

  playDodgeSound() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      // Quick cute slide up
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playCatchSound() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.5, 'triangle', 0.1), i * 80);
    });
  }

  playLetterBell(index = 0) {
    // Pentatonic scale notes: C5, D5, E5, G5, A5, C6
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const freq = scale[index % scale.length];
    this.playChime(freq);
  }

  playSceneTransition() {
    this.playTone(392.0, 1.2, 'sine', 0.05); // G4
    setTimeout(() => this.playTone(587.33, 1.8, 'sine', 0.07), 120); // D5
  }

  playHarpArpeggio() {
    const notes = [440.0, 554.37, 659.25, 880.0, 1108.73];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 2.2, 'triangle', 0.06), i * 90);
    });
  }

  playFinaleChords() {
    const chord1 = [523.25, 659.25, 783.99]; // C major
    const chord2 = [587.33, 739.99, 880.0];  // D major
    const chord3 = [659.25, 830.61, 987.77]; // E major

    chord1.forEach(f => this.playTone(f, 3.5, 'sine', 0.05));
    setTimeout(() => {
      chord2.forEach(f => this.playTone(f, 3.5, 'sine', 0.05));
    }, 600);
    setTimeout(() => {
      chord3.forEach(f => this.playTone(f, 4.5, 'sine', 0.06));
    }, 1300);
  }

  startAmbientDrone() {
    const chords = [
      [261.63, 392.00, 523.25], // C
      [293.66, 440.00, 587.33], // D
      [329.63, 493.88, 659.25]  // E
    ];
    let step = 0;

    const playStep = () => {
      if (this.isMuted) return;
      const chord = chords[step % chords.length];
      chord.forEach(f => this.playTone(f, 6.0, 'sine', 0.02));
      step++;
    };

    playStep();
    this.ambientInterval = setInterval(playStep, 5500);
  }

  stopAmbientDrone() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

window.soundEngine = new SoundEngine();
