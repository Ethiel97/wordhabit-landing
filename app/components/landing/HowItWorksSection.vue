<script setup lang="ts">
const steps = [
  {
    n: '01',
    title: 'Pick what excites you',
    desc: "Science, history, business, slang — choose interests so we serve words you'll actually use.",
    accent: '#22C55E',
  },
  {
    n: '02',
    title: 'Five minutes a day',
    desc: 'A new word in the morning. A quick review at lunch. A flashcard sweep at night. That\'s it.',
    accent: '#7C3AED',
  },
  {
    n: '03',
    title: 'Watch it compound',
    desc: "After 30 days you've banked 30 words. After a year, you're fluent in a richer version of yourself.",
    accent: '#F97316',
  },
]
</script>

<template>
  <section id="how-it-works" class="how-section">
    <div class="section-inner">
      <!-- Header -->
      <div class="section-header">
        <div class="pill dark-pill" style="margin-bottom: 16px;">How it works</div>
        <h2 class="display section-heading">
          Three steps. <br />
          <span class="text-green">One habit.</span>
        </h2>
      </div>

      <!-- Steps grid -->
      <div class="steps-grid">
        <div v-for="(s, i) in steps" :key="i" class="step-card">
          <div class="display step-number" :style="{ color: s.accent }">{{ s.n }}</div>
          <h3 class="display step-title">{{ s.title }}</h3>
          <p class="step-desc">{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  padding: 120px 32px;
  background-color: var(--color-ink);
  color: white;
}

.section-inner {
  max-width: 1240px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-heading {
  font-size: clamp(40px, 6vw, 64px);
}

.text-green {
  color: var(--color-green);
}

.dark-pill {
  background: rgba(34, 197, 94, 0.18);
  color: var(--color-green);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.step-card {
  padding: 32px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.step-number {
  font-size: 56px;
  margin-bottom: 24px;
  font-weight: 800;
}

.step-title {
  font-size: 26px;
  margin-bottom: 12px;
  font-weight: 700;
}

.step-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
}

@media (max-width: 880px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>