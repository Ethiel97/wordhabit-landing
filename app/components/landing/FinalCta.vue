<script setup lang="ts">
const {waitlistCount} = useWaitlist()
const {t} = useI18n()
</script>

<template>
  <section class="cta-section">
    <div class="cta-inner">
      <h2 class="display cta-heading">
        {{ t('landing.finalCta.headingFirst') }} <br/>
        {{ t('landing.finalCta.headingLast') }}
      </h2>
      <p class="cta-sub">
        {{ t('landing.finalCta.description', { count: waitlistCount.count + 1500 }) }}
      </p>
      <div class="cta-form">
        <WaitlistForm/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 100px 32px;
  background-color: var(--color-green);
  color: white;
  text-align: center;
}

.cta-inner {
  max-width: 720px;
  margin: 0 auto;
}

.cta-heading {
  font-size: clamp(48px, 8vw, 88px);
  margin-bottom: 24px;
  color: white;
}

.cta-sub {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.5;
}

.cta-form {
  max-width: 480px;
  margin: 0 auto;
}
</style>
