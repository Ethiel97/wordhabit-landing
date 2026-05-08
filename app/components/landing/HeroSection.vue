<script setup lang="ts">
const activeHero = useCookie<'A' | 'B' | 'C'>('wh-hero', {default: () => 'A'})
</script>

<template>
  <div>
    <!-- Hero A: Stacked flashcards -->
    <section v-if="activeHero === 'A'" id="hero-form" class="hero-container hero-grid">
      <div class="hero-copy">
        <div class="pill" style="margin-bottom: 20px;">
          <span class="pill-dot"/>
          Now in private beta
        </div>
        <h1 class="display hero-heading">
          Master a <span class="text-green">new word</span> every day.
        </h1>
        <p class="hero-sub">
          Wordhabit is a mobile app that turns vocabulary into a daily ritual. Flashcards, quizzes,
          and streaks designed to make words stick — for real.
        </p>
        <WaitlistForm/>
        <SocialProof/>
      </div>
      <FlashcardStack/>
    </section>

    <!-- Hero B: Giant typography -->
    <section v-else-if="activeHero === 'B'" id="hero-form" class="hero-container hero-center">
      <div class="pill" style="margin-bottom: 28px;">
        <span class="pill-dot"/>
        Now in private beta
      </div>
      <h1 class="display hero-big-label">Today's word:</h1>
      <div class="hero-big-word-wrap">
        <h2 class="display hero-big-word">Serendipity</h2>
        <div class="pos-badge max-[880px]:static max-[880px]:mt-2.5 max-[880px]:inline-flex">noun</div>
      </div>
      <p class="hero-big-sub">
        <em>The occurrence of finding something good by chance.</em><br/>
        Build a vocabulary you actually use. One beautiful word a day.
      </p>
      <div class="hero-form-center">
        <WaitlistForm/>
      </div>
      <SocialProof centered style="margin-top: 28px;"/>
    </section>

    <!-- Hero C: Split with phone mock -->
    <section v-else id="hero-form" class="hero-container hero-grid-c">
      <div class="hero-copy">
        <div class="pill" style="margin-bottom: 20px;">
          <span class="pill-dot"/>
          iOS · Android · Web
        </div>
        <h1 class="display hero-heading-c">
          Your brain.<br/>
          <span class="text-green">Levelled up.</span><br/>
          One word at a time.
        </h1>
        <p class="hero-sub">
          A 5-minute habit that makes you sharper, more articulate,
          and impossible to ignore at dinner parties.
        </p>
        <WaitlistForm/>
        <SocialProof/>
      </div>
      <PhoneMock/>
    </section>

    <!-- Hero toggle -->
    <div class="hero-toggle max-[880px]:right-3 max-[880px]:bottom-3 max-[880px]:p-1.5">
      <span class="toggle-label max-[520px]:hidden">Hero</span>
      <button
          v-for="k in (['A', 'B'] as const)"
          :key="k"
          :class="['toggle-btn max-[520px]:px-2.5 max-[520px]:text-xs', { active: activeHero === k }]"
          @click="activeHero = k"
      >
        {{ k === 'A' ? 'Stack' : k === 'B' ? 'Big type' : 'Phone' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Shared hero layout ─────────────────────────────────────── */
.hero-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 64px 32px 96px;
}

/* Hero A */
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 48px;
  align-items: center;
}

/* Hero C */
.hero-grid-c {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 64px;
  align-items: center;
}

/* Hero B */
.hero-center {
  text-align: center;
}

.hero-copy {
  max-width: 600px;
}

.hero-heading {
  font-size: clamp(56px, 8vw, 96px);
  margin-bottom: 24px;
}

.hero-heading-c {
  font-size: clamp(56px, 7vw, 84px);
  margin-bottom: 24px;
}

.hero-sub {
  font-size: 20px;
  line-height: 1.5;
  color: var(--color-muted);
  max-width: 520px;
  margin-bottom: 36px;
}

/* Hero B specific */
.hero-big-label {
  font-size: clamp(72px, 14vw, 200px);
  line-height: 0.9;
  margin-bottom: 8px;
}

.hero-big-word-wrap {
  position: relative;
  display: inline-block;
  margin: 12px 0 32px;
}

.hero-big-word {
  font-size: clamp(96px, 18vw, 260px);
  color: var(--color-green);
  letter-spacing: -0.05em;
  line-height: 0.85;
}

.pos-badge {
  position: absolute;
  top: -8px;
  right: -56px;
  background-color: #7C3AED;
  color: white;
  padding: 8px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  transform: rotate(8deg);
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.35);
}

.hero-big-sub {
  font-size: 22px;
  line-height: 1.5;
  color: var(--color-muted);
  max-width: 620px;
  margin: 0 auto 40px;
}

.hero-form-center {
  max-width: 480px;
  margin: 0 auto;
}

/* ── Pill ───────────────────────────────────────────────────── */
.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: var(--color-green);
  display: inline-block;
}

.text-green {
  color: var(--color-green);
}

/* ── Hero toggle ────────────────────────────────────────────── */
.hero-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  background: var(--color-ink);
  color: white;
  border-radius: 9999px;
  padding: 8px;
  display: flex;
  gap: 4px;
  box-shadow: 0 8px 24px rgba(15, 27, 18, 0.3);
}

.toggle-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  padding: 8px 6px 8px 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toggle-btn {
  padding: 8px 14px;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
}

.toggle-btn.active {
  background-color: var(--color-green);
  color: white;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 880px) {
  .hero-container {
    padding: 40px 16px 72px;
  }

  .hero-grid,
  .hero-grid-c {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .hero-copy {
    max-width: none;
  }

  .hero-heading,
  .hero-heading-c {
    font-size: clamp(40px, 12vw, 56px);
  }

  .hero-sub {
    font-size: 17px;
    margin-bottom: 28px;
  }

  .hero-big-label {
    font-size: clamp(44px, 14vw, 72px);
  }

  .hero-big-word {
    font-size: clamp(64px, 18vw, 120px);
  }

  .hero-big-sub {
    font-size: 18px;
    margin-bottom: 28px;
  }

  /* Keep this scoped override: base `.pos-badge` sets a rotate transform in scoped CSS. */
  .pos-badge {
    transform: none;
  }

}
</style>
