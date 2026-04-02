<script setup lang="ts">
import { TypographyH1, TypographyH3 } from '@/components/ui/typography'
import { useAuthStore } from '@/stores/authStore'
import StatsGrid from './components/StatsGrid.vue'
import MetricsAndCharts from './components/MetricsAndCharts.vue'
import QuickAction from './components/QuickAction.vue'
import RecentApplication from './components/RecentApplication.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <div
      class="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60"
    >
      <div class="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div class="flex flex-col gap-2 md:gap-4">
          <div class="flex flex-col gap-1">
            <TypographyH1 class="text-2xl md:text-3xl font-bold text-gradient-primary">
              Dashboard
            </TypographyH1>
            <p class="text-muted-foreground text-sm md:text-base">
              Welcome back,
              <span class="font-semibold text-foreground">{{
                authStore.user?.name || 'Admin'
              }}</span>
              👋
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Stats Grid Component -->
      <StatsGrid />

      <!-- Metrics and Charts Component -->
      <MetricsAndCharts />

      <!-- Quick Actions -->
      <QuickAction />

      <!-- Recent Applications Component -->
      <RecentApplication />
    </div>
  </div>
</template>
