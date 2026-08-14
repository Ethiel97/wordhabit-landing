<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <section id="why" class="bg-ink px-8 py-[110px] text-center text-white max-[880px]:px-6 max-[880px]:py-[72px]">
    <div class="mb-[34px] inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-green">
      {{ t('landing.manifesto.eyebrow') }}
    </div>

    <ManifestoLine>
      {{ t('landing.manifesto.lineOne') }}
    </ManifestoLine>
    <ManifestoLine class="mt-[26px] max-[880px]:mt-5">
      {{ t('landing.manifesto.lineTwoFirst') }}
      <span class="text-green">{{ t('landing.manifesto.lineTwoEmphasis') }}</span>
      {{ t('landing.manifesto.lineTwoLast') }}
    </ManifestoLine>
    <ManifestoLine class="mt-[26px] max-[880px]:mt-5">
      {{ t('landing.manifesto.lineThreeFirst') }}
      <span class="text-green">{{ t('landing.manifesto.lineThreeEmphasis') }}</span>
    </ManifestoLine>
  </section>
</template>
