<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    updatedOn: string
    summary: string
    eyebrow?: string
  }>(),
  { eyebrow: 'Legal' },
)
</script>

<template>
  <div class="legal">
    <!-- Not AppNav: its links are anchors into the landing sections, and
         none of them exist on this route. -->
    <header class="legal-nav">
      <NuxtLink to="/" class="legal-brand">
        <span class="legal-logo-mark"><span>W</span></span>
        <span class="display legal-wordmark">Wordhabit</span>
      </NuxtLink>
      <NuxtLink to="/" class="legal-back">← Back to site</NuxtLink>
    </header>

    <main class="legal-main">
      <p class="pill legal-pill">{{ eyebrow }}</p>
      <h1 class="display legal-title">{{ title }}</h1>
      <p class="legal-summary">{{ summary }}</p>
      <p class="legal-updated">Last updated {{ updatedOn }}</p>

      <article class="legal-body">
        <slot />
      </article>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.legal {
  background-color: var(--color-paper);
  min-height: 100vh;
}

.legal-nav {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.legal-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legal-logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--color-green);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.legal-logo-mark span {
  color: white;
  font-weight: 800;
  font-size: 16px;
  font-family: var(--font-display);
}

.legal-wordmark {
  font-size: 18px;
  color: var(--color-ink);
}

.legal-back {
  font-size: 14px;
  color: var(--color-muted);
  transition: color 0.15s;
}

.legal-back:hover {
  color: var(--color-ink);
}

.legal-main {
  max-width: 820px;
  margin: 0 auto;
  padding: 56px 24px 96px;
}

.legal-pill {
  display: inline-block;
  margin-bottom: 20px;
}

.legal-title {
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.05;
  color: var(--color-ink);
  margin-bottom: 20px;
}

.legal-summary {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-muted);
  max-width: 62ch;
}

.legal-updated {
  margin-top: 16px;
  font-size: 14px;
  color: var(--color-muted-2);
}

.legal-body {
  margin-top: 48px;
  color: var(--color-ink-2);
  font-size: 16px;
  line-height: 1.7;
}

.legal-body :deep(h2) {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  line-height: 1.25;
  color: var(--color-ink);
  margin-top: 48px;
  margin-bottom: 12px;
}

.legal-body :deep(h2:first-child) {
  margin-top: 0;
}

.legal-body :deep(h3) {
  font-weight: 700;
  font-size: 17px;
  color: var(--color-ink);
  margin-top: 28px;
  margin-bottom: 8px;
}

.legal-body :deep(p) {
  margin-bottom: 16px;
  max-width: 68ch;
}

.legal-body :deep(ul) {
  margin: 0 0 16px;
  padding-left: 22px;
  list-style: disc;
  max-width: 68ch;
}

.legal-body :deep(li) {
  margin-bottom: 8px;
}

.legal-body :deep(a) {
  color: var(--color-green-700);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-body :deep(strong) {
  color: var(--color-ink);
  font-weight: 700;
}

.legal-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 15px;
  display: block;
  overflow-x: auto;
}

.legal-body :deep(th) {
  text-align: left;
  font-weight: 700;
  color: var(--color-ink);
  border-bottom: 2px solid var(--color-line);
  padding: 10px 12px 10px 0;
  white-space: nowrap;
}

.legal-body :deep(td) {
  border-bottom: 1px solid var(--color-line);
  padding: 10px 12px 10px 0;
  vertical-align: top;
}
</style>
