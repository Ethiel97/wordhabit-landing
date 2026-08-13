<script setup lang="ts">
const { t } = useI18n()

const features = computed(() => [
  {
    icon: '📇',
    color: '#22C55E',
    bg: '#DCFCE7',
    title: t('landing.features.items.flashcards.title'),
    desc: t('landing.features.items.flashcards.description'),
  },
  {
    icon: '✨',
    color: '#7C3AED',
    bg: '#F3E8FF',
    title: t('landing.features.items.dailyWord.title'),
    desc: t('landing.features.items.dailyWord.description'),
  },
  {
    icon: '🏆',
    color: '#F97316',
    bg: '#FFEDD5',
    title: t('landing.features.items.streaks.title'),
    desc: t('landing.features.items.streaks.description'),
  },
  {
    icon: '🎯',
    color: '#EC4899',
    bg: '#FCE7F3',
    title: t('landing.features.items.quizzes.title'),
    desc: t('landing.features.items.quizzes.description'),
  },
  {
    icon: '🌍',
    color: '#3B82F6',
    bg: '#DBEAFE',
    title: t('landing.features.items.interests.title'),
    desc: t('landing.features.items.interests.description'),
  },
  {
    icon: '👥',
    color: '#0F1B12',
    bg: '#E6E8E4',
    title: t('landing.features.items.friends.title'),
    desc: t('landing.features.items.friends.description'),
  },
])
</script>

<template>
  <section id="features" class="features-section">
    <div class="section-inner">
      <!-- Header -->
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.features.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.features.headingFirst') }}
          <span class="text-green">{{ t('landing.features.headingEmphasis') }}</span>
        </h2>
        <p class="section-sub">
          {{ t('landing.features.description') }}
        </p>
      </div>

      <!-- Grid -->
      <div class="features-grid">
        <div
            v-for="(f, i) in features"
            :key="i"
            class="feature-card"
        >
          <div class="feature-icon" :style="{ background: f.bg, color: f.color }">
            {{ f.icon }}
          </div>
          <h3 class="display feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 120px 32px;
  background: white;
  border-top: 1px solid var(--color-line);
}

.section-inner {
  max-width: 1240px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 64px;
}

.section-heading {
  font-size: clamp(40px, 6vw, 64px);
  margin-bottom: 16px;
}

.text-green {
  color: var(--color-green);
}

.section-sub {
  font-size: 18px;
  color: var(--color-muted);
  line-height: 1.5;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  background-color: var(--color-paper);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--color-line);
  transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.feature-desc {
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-muted);
}

@media (max-width: 880px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 640px) and (max-width: 880px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
