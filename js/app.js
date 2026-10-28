/**
 * ROBIYA • A CINEMATIC JOURNEY
 * Main Application Controller & Story Director
 * Fully in Russian with Playful Dodging Button & Poetic Emotion
 */

document.addEventListener('DOMContentLoaded', () => {
  window.sceneManager.init();

  initScene1();
  initScene2();
  initScene3();
  initScene4();
  initScene5();
  initScene6();
  initScene7();
});

/* ==========================================================================
   СЦЕНА 1: ТАИНСТВЕННОЕ НАЧАЛО
   ========================================================================== */
function initScene1() {
  const openBtn = document.getElementById('btn-open-experience');
  if (!openBtn) return;

  openBtn.addEventListener('click', () => {
    window.sceneManager.transitionTo('scene-2');
  });
}

/* ==========================================================================
   СЦЕНА 2: ДЛЯ КОГО ЭТО? И ОТКРЫТИЕ ИМЕНИ РОБИЯ + УБЕГАЮЩАЯ КНОПКА
   ========================================================================== */
const nameData = [
  { char: 'Р', word: 'Радость', text: '«Ты наполняешь пространство светом, даже сама того не замечая. Твоя лёгкость превращает любой день в маленький праздник.»' },
  { char: 'О', word: 'Особенная', text: '«В тебе нет наигранности — только искренность, тепло и редкая чистота души, которую невозможно не заметить.»' },
  { char: 'Б', word: 'Безупречная', text: '«Нежная, скромная и невероятно красивая. Красота, которой не нужно шуметь, чтобы навсегда остаться в памяти.»' },
  { char: 'И', word: 'Искренность', text: '«В твоём взгляде столько спокойствия, что рядом с тобой невольно забывается любая суета.»' },
  { char: 'Я', word: 'Яркая', text: '«Ты на два года моложе, но в тебе живёт такая удивительная грация, перед которой теряются любые слова.»' }
];

function initScene2() {
  const whoBtn = document.getElementById('btn-who-is-it');
  const questionStage = document.getElementById('scene-2-question');
  const revealStage = document.getElementById('scene-2-reveal');
  const lettersContainer = document.getElementById('name-letters');
  const meaningLetter = document.getElementById('meaningLetter');
  const meaningText = document.getElementById('meaningText');
  const runawayBlock = document.getElementById('runawayBlock');
  const runawayBtn = document.getElementById('runawayBtn');
  const dodgeToast = document.getElementById('dodgeToast');
  const secretBox = document.getElementById('secretCaughtBox');
  const toScene3Btn = document.getElementById('btn-to-scene-3');

  if (!whoBtn) return;

  whoBtn.addEventListener('click', () => {
    questionStage.style.display = 'none';
    revealStage.classList.add('active');

    // Поочередно открываем Р - О - Б - И - Я
    let index = 0;
    const revealNextChar = () => {
      if (index >= nameData.length) {
        // Показываем блок с убегающей кнопкой-сюрпризом
        if (runawayBlock) {
          runawayBlock.style.display = 'flex';
          runawayBlock.classList.add('anim-fade-in-up');
        }
        return;
      }

      const item = nameData[index];
      const charBox = document.createElement('div');
      charBox.className = 'name-char-box';
      charBox.textContent = item.char;
      lettersContainer.appendChild(charBox);

      setTimeout(() => charBox.classList.add('revealed'), 40);

      meaningLetter.textContent = `${item.char} — ${item.word}`;
      meaningText.textContent = item.text;

      if (window.soundEngine) {
        window.soundEngine.playLetterBell(index);
      }

      index++;
      setTimeout(revealNextChar, 1100);
    };

    revealNextChar();
  });

  // Логика супер-непредсказуемой убегающей кнопки
  if (runawayBtn) {
    let dodgeCount = 0;
    const maxDodges = 7;
    let isDodging = false;

    const dodgePhrases = [
      "Ой, промахнулась! Попробуй ещё раз ✦",
      "Я уже в другом месте — лови!",
      "Не-а, не догонишь! Мои чувства быстрее.",
      "Почти получилось! Ещё чуть-чуть ✦",
      "Ты так близко... Ну-ка ещё попытка!",
      "А если вот так? Смотри внимательней ✦",
      "Уф... ну всё, сдаюсь — нажимай!"
    ];

    // Непредсказуемые сектора для прыжка кнопки
    const jumpSectors = [
      { x: 18, y: 22, rot: -14 },
      { x: 78, y: 75, rot: 15 },
      { x: 80, y: 25, rot: -10 },
      { x: 22, y: 78, rot: 12 },
      { x: 50, y: 18, rot: -18 },
      { x: 82, y: 50, rot: 14 },
      { x: 50, y: 50, rot: 0 }
    ];

    function performDodge() {
      if (dodgeCount >= maxDodges || isDodging) return;
      isDodging = true;

      dodgeCount++;
      const anchor = document.getElementById('runawayAnchor');
      const aRect = anchor.getBoundingClientRect();
      const bRect = runawayBtn.getBoundingClientRect();

      const sector = jumpSectors[dodgeCount - 1] || jumpSectors[0];

      // Вычисляем координаты внутри арены
      const targetX = (sector.x / 100) * aRect.width;
      const targetY = (sector.y / 100) * aRect.height;

      runawayBtn.style.left = `${Math.min(Math.max(bRect.width / 2 + 10, targetX), aRect.width - bRect.width / 2 - 10)}px`;
      runawayBtn.style.top = `${Math.min(Math.max(bRect.height / 2 + 10, targetY), aRect.height - bRect.height / 2 - 10)}px`;
      runawayBtn.style.transform = `translate(-50%, -50%) rotate(${sector.rot}deg) scale(${0.9 + Math.random() * 0.25})`;

      dodgeToast.textContent = dodgePhrases[dodgeCount - 1] || "Лови!";

      if (window.soundEngine) {
        window.soundEngine.playDodgeSound();
      }

      if (dodgeCount >= maxDodges) {
        runawayBtn.classList.add('caught');
        runawayBtn.style.transform = 'translate(-50%, -50%) scale(1.15)';
        runawayBtn.innerHTML = 'Я СДАЮСЬ! НАЖМИ МЕНЯ <svg class="inline-btn-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        dodgeToast.textContent = 'Я замер, нажимай скорее...';
      }

      setTimeout(() => {
        isDodging = false;
      }, 140);
    }

    // Проверка приближения курсора (Proximity detection)
    function handleProximity(clientX, clientY) {
      if (dodgeCount >= maxDodges) return;
      const bRect = runawayBtn.getBoundingClientRect();
      const centerX = bRect.left + bRect.width / 2;
      const centerY = bRect.top + bRect.height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      // Если палец или курсор приблизился ближе чем на 95px — молниеносный прыжок!
      if (dist < 95) {
        performDodge();
      }
    }

    window.addEventListener('mousemove', (e) => {
      handleProximity(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleProximity(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    runawayBtn.addEventListener('mouseenter', performDodge);
    runawayBtn.addEventListener('touchstart', (e) => {
      if (dodgeCount < maxDodges) {
        e.preventDefault();
        performDodge();
      }
    });

    runawayBtn.addEventListener('click', () => {
      if (dodgeCount >= maxDodges) {
        runawayBtn.style.display = 'none';
        dodgeToast.style.display = 'none';
        secretBox.classList.add('show');

        if (window.soundEngine) {
          window.soundEngine.playCatchSound();
        }
        if (window.particleSystem) {
          window.particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
        }

        setTimeout(() => {
          if (toScene3Btn) {
            toScene3Btn.style.display = 'inline-flex';
            toScene3Btn.classList.add('anim-fade-in-up');
          }
        }, 600);
      }
    });
  }

  if (toScene3Btn) {
    toScene3Btn.addEventListener('click', () => {
      window.sceneManager.transitionTo('scene-3');
    });
  }
}

const confessionsData = [
  {
    tag: '01 / Нерешительность',
    title: 'Слова застревают в горле',
    text: 'Каждый раз, когда ты проходишь мимо, мир словно ставит звук на паузу. Ты настолько красивая, что любая заготовленная фраза просто растворяется в воздухе.'
  },
  {
    tag: '02 / Разница в возрасте',
    title: 'Защищая твой покой',
    text: 'Ты на два года младше меня. Я больше всего боялся показаться навязчивым, поспешить или смутить тебя. Твой душевный покой для меня дороже собственной смелости.'
  },
  {
    tag: '03 / Бережное отношение',
    title: 'Чистое восхищение',
    text: 'Некоторые вещи в жизни настолько чисты, что просто видеть твою улыбку среди людей — для меня уже было огромным поводом для радости и тепла в сердце.'
  }
];

function initScene3() {
  const tabBtns = document.querySelectorAll('.confession-tab-btn');
  const tagEl = document.getElementById('confessionTag');
  const titleEl = document.getElementById('confessionTitle');
  const textEl = document.getElementById('confessionText');
  const toScene4Btn = document.getElementById('btn-to-scene-4');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const index = parseInt(btn.getAttribute('data-index') || '0', 10);
      const data = confessionsData[index];

      if (data) {
        if (tagEl) tagEl.textContent = data.tag;
        if (titleEl) titleEl.textContent = data.title;
        if (textEl) textEl.textContent = data.text;
      }

      if (window.soundEngine) {
        window.soundEngine.playChime(523.25 + index * 60);
      }
      if (window.particleSystem) {
        const rect = btn.getBoundingClientRect();
        window.particleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
      }
    });
  });

  if (toScene4Btn) {
    toScene4Btn.addEventListener('click', () => {
      window.sceneManager.transitionTo('scene-4');
    });
  }
}

/* ==========================================================================
   СЦЕНА 4: ИНТЕРАКТИВНЫЕ СТИКЕРЫ (ЧУДО ТВОИХ ГЛАЗ)
   ========================================================================== */
const stickersData = [
  {
    svg: `<svg class="sticker-svg" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="14" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="3 2"/><ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="var(--color-rose)" stroke-width="1.2" transform="rotate(-25 18 18)"/><ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="var(--color-violet)" stroke-width="1.2" transform="rotate(35 18 18)"/><circle cx="18" cy="18" r="4.5" fill="url(#cosmicGrad)"/><circle cx="16" cy="16" r="1.5" fill="#fff"/><circle cx="26" cy="12" r="1.2" fill="var(--color-gold-bright)"/><circle cx="9" cy="23" r="1.2" fill="var(--color-rose)"/></svg>`,
    title: 'Глаза-галактики',
    desc: '«Глубокие, спокойные и завораживающие, как отражение звёзд в ночной глади океана. Ты даже не представляешь, сколько света в твоём взгляде.»'
  },
  {
    svg: `<svg class="sticker-svg" viewBox="0 0 36 36" fill="none"><path d="M18 3L21.5 14.5L33 18L21.5 21.5L18 33L14.5 21.5L3 18L14.5 14.5L18 3Z" fill="url(#goldGrad)" stroke="#fff" stroke-width="0.8"/><circle cx="18" cy="18" r="3.2" fill="#fff"/><path d="M7 7L10 10M29 7L26 10M7 29L10 26M29 29L26 26" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    title: 'Взгляд без слов',
    desc: '«Взгляд, в который невозможно не влюбиться, даже не проронив ни единого слова. Он говорит громче любых признаний.»'
  },
  {
    svg: `<svg class="sticker-svg" viewBox="0 0 36 36" fill="none"><g fill="url(#roseGrad)" stroke="var(--color-blush)" stroke-width="0.8"><path d="M18 18 C18 12, 14 6, 18 4 C22 6, 18 12, 18 18 Z"/><path d="M18 18 C23 14, 30 14, 31 18 C30 22, 23 22, 18 18 Z"/><path d="M18 18 C20 23, 26 28, 24 31 C20 31, 18 25, 18 18 Z"/><path d="M18 18 C16 25, 14 31, 10 31 C8 28, 14 23, 18 18 Z"/><path d="M18 18 C13 22, 6 22, 5 18 C6 14, 13 14, 18 18 Z"/></g><circle cx="18" cy="18" r="3" fill="var(--color-gold-bright)"/></svg>`,
    title: 'Вечная весна',
    desc: '«Ты на два года моложе, но в тебе живёт такая нежная грация, что рядом с тобой теплеет всё вокруг.»'
  },
  {
    svg: `<svg class="sticker-svg" viewBox="0 0 36 36" fill="none"><path d="M18 31L16 29.2C8.5 22.4 3.5 17.9 3.5 12.3C3.5 7.7 7 4.2 11.5 4.2C14.1 4.2 16.5 5.4 18 7.3C19.5 5.4 21.9 4.2 24.5 4.2C29 4.2 32.5 7.7 32.5 12.3C32.5 17.9 27.5 22.4 20 29.2L18 31Z" fill="url(#rubyRoseGrad)" stroke="var(--color-rose)" stroke-width="1"/><circle cx="12" cy="11" r="1.6" fill="#fff" opacity="0.8"/><path d="M27 6L28.5 7.5M30 6L28.5 7.5M28.5 4.5L28.5 9" stroke="var(--color-gold-bright)" stroke-width="1" stroke-linecap="round"/></svg>`,
    title: 'Тихий свет',
    desc: '«В мире, который вечно куда-то спешит, твои глаза несут в себе тишину, уют и вечность.»'
  }
];

function initScene4() {
  const stickerCards = document.querySelectorAll('.sticker-card');
  const iconEl = document.getElementById('stickerRevealedIcon');
  const titleEl = document.getElementById('stickerRevealedTitle');
  const descEl = document.getElementById('stickerRevealedDesc');
  const toScene5Btn = document.getElementById('btn-to-scene-5');

  stickerCards.forEach(card => {
    card.addEventListener('click', () => {
      stickerCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const index = parseInt(card.getAttribute('data-index') || '0', 10);
      const data = stickersData[index];

      if (data) {
        if (iconEl) iconEl.innerHTML = data.svg;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
      }

      if (window.soundEngine) {
        window.soundEngine.playChime(659.25);
      }
      if (window.particleSystem) {
        const rect = card.getBoundingClientRect();
        window.particleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }
    });
  });

  if (toScene5Btn) {
    toScene5Btn.addEventListener('click', () => {
      window.sceneManager.transitionTo('scene-5');
    });
  }
}


/* ==========================================================================
   СЦЕНА 5: ТАЙНОЕ ПИСЬМО
   ========================================================================== */
function initScene5() {
  const stamp = document.getElementById('letterStamp');
  const toScene6Btn = document.getElementById('btn-to-scene-6');

  if (stamp) {
    stamp.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playHarpArpeggio();
      }
      if (window.particleSystem) {
        window.particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 25);
      }
    });
  }

  if (toScene6Btn) {
    toScene6Btn.addEventListener('click', () => {
      window.sceneManager.transitionTo('scene-6');
    });
  }
}

/* ==========================================================================
   СЦЕНА 6: ЗВЁЗДНЫЕ ПОЖЕЛАНИЯ ДЛЯ РОБИИ
   ========================================================================== */
const wishesData = {
  joy: {
    title: 'Искренняя радость',
    desc: '«Пусть твоя улыбка всегда будет настоящей и свободной, а дни наполняются лёгкостью и смехом от всего сердца.»'
  },
  eyes: {
    title: 'Вечный свет в глазах',
    desc: '«Пусть грусть никогда не коснётся этого взгляда. Пусть твои прекрасные глаза всегда сияют счастьем и спокойствием.»'
  },
  dreams: {
    title: 'Исполнение сокровенного',
    desc: '«Ты на два года моложе, и впереди у тебя весь необъятный мир. Пусть каждая твоя светлая мечта сбывается плавно и красиво.»'
  },
  peace: {
    title: 'Душевный покой',
    desc: '«Пусть вокруг тебя всегда будут искренние и добрые люди, а на душе царит уют и гармония.»'
  },
  worth: {
    title: 'Твоя ценность',
    desc: '«Никогда не сомневайся в том, насколько ты особенная. Знать, что ты есть на этой земле — уже повод улыбнуться.»'
  }
};

function initScene6() {
  const starBtns = document.querySelectorAll('.wish-star-btn');
  const titleEl = document.getElementById('wishOutputTitle');
  const descEl = document.getElementById('wishOutputDesc');
  const releaseBtn = document.getElementById('btn-release-wishes');

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      starBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-wish');
      const data = wishesData[key];

      if (data) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
      }

      if (window.soundEngine) {
        window.soundEngine.playChime(783.99);
      }
    });
  });

  if (releaseBtn) {
    releaseBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        window.soundEngine.playFinaleChords();
      }
      window.sceneManager.transitionTo('scene-7');
    });
  }
}

/* ==========================================================================
   СЦЕНА 7: ФИНАЛ
   ========================================================================== */
function initScene7() {
  const replayBtn = document.getElementById('btn-replay-journey');

  const observer = new MutationObserver(() => {
    const s7 = document.getElementById('scene-7');
    if (s7 && s7.classList.contains('active')) {
      if (window.soundEngine) {
        window.soundEngine.playFinaleChords();
      }
    }
  });

  const s7 = document.getElementById('scene-7');
  if (s7) {
    observer.observe(s7, { attributes: true, attributeFilter: ['class'] });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.sceneManager.transitionTo('scene-1');
    });
  }
}
