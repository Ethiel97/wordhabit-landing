<script setup lang="ts">
const props = withDefaults(defineProps<{
  context: 'landing' | 'word_page'
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
const {t} = useI18n()
const {trackStoreClick} = useAnalytics()
const heroVariant = useHeroVariant()
const isWordPage = computed(() => props.context === 'word_page')
const playStoreUrl = usePlayStoreLink(
  props.context,
  toRef(props, 'wordId'),
  toRef(props, 'placement'),
)

const requestUserAgent = import.meta.server ? useRequestHeader('user-agent') ?? '' : navigator.userAgent
// A compact sticky CTA has room for one store. Once iOS is available,
// Apple mobile visitors get the App Store while everyone else gets Play.
const prefersAppStore = computed(() => Boolean(config.public.appStoreUrl)
  && /iPad|iPhone|iPod/i.test(requestUserAgent))
const showPlayStore = computed(() => !props.preferredStoreOnly || !prefersAppStore.value)
const showAvailableAppStore = computed(() => Boolean(config.public.appStoreUrl)
  && (!props.preferredStoreOnly || prefersAppStore.value))

const badgeClass = computed(() => [
  'inline-flex items-center bg-ink text-left text-white',
  props.compact
    ? 'min-h-11 gap-2 rounded-xl py-2 pr-4 pl-3 shadow-[0_3px_0_0_#000,0_8px_18px_-8px_rgba(15,27,18,0.4)] transition-[transform,box-shadow] duration-100 ease-in-out active:translate-y-0.5 active:shadow-[0_1px_0_0_#000,0_4px_10px_-6px_rgba(15,27,18,0.35)] [&>svg]:h-5 [&>svg]:w-5'
    : isWordPage.value
    ? 'min-h-[58px] py-2.5 pr-5 pl-[15px] transition-[transform,box-shadow] duration-100 ease-in-out hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_#000,0_6px_12px_-6px_rgba(15,27,18,0.3)]'
    : 'min-h-14 py-[9px] pr-[19px] pl-3.5',
  !props.compact ? 'gap-[11px] rounded-[14px] shadow-[0_4px_0_0_#000,0_12px_24px_-8px_rgba(15,27,18,0.35)]' : '',
])

const soonClass = computed(() => [
  'inline-flex items-center gap-[11px] rounded-[14px] text-left',
  isWordPage.value
    ? 'min-h-[58px] cursor-default bg-transparent py-2.5 pr-5 pl-[15px] text-muted shadow-[inset_0_0_0_1.5px_var(--color-line)]'
    : 'min-h-14 py-[9px] pr-[19px] pl-3.5',
  !isWordPage.value && props.light
    ? 'bg-transparent text-[rgba(255,255,255,0.85)] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.35),0_4px_0_0_rgba(255,255,255,0.15)]'
    : '',
  !isWordPage.value && !props.light
    ? 'bg-white text-muted shadow-[inset_0_0_0_1.5px_var(--color-line),0_4px_0_0_var(--color-line)]'
    : '',
])

const labelClass = computed(() => [
  'flex flex-col',
  props.compact ? 'leading-[1.05]' : 'leading-[1.15]',
])
const captionClass = computed(() => [
  'font-semibold tracking-[0.05em] uppercase opacity-[0.72]',
  props.compact ? 'text-[8.5px]' : 'text-[9.5px]',
])
const storeNameClass = computed(() => [
  'font-bold tracking-[-0.01em]',
  props.compact ? 'text-[14.5px]' : isWordPage.value ? 'text-[17px]' : 'text-[16.5px]',
])
const storeCopy = computed(() => isWordPage.value
  ? {
      getOn: t('sharedWord.store.getOn'),
      googlePlay: t('sharedWord.store.googlePlay'),
      downloadOn: t('sharedWord.store.downloadOn'),
      appStore: t('sharedWord.store.appStore'),
      comingSoon: t('sharedWord.store.comingSoon'),
    }
  : {
      getOn: t('landing.launch.getOn'),
      googlePlay: t('landing.launch.googlePlay'),
      downloadOn: t('landing.launch.downloadOn'),
      appStore: t('landing.launch.appStore'),
      comingSoon: t('landing.launch.comingSoon'),
    })

function trackClick(store: 'play_store' | 'app_store') {
  trackStoreClick(
    store,
    props.context,
    props.wordId,
    props.context === 'landing' ? heroVariant.value : undefined,
    props.placement,
  )
}

function scrollToNotify(event: MouseEvent) {
  event.preventDefault()
  document.getElementById('ios-notify')?.scrollIntoView({behavior: 'smooth'})
}
</script>

<template>
  <div class="flex flex-wrap items-stretch" :class="[{'justify-center': center}, compact ? 'gap-2' : 'gap-3']">
    <a
        v-if="showPlayStore"
        :class="badgeClass"
        :href="playStoreUrl"
        :aria-label="isWordPage ? t('sharedWord.aria.googlePlay') : t('landing.launch.playAria')"
        @click="trackClick('play_store')"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 2.7v18.6c0 .6.7 1 1.2.6l1-.6L16 12 6.2 2.7l-1-.6C4.7 1.7 4 2.1 4 2.7z" fill="#4CC9F0"/>
        <path d="M16 12l3.8-2.2c.9.5.9 1.9 0 2.4L16 12z" fill="#FFD166"/>
        <path d="M6.2 2.7L16 12l3.8-2.2L7.4 2.3c-.4-.2-.9-.2-1.2.4z" fill="#22C55E"/>
        <path d="M6.2 21.3L16 12l3.8 2.2-12.4 7.5c-.4.2-.9.2-1.2-.4z" fill="#F97316"/>
      </svg>
      <span :class="labelClass">
        <small :class="captionClass">{{ storeCopy.getOn }}</small>
        <b :class="storeNameClass">{{ storeCopy.googlePlay }}</b>
      </span>
    </a>

    <a
        v-if="showAvailableAppStore"
        :class="badgeClass"
        :href="config.public.appStoreUrl"
        :aria-label="isWordPage ? t('sharedWord.aria.appStore') : t('landing.launch.appStore')"
        @click="trackClick('app_store')"
    >
      <SharedWordAppleIcon/>
      <span :class="labelClass">
        <small :class="captionClass">{{ storeCopy.downloadOn }}</small>
        <b :class="storeNameClass">{{ storeCopy.appStore }}</b>
      </span>
    </a>
    <a
        v-else-if="!preferredStoreOnly && !isWordPage"
        :class="soonClass"
        href="#ios-notify"
        :aria-label="t('landing.launch.appStoreAria')"
        @click="scrollToNotify"
    >
      <SharedWordAppleIcon :color="light ? 'rgba(255,255,255,0.85)' : 'var(--color-muted)'"/>
      <span :class="labelClass">
        <small :class="captionClass">{{ storeCopy.comingSoon }}</small>
        <b :class="storeNameClass">{{ storeCopy.appStore }}</b>
      </span>
    </a>
    <span v-else-if="!preferredStoreOnly" :class="soonClass">
      <SharedWordAppleIcon color="var(--color-muted-2)"/>
      <span :class="labelClass">
        <small :class="captionClass">{{ storeCopy.comingSoon }}</small>
        <b :class="storeNameClass">{{ storeCopy.appStore }}</b>
      </span>
    </span>
  </div>
</template>
