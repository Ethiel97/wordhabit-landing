<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <!-- id="ios-notify": the store badges' "coming soon" and the hero
       hint both scroll here, so the iOS capture is the section's anchor. -->
  <section id="ios-notify" class="cta-section">
    <div class="cta-inner">
      <h2 class="display cta-heading">
        {{ t('landing.finalCta.headingFirst') }} <br/>
        {{ t('landing.finalCta.headingLast') }}
      </h2>
      <p class="cta-sub">{{ t('landing.launch.finalSub') }}</p>

      <StoreBadges context="landing" center light class="cta-badges"/>

      <div class="cta-form">
        <p class="cta-form-label">{{ t('landing.launch.iosCaptureLabel') }}</p>
        <WaitlistForm/>
      </div>

      <p class="cta-free">{{ t('landing.launch.freeForever') }}</p>
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
  margin-bottom: 32px;
  opacity: 0.9;
  line-height: 1.5;
}

.cta-badges {
  margin-bottom: 32px;
}

.cta-form {
  max-width: 480px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 24px 48px -12px rgba(15, 27, 18, 0.35);
}

.cta-form-label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.45;
  margin-bottom: 12px;
}

.cta-free {
  margin-top: 24px;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.92;
}

@media (max-width: 880px) {
  .cta-section {
    padding: 64px 16px;
  }
}
</style>
