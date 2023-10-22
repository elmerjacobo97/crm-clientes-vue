<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="bg-gray-900">
    <div class="container mx-auto max-w-6xl py-10 px-5">
      <h1 class="text-4xl font-extrabold text-indigo-600 text-center lg:text-left">
        CRM - Administrador de clientes
      </h1>
    </div>
  </header>
  <main class="max-w-6xl mx-auto mt-10 px-5">
    <RouterView />
  </main>
</template>
