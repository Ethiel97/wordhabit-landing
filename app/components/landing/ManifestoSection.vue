<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <section id="why" class="manifesto">
    <div class="pill dark-pill">{{ t('landing.manifesto.eyebrow') }}</div>

    <p class="display line">{{ t('landing.manifesto.lineOne') }}</p>
    <p class="display line">
      {{ t('landing.manifesto.lineTwoFirst') }}
      <span class="accent">{{ t('landing.manifesto.lineTwoEmphasis') }}</span>
      {{ t('landing.manifesto.lineTwoLast') }}
    </p>
    <p class="display line">
      {{ t('landing.manifesto.lineThreeFirst') }}
      <span class="accent">{{ t('landing.manifesto.lineThreeEmphasis') }}</span>
    </p>
  </section>
</template>

<style scoped>
.manifesto {
  background: var(--color-ink);
  color: white;
  text-align: center;
  padding: 110px 32px;
}

.dark-pill {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-green);
  margin-bottom: 34px;
}

.line {
  font-size: clamp(25px, 3.4vw, 38px);
  line-height: 1.12;
  letter-spacing: -0.025em;
  max-width: 21em;
  margin: 0 auto;
  text-wrap: balance;
  color: rgba(255, 255, 255, 0.92);
}

.line + .line {
  margin-top: 26px;
}

.accent {
  color: var(--color-green);
}

@media (max-width: 880px) {
  .manifesto {
    padding: 72px 24px;
  }

  .line + .line {
    margin-top: 20px;
  }
}
</style>
