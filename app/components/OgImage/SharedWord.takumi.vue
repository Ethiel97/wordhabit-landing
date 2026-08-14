<script setup lang="ts">
// Rendered by Takumi, not a browser: keep the layout self-contained and
// flex-based. Takumi's WASM renderer stays within Cloudflare's CPU budget.
// No phonetic here: share cards benefit more from a compact definition.
const props = withDefaults(defineProps<{
    term?: string;
    pos?: string;
    definition?: string;
    eyebrow?: string;
    cta?: string;
    language?: string;
}>(), {
    term: '',
    pos: '',
    definition: '',
    eyebrow: 'Word of the day',
    cta: 'Learn it with Wordhabit',
    language: '',
});

const shortDefinition = computed(() =>
    props.definition.length > 140 ? `${props.definition.slice(0, 139).trimEnd()}…` : props.definition);

const MASCOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="35" cy="35" r="22" fill="white"/><circle cx="40" cy="32" r="3" fill="#0F1B12"/><path d="M30 38 Q35 42 40 38" stroke="#0F1B12" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M52 35 L62 33 L62 40 L52 40z" fill="#F97316"/><path d="M30 50 Q40 75 60 78 Q70 75 75 65 Q70 55 55 53" fill="rgba(255,255,255,0.85)"/><path d="M55 53 Q70 55 80 50 Q75 65 65 70" fill="rgba(255,255,255,0.6)"/><path d="M65 80 L72 90 L68 80z M55 82 L60 92 L58 82z" fill="#F97316"/></svg>`;

// Base64 keeps the embedded mascot portable across edge renderers.
const mascotSrc = `data:image/svg+xml;base64,${btoa(MASCOT_SVG)}`;
</script>

<template>
  <div
      style="width: 1200px; height: 630px; display: flex; flex-direction: column; position: relative; overflow: hidden; background: linear-gradient(150deg, #22C55E 0%, #16A34A 70%, #15803D 100%); color: white; padding: 72px 80px; font-family: 'Inter';">
    <div
        style="position: absolute; width: 520px; height: 520px; top: -230px; right: -160px; border-radius: 999px; background: rgba(255,255,255,0.08);"/>
    <div
        style="position: absolute; width: 380px; height: 380px; bottom: -190px; left: -120px; border-radius: 999px; background: rgba(255,255,255,0.05);"/>
    <div
        style="position: absolute; right: -30px; bottom: -58px; font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 230px; letter-spacing: -0.05em; color: rgba(255,255,255,0.07);">
      {{ term }}
    </div>

    <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
      <div
          style="display: flex; align-items: center; font-size: 20px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.85);">
        <div style="width: 34px; height: 4px; border-radius: 999px; background: rgba(255,255,255,0.6); margin-right: 10px;"/>
        <div>{{ eyebrow }}</div>
      </div>
      <div
          v-if="language"
          style="display: flex; align-items: center; background: rgba(255,255,255,0.92); color: #15803D; padding: 11px 20px; border-radius: 999px; font-size: 20px; font-weight: 800;">
        {{ language }}
      </div>
    </div>

    <div
        style="font-family: 'Bricolage Grotesque'; font-weight: 800; letter-spacing: -0.03em; line-height: 0.95; font-size: 128px; margin-top: 34px;">
      {{ term }}
    </div>

    <div
        style="display: flex; align-items: center; margin-top: 18px; font-size: 26px; font-weight: 600; color: rgba(255,255,255,0.85);">
      <div>{{ pos }}</div>
    </div>

    <div
        style="margin-top: 26px; font-size: 31px; line-height: 1.45; color: rgba(255,255,255,0.96); max-width: 820px;">
      {{ shortDefinition }}
    </div>

    <div style="display: flex; margin-top: auto; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <img :src="mascotSrc" style="width: 58px; height: 58px; margin-right: 16px;">
        <div style="font-family: 'Bricolage Grotesque'; font-weight: 800; font-size: 30px; letter-spacing: -0.02em;">
          Wordhabit
        </div>
      </div>
      <div
          style="display: flex; align-items: center; background: white; color: #15803D; padding: 14px 22px; border-radius: 999px; font-size: 22px; font-weight: 800;">
        <div>{{ cta }}</div>
        <div style="margin-left: 10px; font-size: 26px; line-height: 1;">→</div>
      </div>
    </div>
  </div>
</template>
