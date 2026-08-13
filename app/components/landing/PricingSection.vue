<script setup lang="ts">
const { t } = useI18n()

const freeTier = computed(() => ({
  tier: t('landing.pricing.free.name'),
  price: '$0',
  tagline: t('landing.pricing.free.tagline'),
  features: [
    t('landing.pricing.free.features.dailyWord'),
    t('landing.pricing.free.features.review'),
    t('landing.pricing.free.features.badges'),
    t('landing.pricing.free.features.stats'),
  ],
  highlight: false,
}))

const premiumTier = computed(() => ({
  tier: t('landing.pricing.premium.name'),
  price: '$3.99',
  per: t('landing.pricing.perMonth'),
  tagline: t('landing.pricing.premium.tagline'),
  features: [
    t('landing.pricing.premium.features.unlimited'),
    t('landing.pricing.premium.features.badges'),
    t('landing.pricing.premium.features.audio'),
    t('landing.pricing.premium.features.offline'),
    t('landing.pricing.premium.features.support'),
  ],
  highlight: true,
}))

function scrollToWaitlist() {
  document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="pricing" class="pricing-section">
    <div class="section-inner">
      <!-- Header -->
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.pricing.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.pricing.headingFirst') }}
          <span class="text-green">{{ t('landing.pricing.headingEmphasis') }}</span>
        </h2>
      </div>

      <!-- Cards -->
      <div class="pricing-grid">
        <!-- Free -->
        <div class="pricing-card">
          <div class="tier-label">{{ freeTier.tier }}</div>
          <div class="price-row">
            <span class="display price">{{ freeTier.price }}</span>
          </div>
          <p class="tagline">{{ freeTier.tagline }}</p>
          <ul class="feature-list">
            <li v-for="(f, i) in freeTier.features" :key="i" class="feature-item">
              <span class="check">✓</span>
              {{ f }}
            </li>
          </ul>
          <button class="btn btn-ghost" style="width: 100%;" @click="scrollToWaitlist">
            {{ t('landing.pricing.free.cta') }}
          </button>
        </div>

        <!-- Premium -->
        <div class="pricing-card highlight">
          <div class="best-value-badge">{{ t('landing.pricing.waitlistDiscount') }}</div>
          <div class="tier-label">{{ premiumTier.tier }}</div>
          <div class="price-row">
            <span class="display price">{{ premiumTier.price }}</span>
            <span class="per">{{ premiumTier.per }}</span>
          </div>
          <p class="tagline">{{ premiumTier.tagline }}</p>
          <ul class="feature-list">
            <li v-for="(f, i) in premiumTier.features" :key="i" class="feature-item dark">
              <span class="check">✓</span>
              {{ f }}
            </li>
          </ul>
          <button class="btn btn-primary" style="width: 100%;" @click="scrollToWaitlist">
            {{ t('landing.pricing.premium.cta') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  padding: 120px 32px;
  background-color: var(--color-paper);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-heading {
  font-size: clamp(40px, 6vw, 64px);
}

.text-green {
  color: var(--color-green);
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Base card */
.pricing-card {
  border-radius: 28px;
  padding: 36px;
  background: white;
  border: 1px solid var(--color-line);
  box-shadow: var(--shadow-sm);
  position: relative;
}

/* Highlight (Premium) card */
.pricing-card.highlight {
  background: var(--color-ink);
  color: white;
  border: none;
  box-shadow: 0 24px 48px -16px rgba(15, 27, 18, 0.3);
}

.best-value-badge {
  position: absolute;
  top: -14px;
  right: 28px;
  background-color: var(--color-green);
  color: white;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}

.tier-label {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  margin-bottom: 8px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.price {
  font-size: 56px;
}

.per {
  font-size: 18px;
  opacity: 0.6;
}

.tagline {
  font-size: 15px;
  opacity: 0.7;
  margin-bottom: 24px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid var(--color-line);
}

.feature-item.dark {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.check {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background-color: var(--color-green);
  color: white;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
