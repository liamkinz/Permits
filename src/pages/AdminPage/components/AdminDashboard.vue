<script setup lang="ts">
import { TypographyH2 } from '@/components/ui/typography'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
<template>
  <div class="p-4 md:p-6">
    <TypographyH2 class="text-xl md:text-2xl font-bold mb-4 text-foreground">
      Welcome back,
      <span class="text-sky-500">{{ authStore.user?.name || 'Admin' }}</span>
      ! 👋
    </TypographyH2>
    <p class="text-muted-foreground">
      Welcome to the admin dashboard! Here you can manage permits, users, and applications
    </p>
  </div>
</template>
