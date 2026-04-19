<script setup lang="ts">
import ApplicationHeader from './components/ApplicationHeader.vue'
import StatusOverview from './components/StatusOverview.vue'
import ApplicationList from './components/ApplicationList.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <ApplicationHeader />

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- Status Overview Cards -->
      <StatusOverview />

      <!-- Permits List Section -->
      <ApplicationList />
    </div>
  </div>
</template>
