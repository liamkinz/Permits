<script setup lang="ts">
import OuterLayout from '@/layout/OuterLayout.vue'
import HowItWorksSection from '@/pages/LandingPage/components/HowItWorksSection.vue'
import HeroSection from './components/HeroSection.vue'
</script>
<!-- <template>
  <OuterLayout>
    <template #content>
      <HeroSection />
      <HowItWorksSection />
    </template>
  </OuterLayout>
</template> -->

<template class="w-full">
  <HeroSection />
  <HowItWorksSection />
</template>
