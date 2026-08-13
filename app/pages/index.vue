<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.ogDescription'),
  ogType: 'website',
  ogUrl: 'https://wordhabit.app',
  ogImage: 'https://wordhabit.app/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageUrl: 'https://wordhabit.app/og-image.png',
  ogImageSecureUrl: 'https://wordhabit.app/og-image.png',
  twitterImage: 'https://wordhabit.app/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.title'),
  twitterDescription: () => t('seo.home.twitterDescription'),
})
</script>

<template>
  <div class="overflow-hidden">
    <AppNav/>
    <HeroSection/>
    <FeaturesSection/>
    <HowItWorksSection/>
    <PricingSection/>
    <FaqSection/>
    <FinalCta/>
    <AppFooter/>
  </div>
</template>
