<script setup lang="ts">
const props = withDefaults(defineProps<{
  context: 'landing' | 'word_page'
  center?: boolean
  light?: boolean
}>(), {center: false, light: false})

const config = useRuntimeConfig()
const {t} = useI18n()
const {trackStoreClick} = useAnalytics()
const heroVariant = useHeroVariant()

function trackClick(store: 'play_store' | 'app_store') {
  trackStoreClick(
    store,
    props.context,
    undefined,
    props.context === 'landing' ? heroVariant.value : undefined,
  )
}

function scrollToNotify(event: MouseEvent) {
  event.preventDefault()
  document.getElementById('ios-notify')?.scrollIntoView({behavior: 'smooth'})
}
</script>

<template>
  <div class="badges" :class="{center}">
    <a
        class="badge"
        :href="config.public.playStoreUrl"
        :aria-label="t('landing.launch.playAria')"
        @click="trackClick('play_store')"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 2.7v18.6c0 .6.7 1 1.2.6l1-.6L16 12 6.2 2.7l-1-.6C4.7 1.7 4 2.1 4 2.7z" fill="#4CC9F0"/>
        <path d="M16 12l3.8-2.2c.9.5.9 1.9 0 2.4L16 12z" fill="#FFD166"/>
        <path d="M6.2 2.7L16 12l3.8-2.2L7.4 2.3c-.4-.2-.9-.2-1.2.4z" fill="#22C55E"/>
        <path d="M6.2 21.3L16 12l3.8 2.2-12.4 7.5c-.4.2-.9.2-1.2-.4z" fill="#F97316"/>
      </svg>
      <span class="t">
        <small>{{ t('landing.launch.getOn') }}</small>
        <b>{{ t('landing.launch.googlePlay') }}</b>
      </span>
    </a>

    <a
        v-if="config.public.appStoreUrl"
        class="badge"
        :href="config.public.appStoreUrl"
        :aria-label="t('landing.launch.appStore')"
        @click="trackClick('app_store')"
    >
      <SharedWordAppleIcon/>
      <span class="t">
        <small>{{ t('landing.launch.downloadOn') }}</small>
        <b>{{ t('landing.launch.appStore') }}</b>
      </span>
    </a>
    <a
        v-else
        class="badge soon"
        :class="{light}"
        href="#ios-notify"
        :aria-label="t('landing.launch.appStoreAria')"
        @click="scrollToNotify"
    >
      <SharedWordAppleIcon :color="light ? 'rgba(255,255,255,0.85)' : 'var(--color-muted)'"/>
      <span class="t">
        <small>{{ t('landing.launch.comingSoon') }}</small>
        <b>{{ t('landing.launch.appStore') }}</b>
      </span>
    </a>
  </div>
</template>

<style scoped>
.badges {
  display: flex;
  align-items: stretch;
  gap: 12px;
  flex-wrap: wrap;
}

.badges.center {
  justify-content: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  background: var(--color-ink);
  color: white;
  border-radius: 14px;
  padding: 9px 19px 9px 14px;
  min-height: 56px;
  text-align: left;
  box-shadow: 0 4px 0 0 #000, 0 12px 24px -8px rgba(15, 27, 18, 0.35);
}

.badge .t {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.badge .t small {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.72;
}

.badge .t b {
  font-size: 16.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.badge.soon {
  background: white;
  color: var(--color-muted);
  box-shadow: inset 0 0 0 1.5px var(--color-line), 0 4px 0 0 var(--color-line);
}

.badge.soon.light {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.35), 0 4px 0 0 rgba(255, 255, 255, 0.15);
}
</style>
