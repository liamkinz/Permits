<script setup lang="ts">
import UserInnerNavbar from '@/components/UserInnerNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <UserInnerNavbar />
    <main class="flex-1">
      <slot name="content"></slot>
    </main>
    <FooterSection />
  </div>
</template>
