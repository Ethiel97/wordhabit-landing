<script setup lang="ts">
const props = withDefaults(defineProps<{width?: number}>(), {width: 340})

const {t} = useI18n()

const bezel = computed(() => Math.round(props.width * 0.034))
const outerRadius = computed(() => props.width * 0.155)
</script>

<template>
  <div
      class="phone"
      :style="{width: `${width}px`, borderRadius: `${outerRadius}px`, padding: `${bezel}px`}"
  >
    <div class="screen" :style="{borderRadius: `${outerRadius - bezel}px`}">
      <div class="sbar">
        <span>9:41</span>
        <svg width="34" height="11" viewBox="0 0 34 11" fill="var(--color-ink)" aria-hidden="true">
          <rect x="0" y="6" width="2.4" height="4" rx="0.8"/>
          <rect x="3.8" y="4" width="2.4" height="6" rx="0.8"/>
          <rect x="7.6" y="2" width="2.4" height="8" rx="0.8"/>
          <path d="M14 5.2a5.6 5.6 0 0 1 7 0l-1.2 1.4a3.8 3.8 0 0 0-4.6 0z"/>
          <circle cx="17.5" cy="8.6" r="1.4"/>
          <rect x="24" y="2.5" width="9" height="6" rx="2" fill="none" stroke="var(--color-ink)" stroke-width="1"/>
          <rect x="25.2" y="3.7" width="5.2" height="3.6" rx="1"/>
        </svg>
      </div>
      <!-- The capture carries the device's own status bar; the crop hides
           it so the drawn one above stays the only clock on screen. -->
      <div class="crop">
        <NuxtImg
            class="phone-shot-image"
            src="/app-home.webp"
            :alt="t('landing.launch.screenshotAlt')"
            width="680"
            height="1517"
            sizes="340px"
            densities="x1 x2"
            format="webp"
            quality="80"
            :preload="{fetchPriority: 'high'}"
            fetchpriority="high"
            loading="eager"
            decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  background: var(--color-ink);
  box-shadow: 0 24px 48px -12px rgba(15, 27, 18, 0.35);
}

.screen {
  overflow: hidden;
  background: #F8FAF8;
}

.sbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-ink);
  background: #F8FAF8;
}

.crop {
  overflow: hidden;
}

.phone-shot-image {
  display: block;
  width: 100%;
  height: auto;
  margin-top: -13.9%;
}
</style>
