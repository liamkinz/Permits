<script setup lang="ts">
import UserInnerNavbar from '@/components/UserInnerNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <UserInnerNavbar />
    <!-- <main class="flex-1"> -->
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>
