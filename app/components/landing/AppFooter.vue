<script setup lang="ts">
const {t} = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="footer-logo">
          <span class="footer-logo-mark">
            <span>W</span>
          </span>
          <span class="display" style="font-size: 18px; color: white;">Wordhabit</span>
        </div>
        <span class="footer-copy">{{ t('footer.copyright') }}</span>
      </div>

      <!-- Links -->
      <div class="footer-links">
        <a href="#" class="footer-link">Twitter</a>
        <a href="#" class="footer-link">Instagram</a>
        <NuxtLink to="/support" class="footer-link">{{ t('footer.support') }}</NuxtLink>
        <NuxtLink to="/privacy" class="footer-link">{{ t('footer.privacy') }}</NuxtLink>
        <NuxtLink to="/terms" class="footer-link">{{ t('footer.terms') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 48px 32px;
  background-color: var(--color-ink);
  color: rgba(255, 255, 255, 0.6);
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--color-green);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.footer-logo-mark span {
  color: white;
  font-weight: 800;
  font-size: 16px;
  font-family: var(--font-display);
}

.footer-copy {
  font-size: 13px;
}

.footer-links {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.15s;
}

.footer-link:hover {
  color: white;
}
</style>
