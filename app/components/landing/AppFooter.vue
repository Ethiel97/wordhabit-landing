<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <footer class="bg-ink px-8 py-12 text-white/60">
    <div class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
      <!-- Brand -->
      <div class="flex flex-wrap items-center gap-4">
        <AppLogo compact dark/>
        <span class="text-[13px]">{{ t('footer.copyright') }}</span>
      </div>

      <!-- Links -->
      <div class="flex gap-6 text-sm [&_a]:text-white/60 [&_a]:transition-colors [&_a]:duration-150 [&_a:hover]:text-white">
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <NuxtLink to="/support">{{ t('footer.support') }}</NuxtLink>
        <NuxtLink to="/privacy">{{ t('footer.privacy') }}</NuxtLink>
        <NuxtLink to="/terms">{{ t('footer.terms') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>
