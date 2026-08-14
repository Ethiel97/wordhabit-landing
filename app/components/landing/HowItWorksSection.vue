<script setup lang="ts">
const {t} = useI18n()

/** The four beats of the app's real daily journey, in order. */
const steps = computed(() => [
  {key: 'discover', icon: 'eye'},
  {key: 'practice', icon: 'cards'},
  {key: 'master', icon: 'brain'},
  {key: 'review', icon: 'clock'},
] as const)
</script>

<template>
  <section id="how-it-works" class="how-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.howItWorks.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.howItWorks.headingFirst') }}
          <span class="text-green">{{ t('landing.howItWorks.headingEmphasis') }}</span>
        </h2>
      </div>

      <ol class="steps">
        <li v-for="step in steps" :key="step.key" class="step">
          <div class="circle-wrap">
            <span class="circle">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <g v-if="step.icon === 'eye'">
                  <ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.8"/>
                  <circle cx="12" cy="12" r="2.6" fill="currentColor"/>
                </g>
                <g v-else-if="step.icon === 'cards'" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="7.5" y="3.5" width="12" height="15" rx="2.5" transform="rotate(6 13.5 11)"/>
                  <rect x="4" y="5.5" width="12" height="15" rx="2.5" fill="white"/>
                </g>
                <g v-else-if="step.icon === 'brain'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <path d="M11 4.5a3.2 3.2 0 0 0-3.2 3.2c-2 .3-3.3 1.7-3.3 3.6 0 1.4.7 2.5 1.8 3.1-.1 2.2 1.4 3.9 3.5 3.9 1.1 0 1.2-.5 1.2-1.2V5.7c0-.7-.3-1.2-1.2-1.2z" transform="translate(1.2 0)"/>
                  <path d="M13 4.5a3.2 3.2 0 0 1 3.2 3.2c2 .3 3.3 1.7 3.3 3.6 0 1.4-.7 2.5-1.8 3.1.1 2.2-1.4 3.9-3.5 3.9-1.1 0-1.2-.5-1.2-1.2V5.7c0-.7.3-1.2 1.2-1.2z" transform="translate(-1.2 0)"/>
                </g>
                <g v-else fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <circle cx="12" cy="12" r="8.5"/>
                  <path d="M12 7.5V12l3.2 2"/>
                </g>
              </svg>
            </span>
          </div>
          <div class="text">
            <h3 class="step-title">{{ t(`landing.howItWorks.steps.${step.key}.title`) }}</h3>
            <p class="step-desc">{{ t(`landing.howItWorks.steps.${step.key}.description`) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  padding: 96px 32px;
}

.section-inner {
  max-width: 1120px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 56px;
}

.section-heading {
  font-size: clamp(32px, 5vw, 48px);
  text-wrap: balance;
}

.text-green {
  color: var(--color-green);
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  list-style: none;
}

.step {
  text-align: center;
}

.circle-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

/* The connector runs between circles, so the last step has none. */
.circle-wrap::after {
  content: '';
  position: absolute;
  top: 27px;
  left: calc(50% + 42px);
  width: calc(100% - 60px);
  height: 2px;
  background: var(--color-line);
}

.step:last-child .circle-wrap::after {
  display: none;
}

.circle {
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background: white;
  border: 2px solid var(--color-green);
  color: var(--color-green-700);
  display: grid;
  place-items: center;
  box-shadow: 0 2px 8px rgba(15, 27, 18, 0.06);
}

.step-title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.step-desc {
  margin-top: 8px;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--color-muted);
  text-wrap: pretty;
}

@media (max-width: 880px) {
  .how-section {
    padding: 64px 20px;
  }

  .section-header {
    margin-bottom: 36px;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 340px;
    margin: 0 auto;
  }

  .step {
    display: flex;
    gap: 18px;
    text-align: left;
    padding-bottom: 28px;
  }

  .circle-wrap {
    margin-bottom: 0;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .circle-wrap::after {
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% - 60px);
  }

  .text {
    padding-top: 6px;
  }
}
</style>
