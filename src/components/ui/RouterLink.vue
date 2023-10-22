<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: {
    type: String,
  },
});
</script>

<template>
  <!-- Navegar a la ruta con nombre: :to="{ name: 'new-client' }" -->
  <RouterLink :to="{ name: to }"
    class="text-gray-100 bg-emerald-400 px-3 py-1 rounded-sm hover:bg-emerald-500 transition">
    <slot></slot>
  </RouterLink>
</template>

<style scoped></style>
