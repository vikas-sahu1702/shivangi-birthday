/* =========================================================
   SHIVANGI'S BIRTHDAY WEBSITE - 12 SLIDES STORY EDITION 🐾🎂💖
   Customized for Shivangi (26 Nov) by Vikas
   Includes: Countdown, 4 Mini-Games, Fireworks, Ambient Particles & Melody Fallback
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. AUDIO PLAYER + BUILT-IN BIRTHDAY MELODY FALLBACK
  // =========================================================
  const bgSong = document.getElementById('bgSong');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicTitleText = document.getElementById('musicTitleText');
  const slideAudioName = document.getElementById('slideAudioName');

  let isMusicPlaying = false;
  let useSynthFallback = false;
  let synthTimer = null;
  let synthNoteIndex = 0;

  let audioCtx = null;
  function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playChime(freq, duration = 0.35, type = 'triangle', volume = 0.12) {
    try {
      const ctx = getAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function playCelebrationFanfare() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => playChime(freq, 0.5, 'triangle'), idx * 100);
    });
  }

  // Gentle music-box "Happy Birthday" melody notes (freq, ms)
  const birthdayMelody = [
    [261.63, 320], [261.63, 180], [293.66, 480], [261.63, 480], [349.23, 480], [329.63, 900],
    [261.63, 320], [261.63, 180], [293.66, 480], [261.63, 480], [392.00, 480], [349.23, 900],
    [261.63, 320], [261.63, 180], [523.25, 480], [440.00, 480], [349.23, 480], [329.63, 480], [293.66, 850],
    [466.16, 320], [466.16, 180], [440.00, 480], [349.23, 480], [392.00, 480], [349.23, 950]
  ];

  function scheduleNextMelodyNote() {
    if (!isMusicPlaying || !useSynthFallback) return;
    const [freq, dur] = birthdayMelody[synthNoteIndex % birthdayMelody.length];
    playChime(freq, Math.max(0.35, dur / 1000), 'sine', 0.08);
    synthNoteIndex++;
    synthTimer = setTimeout(scheduleNextMelodyNote, dur);
  }

  if (bgSong) {
    bgSong.addEventListener('error', () => {
      useSynthFallback = true;
    });
  }

  function playSong() {
    if (isMusicPlaying) return;

    if (useSynthFallback || !bgSong) {
      useSynthFallback = true;
      isMusicPlaying = true;
      musicToggleBtn?.classList.add('playing');
      if (musicTitleText) musicTitleText.textContent = 'Tum Se Hi (Melody)';
      if (slideAudioName) slideAudioName.textContent = 'Tum Se Hi (Melody)';
      scheduleNextMelodyNote();
      return;
    }

    bgSong.volume = 0.85;
    if (bgSong.currentTime < 17) {
      bgSong.currentTime = 17;
    }
    bgSong.play().then(() => {
      isMusicPlaying = true;
      musicToggleBtn?.classList.add('playing');
      if (musicTitleText) musicTitleText.textContent = 'Tum Se Hi';
      if (slideAudioName) slideAudioName.textContent = 'Tum Se Hi';
    }).catch(() => {
      // If tum-se-hi.mp3 is missing or blocked, use built-in melody on user interaction
      useSynthFallback = true;
      isMusicPlaying = true;
      musicToggleBtn?.classList.add('playing');
      if (musicTitleText) musicTitleText.textContent = 'Tum Se Hi (Melody)';
      if (slideAudioName) slideAudioName.textContent = 'Tum Se Hi (Melody)';
      scheduleNextMelodyNote();
    });
  }

  function pauseSong() {
    isMusicPlaying = false;
    musicToggleBtn?.classList.remove('playing');
    if (synthTimer) {
      clearTimeout(synthTimer);
      synthTimer = null;
    }
    if (bgSong && !bgSong.paused) {
      bgSong.pause();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMusicPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });
  }

  // =========================================================
  // 2. LIVE NOVEMBER 26 BIRTHDAY COUNTDOWN
  // =========================================================
  const countdownLabel = document.getElementById('countdownLabel');
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  function updateCountdown() {
    if (!cdDays) return;
    const now = new Date();
    const isNov26 = (now.getMonth() === 10 && now.getDate() === 26); // Month is 0-indexed (10 = Nov)

    if (isNov26) {
      countdownLabel.textContent = "🎉 IT'S NOVEMBER 26 — HAPPY BIRTHDAY SHIVANGI! 🎉";
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMins.textContent = '00';
      cdSecs.textContent = '00';
      return;
    }

    let targetYear = now.getFullYear();
    const targetThisYear = new Date(targetYear, 10, 26, 0, 0, 0);
    if (now > targetThisYear) {
      targetYear += 1;
    }
    const targetDate = new Date(targetYear, 10, 26, 0, 0, 0);
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdownLabel.textContent = '⏳ Counting down to Nov 26...';
    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =========================================================
  // 3. IN-BROWSER PHOTO SWAPPER (Optional Quick Preview)
  // =========================================================
  function bindPhotoUpload(inputId, targetIds) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        targetIds.forEach(id => {
          const img = document.getElementById(id);
          if (img) img.src = ev.target.result;
        });
        playCelebrationFanfare();
        triggerConfetti(35);
      };
      reader.readAsDataURL(file);
    });
  }

  bindPhotoUpload('uploadPhoto1', ['polaroidImg1']);
  bindPhotoUpload('uploadPhoto2', ['profileHeroImg', 'polaroidImg2']);

  // =========================================================
  // 4. SLIDE-BY-SLIDE STORY DECK NAVIGATION (12 SLIDES)
  // =========================================================
  const totalSlides = 12;
  let currentSlide = 0;

  const slidesContainer = document.getElementById('slidesContainer');
  const slideIndicator = document.getElementById('slideIndicator');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const progressSegments = document.querySelectorAll('.progress-segment');
  const navDots = document.querySelectorAll('.nav-slide-dots .dot');

  function updateSlideUI(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    progressSegments.forEach((seg, i) => {
      seg.classList.remove('passed', 'active');
      if (i < index) seg.classList.add('passed');
      else if (i === index) seg.classList.add('active');
    });

    slideIndicator.textContent = `${index + 1} / ${totalSlides} 🐾`;

    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    prevSlideBtn.disabled = (index === 0);

    if (index === totalSlides - 1) {
      nextSlideBtn.innerHTML = '<span>Replay 🔄</span>';
    } else {
      nextSlideBtn.innerHTML = '<span>Next ➔</span>';
    }

    const activeSlide = document.getElementById(`slide${index + 1}`);
    if (activeSlide) activeSlide.scrollTop = 0;
  }

  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentSlide = index;
      updateSlideUI(currentSlide);
      playChime(650, 0.1, 'sine');
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    else goToSlide(0);
  }

  function prevSlide() {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }

  if (nextSlideBtn) nextSlideBtn.addEventListener('click', nextSlide);
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', prevSlide);

  progressSegments.forEach((seg, idx) => seg.addEventListener('click', () => goToSlide(idx)));
  navDots.forEach((dot, idx) => dot.addEventListener('click', () => goToSlide(idx)));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // =========================================================
  // 5. SLIDE 1: GIFT BOX OPENER
  // =========================================================
  const openGiftBtn = document.getElementById('openGiftBtn');

  function openGiftSurprise() {
    playSong();
    playCelebrationFanfare();
    triggerConfetti(70);

    const lid = document.querySelector('.gift-lid');
    if (lid) {
      lid.style.transform = 'translateY(-25px) rotate(-10deg)';
    }

    setTimeout(() => {
      goToSlide(1);
    }, 1050);
  }

  if (openGiftBtn) {
    openGiftBtn.addEventListener('click', openGiftSurprise);
    openGiftBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openGiftSurprise();
    });
  }

  // =========================================================
  // 6. SLIDE 3: CAKE & CANDLE BLOWING
  // =========================================================
  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3')
  ];
  const candles = document.querySelectorAll('.candle');
  const blowAllBtn = document.getElementById('blowAllBtn');
  const wishBanner = document.getElementById('wishBanner');
  const relightBtn = document.getElementById('relightBtn');
  let blownCount = 0;

  function blowCandle(flame) {
    if (flame && !flame.classList.contains('extinguished')) {
      flame.classList.add('extinguished');
      blownCount++;
      playChime(550, 0.15, 'sine');

      if (blownCount >= flames.length) {
        playCelebrationFanfare();
        wishBanner.classList.add('active');
        triggerConfetti(120);
      }
    }
  }

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      const num = candle.getAttribute('data-candle');
      blowCandle(document.getElementById(`flame${num}`));
    });
  });

  if (blowAllBtn) {
    blowAllBtn.addEventListener('click', () => flames.forEach(f => blowCandle(f)));
  }

  if (relightBtn) {
    relightBtn.addEventListener('click', () => {
      flames.forEach(f => f.classList.remove('extinguished'));
      blownCount = 0;
      wishBanner.classList.remove('active');
      playChime(600, 0.15, 'triangle');
    });
  }

  // =========================================================
  // 7. SLIDE 5: LOVE QUIZ (SHIVANGI & VIKAS)
  // =========================================================
  const colorBtns = document.querySelectorAll('.color-btn');
  const q1Feedback = document.getElementById('q1Feedback');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      playChime(587.33, 0.2);
      const col = btn.getAttribute('data-color');
      q1Feedback.innerHTML = `✨ <em>${col}</em> is a stunning choice! You look gorgeous in every single color, Shivangi! 🌸`;
    });
  });

  const choiceBtns = document.querySelectorAll('.choice-btn');
  const q2Feedback = document.getElementById('q2Feedback');
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      choiceBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      playChime(659.25, 0.3);
      triggerConfetti(35);
      q2Feedback.innerHTML = `🥰 100% Correct! Vikas is the luckiest guy in the universe to have you! 💕`;
    });
  });

  const happyYesBtn = document.getElementById('happyYesBtn');
  const happyNoBtn = document.getElementById('happyNoBtn');
  const q3Feedback = document.getElementById('q3Feedback');

  if (happyYesBtn) {
    happyYesBtn.addEventListener('click', () => {
      playCelebrationFanfare();
      triggerConfetti(50);
      q3Feedback.innerHTML = `💖 YAY! Making you happy is Vikas's favorite mission in the world! 🌸`;
    });
  }

  if (happyNoBtn) {
    happyNoBtn.addEventListener('click', () => {
      playChime(180, 0.2, 'sawtooth');
      q3Feedback.innerHTML = `🙈 Wait, that button must be broken! Vikas is sending 100 emergency hugs right now! 🤗🐾`;
    });
  }

  // Q4: Do you love Vikas? (NO IS RESTRICTED!)
  const loveYesBtn = document.getElementById('loveYesBtn');
  const loveNoBtn = document.getElementById('loveNoBtn');
  const q4Feedback = document.getElementById('q4Feedback');
  const loveCertificate = document.getElementById('loveCertificate');
  let runawayCount = 0;

  function runawayNo(e) {
    if (e) e.preventDefault();
    runawayCount++;
    playChime(180, 0.15, 'sawtooth');

    loveNoBtn.classList.add('shake');
    setTimeout(() => loveNoBtn.classList.remove('shake'), 400);

    const rx = (Math.random() - 0.5) * 120;
    const ry = (Math.random() - 0.5) * 45;
    loveNoBtn.style.transform = `translate(${rx}px, ${ry}px)`;

    const warnings = [
      "⚠️ ACCESS DENIED! 'No' is strictly restricted by royal law! 🐱",
      "🚫 Error 404: 'No' does not exist in Vikas's dictionary! 🐾",
      "😜 Nice try, Shivangi! Only YES is accepted! 💖",
      "🎀 Nope! You are stuck loving Vikas forever! 🥰"
    ];
    q4Feedback.innerHTML = warnings[runawayCount % warnings.length];

    if (runawayCount >= 3) {
      loveNoBtn.textContent = "YES anyway! 😍";
      loveNoBtn.style.background = "#ffd1dc";
      loveNoBtn.style.color = "#b83280";
      loveNoBtn.onclick = onLoveYes;
    }
  }

  if (loveNoBtn) {
    loveNoBtn.addEventListener('mouseover', runawayNo);
    loveNoBtn.addEventListener('touchstart', runawayNo, { passive: false });
    loveNoBtn.addEventListener('click', runawayNo);
  }

  function onLoveYes() {
    playCelebrationFanfare();
    triggerConfetti(140);
    if (loveNoBtn) loveNoBtn.style.display = 'none';

    q4Feedback.innerHTML = `🎉 BEST BIRTHDAY GIFT EVER! Shivangi officially loves Vikas forever and ever! 💖💍`;
    loveCertificate.classList.add('active');
  }

  if (loveYesBtn) loveYesBtn.addEventListener('click', onLoveYes);

  // Q5: Do you want Vikas forever?
  const foreverYesBtn = document.getElementById('foreverYesBtn');
  const foreverNoBtn = document.getElementById('foreverNoBtn');
  const q5Feedback = document.getElementById('q5Feedback');

  function spawnFlyingKisses() {
    for (let i = 0; i < 18; i++) {
      const kiss = document.createElement('div');
      kiss.className = 'kiss-burst-item';
      kiss.textContent = ['💋', '💖', '😘', '💕'][Math.floor(Math.random() * 4)];
      kiss.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 80}px`;
      kiss.style.top = `${window.innerHeight / 2 + (Math.random() - 0.5) * 60}px`;
      kiss.style.setProperty('--kx', `${(Math.random() - 0.5) * 360}px`);
      kiss.style.setProperty('--ky', `${(Math.random() - 0.8) * 450}px`);
      document.body.appendChild(kiss);
      setTimeout(() => kiss.remove(), 1800);
    }
  }

  if (foreverNoBtn) {
    foreverNoBtn.addEventListener('click', () => {
      playChime(880, 0.25, 'triangle');
      playChime(1046.50, 0.35, 'sine');
      spawnFlyingKisses();
      foreverNoBtn.classList.add('disappeared');
      q5Feedback.innerHTML = `Mwaaah! 😘 You got showered with flying kisses from Vikas! 💋<br><span style="color:#e11d48;font-size:0.95rem;">'NO' has magically vanished because you belong with Vikas forever and ever! 💖💍</span>`;
      triggerConfetti(45);
    });
  }

  if (foreverYesBtn) {
    foreverYesBtn.addEventListener('click', () => {
      playCelebrationFanfare();
      triggerConfetti(120);
      q5Feedback.innerHTML = `🎉 YES! Sealed for eternity! Vikas &amp; Shivangi together forever and always! 💍💕`;
    });
  }

  // =========================================================
  // 8. SLIDE 6: MINI GAME 1 - CATCH VIKAS'S KISSES
  // =========================================================
  const startGameBtn = document.getElementById('startGameBtn');
  const fallingPlayArea = document.getElementById('fallingPlayArea');
  const gameScoreText = document.getElementById('gameScoreText');
  const gameProgressFill = document.getElementById('gameProgressFill');
  const gameVictoryBox = document.getElementById('gameVictoryBox');
  const tapStartMsg = document.getElementById('tapStartMsg');

  let kissScore = 0;
  let gameInterval = null;
  const kissEmojis = ['💋', '💖', '🐾', '💌', '🌹', '✨', '🐱'];

  function spawnFallingItem() {
    if (kissScore >= 100) return;

    const item = document.createElement('div');
    item.className = 'falling-kiss-item';
    item.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];

    const areaWidth = Math.max(120, fallingPlayArea.clientWidth - 40);
    item.style.left = `${Math.random() * areaWidth + 10}px`;

    function catchKiss(e) {
      e.stopPropagation();
      playChime(750, 0.15, 'triangle');
      kissScore = Math.min(100, kissScore + 15);
      gameScoreText.textContent = `${kissScore}%`;
      gameProgressFill.style.width = `${kissScore}%`;

      const scorePop = document.createElement('span');
      scorePop.className = 'floating-catch-score';
      scorePop.textContent = '+15 Love 💖';
      scorePop.style.left = `${item.offsetLeft}px`;
      scorePop.style.top = `${item.offsetTop}px`;
      fallingPlayArea.appendChild(scorePop);
      setTimeout(() => scorePop.remove(), 800);

      item.remove();

      if (kissScore >= 100) {
        clearInterval(gameInterval);
        playCelebrationFanfare();
        triggerConfetti(80);
        gameVictoryBox.classList.add('active');
        startGameBtn.innerHTML = '<span>🎉 100% Love Completed!</span>';
      }
    }

    item.addEventListener('click', catchKiss);
    item.addEventListener('touchstart', catchKiss, { passive: false });
    fallingPlayArea.appendChild(item);

    setTimeout(() => {
      if (item.parentElement) item.remove();
    }, 3000);
  }

  if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
      kissScore = 0;
      gameScoreText.textContent = '0%';
      gameProgressFill.style.width = '0%';
      gameVictoryBox.classList.remove('active');
      if (tapStartMsg) tapStartMsg.style.display = 'none';
      if (gameInterval) clearInterval(gameInterval);
      gameInterval = setInterval(spawnFallingItem, 650);
      spawnFallingItem();
      startGameBtn.innerHTML = '<span>⚡ Catching in progress!</span>';
    });
  }

  // =========================================================
  // 9. SLIDE 7: MINI GAME 2 - SCRATCH LOVE VOUCHERS
  // =========================================================
  const scratchCards = document.querySelectorAll('.scratch-card');
  const voucherToast = document.getElementById('voucherToast');
  let revealedVouchers = 0;

  scratchCards.forEach(card => {
    card.addEventListener('click', () => {
      const cover = card.querySelector('.scratch-cover');
      if (cover && !cover.classList.contains('scratched')) {
        cover.classList.add('scratched');
        card.setAttribute('data-revealed', 'true');
        revealedVouchers++;
        playChime(880, 0.25, 'triangle');
        triggerConfetti(25);

        if (revealedVouchers >= 3) {
          voucherToast.innerHTML = '🎉 All 3 romantic vouchers unlocked by Shivangi! Vikas promises forever! 💍💖';
          playCelebrationFanfare();
        } else {
          voucherToast.innerHTML = `✨ Unlocked voucher ${revealedVouchers} of 3! Scratch the rest! 🐾`;
        }
      }
    });
  });

  // =========================================================
  // 10. SLIDE 9: MINI GAME 3 - SPIN THE BIRTHDAY WHEEL 🎡
  // =========================================================
  const wheelSvg = document.getElementById('wheelSvg');
  const wheelRotator = document.getElementById('wheelRotator');
  const spinWheelBtn = document.getElementById('spinWheelBtn');
  const wheelResultBox = document.getElementById('wheelResultBox');

  const wheelSlices = [
    { label: 'Ice Cream 🍨', color: '#ff8fab', msg: '🍨 Midnight Ice Cream Date with Vikas!' },
    { label: '100 Hugs 🤗', color: '#c084fc', msg: '🤗 100 Warm & Cozy Hugs from Vikas!' },
    { label: 'Movie Night 🎬', color: '#fbbf24', msg: '🎬 Cozy Movie Night + Snacks (Shivangi’s Pick)!' },
    { label: 'Yes Day 👑', color: '#f472b6', msg: '👑 24-Hour "Yes Day" — Vikas says YES to everything!' },
    { label: 'Long Drive 🚗', color: '#60a5fa', msg: '🚗 Late-Night Long Drive + Your Favorite Playlist!' },
    { label: 'Gift 🎁', color: '#34d399', msg: '🎁 A Special Surprise Birthday Gift from Vikas!' }
  ];

  function buildWheel() {
    if (!wheelSvg) return;
    const cx = 130, cy = 130, r = 128;
    const sliceAngle = 360 / wheelSlices.length;

    wheelSlices.forEach((slice, i) => {
      const startDeg = i * sliceAngle - 90;
      const endDeg = startDeg + sliceAngle;
      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`);
      path.setAttribute('fill', slice.color);
      path.setAttribute('stroke', '#ffffff');
      path.setAttribute('stroke-width', '2');
      wheelSvg.appendChild(path);

      const midDeg = startDeg + sliceAngle / 2;
      const midRad = (midDeg * Math.PI) / 180;
      const tx = cx + (r * 0.62) * Math.cos(midRad);
      const ty = cy + (r * 0.62) * Math.sin(midRad);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', tx);
      text.setAttribute('y', ty);
      text.setAttribute('fill', '#ffffff');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', '800');
      text.setAttribute('font-family', 'Nunito, sans-serif');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('transform', `rotate(${midDeg + 90}, ${tx}, ${ty})`);
      text.textContent = slice.label;
      wheelSvg.appendChild(text);
    });
  }

  buildWheel();

  let currentWheelRotation = 0;
  let isSpinning = false;

  if (spinWheelBtn) {
    spinWheelBtn.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      wheelResultBox.textContent = '✨ Spinning for Shivangi’s prize...';
      playChime(523.25, 0.2, 'triangle');

      const sliceAngle = 360 / wheelSlices.length;
      const winningIndex = Math.floor(Math.random() * wheelSlices.length);
      // Center of winning slice sits at top (0 deg relative to -90deg SVG start)
      const targetAngle = 360 - (winningIndex * sliceAngle + sliceAngle / 2);
      const extraSpins = 5 * 360;
      const normalizedCurrent = currentWheelRotation % 360;
      const delta = extraSpins + ((targetAngle - normalizedCurrent + 360) % 360);

      currentWheelRotation += delta;
      wheelRotator.style.transform = `rotate(${currentWheelRotation}deg)`;

      setTimeout(() => {
        isSpinning = false;
        const won = wheelSlices[winningIndex];
        wheelResultBox.innerHTML = `🎉 <strong>You Won:</strong> ${won.msg}`;
        playCelebrationFanfare();
        triggerConfetti(90);
      }, 4250);
    });
  }

  // =========================================================
  // 12. SLIDE 12: BALLOON POPPING, FIREWORKS & FINALE
  // =========================================================
  const balloonItems = document.querySelectorAll('.balloon-item');
  const balloonToastText = document.getElementById('balloonToastText');
  const grandConfettiBtn = document.getElementById('grandConfettiBtn');
  const fireworksBtn = document.getElementById('fireworksBtn');
  const replayStoryBtn = document.getElementById('replayStoryBtn');

  balloonItems.forEach(balloon => {
    balloon.addEventListener('click', () => {
      if (!balloon.classList.contains('popped')) {
        balloon.classList.add('popped');
        playChime(700, 0.15, 'triangle');
        balloonToastText.textContent = balloon.getAttribute('data-msg');
        triggerConfetti(25);
      }
    });
  });

  if (grandConfettiBtn) {
    grandConfettiBtn.addEventListener('click', () => {
      playCelebrationFanfare();
      triggerConfetti(180);
    });
  }

  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', () => {
      playCelebrationFanfare();
      launchFireworksShow(6);
    });
  }

  if (replayStoryBtn) {
    replayStoryBtn.addEventListener('click', () => goToSlide(0));
  }

  // =========================================================
  // 13. AMBIENT FLOATING HEARTS & SPARKLES CANVAS
  // =========================================================
  const ambientCanvas = document.getElementById('ambientCanvas');
  const actx = ambientCanvas ? ambientCanvas.getContext('2d') : null;
  const ambientSymbols = ['💖', '✨', '🌸', '🐾', '💕'];
  let ambientItems = [];

  function resizeAmbient() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }

  if (ambientCanvas && actx) {
    resizeAmbient();
    window.addEventListener('resize', resizeAmbient);

    for (let i = 0; i < 18; i++) {
      ambientItems.push({
        x: Math.random() * ambientCanvas.width,
        y: Math.random() * ambientCanvas.height,
        size: Math.random() * 10 + 12,
        speedY: Math.random() * 0.45 + 0.25,
        drift: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.35 + 0.18,
        symbol: ambientSymbols[i % ambientSymbols.length]
      });
    }

    function renderAmbient() {
      actx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
      ambientItems.forEach(item => {
        item.y -= item.speedY;
        item.x += item.drift;
        if (item.y < -30) {
          item.y = ambientCanvas.height + 20;
          item.x = Math.random() * ambientCanvas.width;
        }
        actx.save();
        actx.globalAlpha = item.opacity;
        actx.font = `${item.size}px sans-serif`;
        actx.fillText(item.symbol, item.x, item.y);
        actx.restore();
      });
      requestAnimationFrame(renderAmbient);
    }
    renderAmbient();
  }

  // =========================================================
  // 14. CONFETTI & FIREWORKS CANVAS ENGINE
  // =========================================================
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let confettiParticles = [];
  let fireworkParticles = [];
  let isEffectsRunning = false;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const confettiColors = ['#ff5277', '#ffa4b6', '#b366ff', '#f59e0b', '#60a5fa', '#34d399', '#ff9ff3'];
  const confettiShapes = ['circle', 'rect', 'paw', 'heart'];

  function createConfettiParticle() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    };
  }

  function triggerConfetti(count = 70) {
    resizeCanvas();
    for (let i = 0; i < count; i++) {
      confettiParticles.push(createConfettiParticle());
    }
    startEffectsLoop();
  }

  function spawnFireworkBurst(cx, cy) {
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    for (let i = 0; i < 42; i++) {
      const angle = (Math.PI * 2 * i) / 42;
      const speed = Math.random() * 4.5 + 1.5;
      fireworkParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 3.5 + 2,
        opacity: 1
      });
    }
  }

  function launchFireworksShow(bursts = 5) {
    resizeCanvas();
    for (let b = 0; b < bursts; b++) {
      setTimeout(() => {
        const bx = canvas.width * (0.2 + Math.random() * 0.6);
        const by = canvas.height * (0.18 + Math.random() * 0.42);
        spawnFireworkBurst(bx, by);
        playChime(780 + b * 60, 0.25, 'sine', 0.08);
        startEffectsLoop();
      }, b * 320);
    }
  }

  function startEffectsLoop() {
    if (!isEffectsRunning) {
      isEffectsRunning = true;
      requestAnimationFrame(renderEffects);
    }
  }

  function renderEffects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      if (p.y > canvas.height - 60) p.opacity -= 0.025;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.shape === 'rect') {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else if (p.shape === 'circle') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'heart') {
        ctx.font = `${p.size * 1.4}px sans-serif`;
        ctx.fillText('💖', -p.size / 2, p.size / 2);
      } else {
        ctx.font = `${p.size * 1.4}px sans-serif`;
        ctx.fillText('🐾', -p.size / 2, p.size / 2);
      }
      ctx.restore();

      if (p.y > canvas.height || p.opacity <= 0) confettiParticles.splice(i, 1);
    }

    for (let i = fireworkParticles.length - 1; i >= 0; i--) {
      const f = fireworkParticles[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.04; // gentle gravity
      f.opacity -= 0.018;

      ctx.save();
      ctx.globalAlpha = Math.max(0, f.opacity);
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (f.opacity <= 0) fireworkParticles.splice(i, 1);
    }

    if (confettiParticles.length > 0 || fireworkParticles.length > 0) {
      requestAnimationFrame(renderEffects);
    } else {
      isEffectsRunning = false;
    }
  }

  // Initialize
  updateSlideUI(0);
});
