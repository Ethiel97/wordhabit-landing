<script setup lang="ts">
defineOgImageScreenshot({
  alt: 'Wordhabit landing page preview',
  width: 1200,
  height: 630,
  selector: '#hero-form',
  colorScheme: 'light',
  delay: 300,
  mask: '.hero-toggle',
})
</script>

<template>
  <div>
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