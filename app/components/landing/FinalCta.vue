<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <section class="bg-green px-8 py-[100px] text-center text-white max-[880px]:px-4 max-[880px]:py-16">
    <div class="mx-auto max-w-[720px]">
      <h2 class="mb-6 font-display text-[clamp(48px,8vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
        {{ t('landing.finalCta.headingFirst') }} <br/>
        {{ t('landing.finalCta.headingLast') }}
      </h2>
      <p class="mb-8 text-xl leading-[1.5] opacity-90">{{ t('landing.launch.finalSub') }}</p>

      <StoreBadges context="landing" center light class="mb-8"/>

      <p class="mt-6 text-sm font-semibold opacity-92">{{ t('landing.launch.freeForever') }}</p>
    </div>
  </section>
</template>
