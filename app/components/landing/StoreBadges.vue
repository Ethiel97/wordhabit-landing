<script setup lang="ts">
const props = withDefaults(defineProps<{
  context: 'landing' | 'word_page' | 'pro_page'
  center?: boolean
  light?: boolean
  wordId?: string
  compact?: boolean
  preferredStoreOnly?: boolean
  placement?: 'inline' | 'sticky'
}>(), {
  center: false,
  light: false,
  compact: false,
  preferredStoreOnly: false,
  placement: 'inline',
})

const config = useRuntimeConfig()
const {t, locale} = useI18n()
const {trackStoreClick} = useAnalytics()
const heroVariant = useHeroVariant()
const isWordPage = computed(() => props.context === 'word_page')
const playStoreUrl = usePlayStoreLink(
  props.context,
  toRef(props, 'wordId'),
  toRef(props, 'placement'),
)
const appStoreUrl = computed(() => config.public.appStoreUrl
  || 'https://apps.apple.com/app/wordhabit/id6798891376')

const requestUserAgent = import.meta.server ? useRequestHeader('user-agent') ?? '' : navigator.userAgent
// A compact sticky CTA has room for one store. Once iOS is available,
// Apple mobile visitors get the App Store while everyone else gets Play.
const prefersAppStore = computed(() => /iPad|iPhone|iPod/i.test(requestUserAgent))
const showPlayStore = computed(() => !props.preferredStoreOnly || !prefersAppStore.value)
const showAppStore = computed(() => !props.preferredStoreOnly || prefersAppStore.value)

// Official localized artwork, used unmodified: Apple's black "Download on
// the App Store" badge and Google's "Get it on Google Play" badge, with its
// transparent padding cropped so both images share the same visible height.
// Locales without their own artwork fall back to English.
const englishArtwork = {
  appStore: {src: '/badges/app-store-en.svg', width: 120, height: 40},
  googlePlay: {src: '/badges/google-play-en.png', width: 564, height: 168},
}
const artworkByLocale: Partial<Record<string, typeof englishArtwork>> = {
  en: englishArtwork,
  fr: {
    appStore: {src: '/badges/app-store-fr.svg', width: 127, height: 40},
    googlePlay: {src: '/badges/google-play-fr.png', width: 646, height: 192},
  },
  es: {
    appStore: {src: '/badges/app-store-es.svg', width: 120, height: 40},
    googlePlay: {src: '/badges/google-play-es.png', width: 646, height: 192},
  },
}
const artwork = computed(() => artworkByLocale[locale.value] ?? englishArtwork)

// Both stores ask for clear space of a quarter of the badge height around
// each badge, so the gap tracks the height.
const badgeClass = computed(() => props.compact ? 'h-10 w-auto' : 'h-12 w-auto sm:h-14')
const gapClass = computed(() => props.compact ? 'gap-2.5' : 'gap-3 sm:gap-3.5')

function trackClick(store: 'play_store' | 'app_store') {
  trackStoreClick(
    store,
    props.context,
    props.wordId,
    props.context === 'landing' ? heroVariant.value : undefined,
    props.placement,
  )
}

</script>

<template>
  <div class="flex flex-wrap items-center" :class="[{'justify-center': center}, gapClass]">
    <!-- Apple asks for the App Store badge first in a lineup. -->
    <a
        v-if="showAppStore"
        class="inline-flex shrink-0"
        :href="appStoreUrl"
        :aria-label="isWordPage ? t('sharedWord.aria.appStore') : t('landing.launch.appStoreAria')"
        @click="trackClick('app_store')"
    >
      <img
          :src="artwork.appStore.src"
          :width="artwork.appStore.width"
          :height="artwork.appStore.height"
          :class="badgeClass"
          alt=""
      >
    </a>

    <a
        v-if="showPlayStore"
        class="inline-flex shrink-0"
        :href="playStoreUrl"
        :aria-label="isWordPage ? t('sharedWord.aria.googlePlay') : t('landing.launch.playAria')"
        @click="trackClick('play_store')"
    >
      <img
          :src="artwork.googlePlay.src"
          :width="artwork.googlePlay.width"
          :height="artwork.googlePlay.height"
          :class="badgeClass"
          alt=""
      >
    </a>
  </div>
</template>
