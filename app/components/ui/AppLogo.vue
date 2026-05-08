<template>
  <a href="#" class="flex items-center gap-2.5">
    <div class="logo-mark">
      <span>W</span>
    </div>
    <span class="display" style="font-size: 22px; font-weight: 800;">Wordhabit</span>
  </a>
</template>

<style scoped>
.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: var(--color-green);
  display: grid;
  place-items: center;
  box-shadow: 0 3px 0 0 var(--color-green-700);
  flex-shrink: 0;
}

.logo-mark span {
  color: white;
  font-weight: 800;
  font-size: 18px;
  font-family: var(--font-display);
}
</style>