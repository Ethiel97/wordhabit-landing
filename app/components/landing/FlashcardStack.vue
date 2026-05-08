<template>
  <div class="card-scene">
    <!-- Back card -->
    <div class="back-card">
      <div class="back-label">Synonyms</div>
      <div class="back-content">
        Chance, Fluke, Luck, Fortune, Coincidence, Blessing
      </div>
    </div>

    <!-- Main card -->
    <div class="main-card">
      <div class="card-header">
        <div class="card-tag">Word of the day</div>
        <div class="sound-btn">♪</div>
      </div>

      <h3 class="display word-title">Serendipity</h3>

      <div class="card-meaning">
        <strong>Meaning:</strong> The occurrence of finding something good or pleasant by chance.
      </div>
      <div class="card-example">
        "It was pure serendipity that I met my best friend on a delayed flight."
      </div>

      <div class="card-footer">
        <span class="lang-select">English ▾</span>
        <div class="card-actions">
          <button class="icon-btn">★</button>
          <button class="icon-btn">↗</button>
        </div>
      </div>
    </div>

    <!-- Floating badges -->
    <FloatingBadge class="mobile-hide-badge" color="#7C3AED" emoji="🏆" :top="0" :left="50" :rotate="-12" />
    <FloatingBadge class="mobile-hide-badge" color="#22C55E" emoji="🎯" :top="310" :right="20" :rotate="15" />
    <FloatingBadge class="mobile-hide-badge" color="#3B82F6" emoji="📚" :top="420" :left="80" :rotate="-8" :size="56" />
    <FloatingBadge class="mobile-hide-badge" color="#EC4899" emoji="🔥" :top="150" :right="0" :rotate="20" :size="56" />
  </div>
</template>

<style scoped>
.card-scene {
  position: relative;
  height: 540px;
  perspective: 1200px;
}

.back-card {
  position: absolute;
  top: 60px;
  right: 40px;
  width: 320px;
  padding: 28px 26px;
  background: white;
  border-radius: 24px;
  box-shadow: var(--shadow-md);
  transform: rotate(8deg);
  border: 1px solid var(--color-line);
}

.back-label {
  font-size: 12px;
  color: var(--color-muted);
  margin-bottom: 6px;
  font-weight: 600;
}

.back-content {
  font-size: 15px;
  color: var(--color-ink);
  line-height: 1.5;
}

.main-card {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 380px;
  padding: 32px;
  background: white;
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  transform: rotate(-6deg);
  border: 1px solid var(--color-line);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.card-tag {
  font-size: 12px;
  color: var(--color-muted);
  font-weight: 600;
}

.sound-btn {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background-color: var(--color-green-50);
  color: var(--color-green-700);
  display: grid;
  place-items: center;
  font-size: 16px;
}

.word-title {
  font-size: 44px;
  color: var(--color-green);
  margin-bottom: 16px;
}

.card-meaning {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-ink-2);
}

.card-example {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-muted);
  margin-top: 12px;
  font-style: italic;
}

.card-footer {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-select {
  font-size: 12px;
  color: var(--color-muted);
}

.card-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--color-paper);
  color: var(--color-muted);
  display: grid;
  place-items: center;
  font-size: 14px;
  cursor: pointer;
}

@media (max-width: 880px) {
  .card-scene {
    height: 460px;
  }

  .back-card {
    width: min(300px, calc(100% - 24px));
    right: 8px;
    top: 44px;
    transform: rotate(4deg);
  }

  .main-card {
    width: min(330px, calc(100% - 24px));
    left: 8px;
    top: 22px;
    transform: rotate(-3deg);
    padding: 24px;
  }
}

@media (max-width: 520px) {
  .card-scene {
    height: 420px;
  }

  .back-card,
  .main-card {
    position: relative;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    transform: none;
  }

  .back-card {
    margin-bottom: 12px;
    padding: 18px;
  }

  .main-card {
    padding: 20px;
  }

  .word-title {
    font-size: 34px;
  }

  .mobile-hide-badge {
    display: none;
  }
}
</style>
