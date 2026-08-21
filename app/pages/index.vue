<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.ogDescription'),
  ogType: 'website',
  ogSiteName: 'Wordhabit',
  ogUrl: 'https://wordhabit.app',
  ogImage: 'https://wordhabit.app/og-image-v2.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageUrl: 'https://wordhabit.app/og-image-v2.png',
  ogImageSecureUrl: 'https://wordhabit.app/og-image-v2.png',
  twitterImage: 'https://wordhabit.app/og-image-v2.png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.title'),
  twitterDescription: () => t('seo.home.twitterDescription'),
})
</script>

<template>
  <div class="overflow-hidden">
    <AppNav/>
    <HeroSection/>
    <HowItWorksSection/>
    <ManifestoSection/>
    <LanguagesSection/>
    <PricingSection/>
    <FaqSection/>
    <FinalCta/>
    <AppFooter/>
  </div>
</template>
