<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { useHomePage } from './composables/useHomePage'
import StatsGrid from './components/StatsGrid.vue'
import ActivityOverview from './components/ActivityOverview.vue'
import QuickActionSidebar from './components/QuickActionSidebar.vue'
import RecentPermits from './components/RecentPermits.vue'

const { authStore } = useHomePage()
</script>

<template>
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 sm:py-16"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]"
    />
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Welcome back,
            <span class="text-purple-500">{{ authStore.user?.name ?? 'User' }}</span
            >! 👋
          </h1>
          <p class="mt-2 text-lg text-muted-foreground max-w-2xl">
            Manage your permits, track applications, and stay on top of deadlines — all in one
            place.
          </p>
        </div>
        <Button size="lg" class="shrink-0 gap-2">
          <Plus class="size-4" />
          New Application
        </Button>
      </div>
    </div>
  </section>

  <!-- Stats Grid -->
  <StatsGrid />

  <!-- Main Content Grid -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Permits Table -->
      <RecentPermits />

      <!-- Quick Actions Sidebar -->
      <QuickActionSidebar />
    </div>

    <!-- Activity Overview -->
    <ActivityOverview />
  </section>
</template>
