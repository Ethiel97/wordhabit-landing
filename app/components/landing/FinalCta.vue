<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <!-- id="ios-notify": the store badges' "coming soon" and the hero
       hint both scroll here, so the iOS capture is the section's anchor. -->
  <section id="ios-notify" class="bg-green px-8 py-[100px] text-center text-white max-[880px]:px-4 max-[880px]:py-16">
    <div class="mx-auto max-w-[720px]">
      <h2 class="mb-6 font-display text-[clamp(48px,8vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
        {{ t('landing.finalCta.headingFirst') }} <br/>
        {{ t('landing.finalCta.headingLast') }}
      </h2>
      <p class="mb-8 text-xl leading-[1.5] opacity-90">{{ t('landing.launch.finalSub') }}</p>

      <StoreBadges context="landing" center light class="mb-8"/>

      <div class="mx-auto max-w-[480px] rounded-[20px] bg-white p-5 text-left shadow-[0_24px_48px_-12px_rgba(15,27,18,0.35)]">
        <p class="mb-3 text-[13.5px] font-semibold leading-[1.45] text-ink">{{ t('landing.launch.iosCaptureLabel') }}</p>
        <WaitlistForm/>
      </div>

      <p class="mt-6 text-sm font-semibold opacity-92">{{ t('landing.launch.freeForever') }}</p>
    </div>
  </section>
</template>
