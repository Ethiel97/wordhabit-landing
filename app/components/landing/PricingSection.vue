<script setup lang="ts">
const {t} = useI18n()

/**
 * Mirrors the app's own paywall comparison, so the page cannot promise
 * a feature the product does not ship. No price is printed here: the
 * amount comes from the stores per country and is shown in the app
 * before subscribing.
 */
const rows = [
  {key: 'dailyWord', free: true},
  {key: 'flashcards', free: true},
  {key: 'mastery', free: true},
  {key: 'quizModes', free: false},
  {key: 'languages', free: false},
  {key: 'streakRepair', free: false},
] as const
</script>

<template>
  <section id="pricing" class="pricing-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.pricing.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.pricing.headingFirst') }}
          <span class="text-green">{{ t('landing.pricing.headingEmphasis') }}</span>
        </h2>
        <p class="section-desc">{{ t('landing.pricing.description') }}</p>
      </div>

      <div class="pricing-table">
        <div class="thead">
          <div class="feature-col"/>
          <div class="plan">
            <span class="plan-name">{{ t('landing.pricing.free.name') }}</span>
            <span class="plan-badge free-badge">{{ t('landing.pricing.free.badge') }}</span>
          </div>
          <div class="plan">
            <span class="plan-name">{{ t('landing.pricing.pro.name') }}</span>
            <span class="plan-badge">{{ t('landing.pricing.pro.badge') }}</span>
          </div>
        </div>

        <div v-for="row in rows" :key="row.key" class="row">
          <div class="feature-col">{{ t(`landing.pricing.rows.${row.key}`) }}</div>
          <div class="cell">
            <span v-if="row.free" class="check" :aria-label="t('landing.pricing.free.name')">
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="var(--color-green)"/>
                <path
                    d="M6 10.2l2.6 2.6L14 7.5"
                    stroke="white"
                    stroke-width="2.2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </span>
            <span v-else class="dash" aria-hidden="true">–</span>
          </div>
          <div class="cell">
            <span class="check">
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="var(--color-green)"/>
                <path
                    d="M6 10.2l2.6 2.6L14 7.5"
                    stroke="white"
                    stroke-width="2.2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <p class="price-note">{{ t('landing.pricing.priceNote') }}</p>

      <div class="cta">
        <StoreBadges context="landing" center/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  padding: 96px 32px;
}

.section-inner {
  max-width: 880px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin: 0 auto 48px;
}

.section-heading {
  font-size: clamp(32px, 5vw, 48px);
  text-wrap: balance;
}

.section-desc {
  margin: 18px auto 0;
  max-width: 44em;
  font-size: 16.5px;
  line-height: 1.6;
  color: var(--color-muted);
  text-wrap: pretty;
}

.text-green {
  color: var(--color-green);
}

.pricing-table {
  width: 100%;
  background: white;
  border: 1px solid var(--color-line);
  border-radius: 20px;
  overflow: hidden;
}

.thead,
.row {
  display: grid;
  grid-template-columns: 1fr 120px 120px;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
}

.thead {
  background: var(--color-paper);
  border-bottom: 1px solid var(--color-line);
}

.row + .row,
.thead + .row {
  border-top: 1px solid var(--color-line);
}

.plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.plan-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.plan-badge {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.free-badge {
  color: var(--color-green-700);
}

.feature-col {
  font-size: 14.5px;
  line-height: 1.45;
  color: var(--color-ink-2);
}

.cell {
  display: grid;
  place-items: center;
}

.dash {
  color: var(--color-muted-2);
  font-size: 16px;
}

.check {
  display: grid;
  place-items: center;
}

.price-note {
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: var(--color-muted);
}

.cta {
  margin-top: 32px;
}

@media (max-width: 880px) {
  .pricing-section {
    padding: 64px 20px;
  }

  .thead,
  .row {
    grid-template-columns: 1fr 72px 72px;
    padding: 14px 16px;
    gap: 8px;
  }

  .feature-col {
    font-size: 13.5px;
  }
}
</style>
