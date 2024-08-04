<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="flex flex-col items-center justify-center text-center h-96">
    <i class="mb-5 text-yellow-500 pi pi-exclamation-triangle text-7xl"></i>
    <h1 class="mb-4 text-6xl font-bold">404 Not Found</h1>
    <p class="mb-5 text-xl">This page does not exist</p>
    <RouterLink
      to="/"
      class="px-3 py-2 mt-4 text-white bg-green-700 rounded-md hover:bg-green-900"
      >Go Back
    </RouterLink>
  </section>
</template>
