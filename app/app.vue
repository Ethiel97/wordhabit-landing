<script setup lang="ts">
const { locale, t } = useI18n()

useHead(() => ({ htmlAttrs: { lang: locale.value } }))

// Page-agnostic defaults only. Open Graph tags live on the pages they
// describe (index.vue for the home page); declared here they would fight
// per-page tags like the shared word's generated og:image.
useSeoMeta({
  title: () => t('seo.default.title'),
  description: () => t('seo.default.description'),
})
</script>


<template>
  <NuxtPage/>
</template>
