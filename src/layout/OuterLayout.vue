<script setup lang="ts">
import Navbar from '@/components/OuterNavbar.vue'
import Footer from '@/components/FooterSection.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <slot name="content"></slot>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
