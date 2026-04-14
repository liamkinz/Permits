<script setup lang="ts">
import { TypographyH1 } from '@/components/ui/typography'
import ApprovedHeader from './components/ApprovedHeader.vue'
import ApprovedStatsGrid from './components/ApprovedStatsGrid.vue'
import ApprovedList from './components/ApprovedList.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <ApprovedHeader />

    <!-- Stats Grid Component -->
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <ApprovedStatsGrid />
    </div>

    <!-- Approved Applications List Section -->
    <div class="px-4 sm:px-6 lg:px-8 py-4 pb-8">
      <ApprovedList />
    </div>
  </div>
</template>
